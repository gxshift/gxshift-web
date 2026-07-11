'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { encryptSensitive } from '@/lib/security';
import { estimateGrindingTime } from '@/lib/ai/gemini';
import { redirect } from 'next/navigation';

export async function createSecureOrder(formData: any) {
    const supabaseAuth = await createClient(); // Tambahkan await di sini
    const supabaseAdmin = createAdminClient(); // Tetap tanpa await karena fungsi ini tidak memanggil cookies()
    
  // 1. Verifikasi User (menggunakan cookies session)
  const { data: { user }, error: authErr } = await supabaseAuth.auth.getUser();
  if (authErr || !user) throw new Error("Unauthorized");

  // 2. Ekstrak form (validasi Zod disarankan di tahap produksi)
  const { password, username, currentRank, targetRank, gameId, serviceId } = formData;

  // 3. ENKRIPSI PASSWORD
  const { encryptedData, iv } = await encryptSensitive(password);

  // 4. MINTA ESTIMASI AI DARI GEMINI
  const aiEstimation = await estimateGrindingTime(currentRank, targetRank);

  // Harga mock-up (Di Step berikutnya akan pakai PricingRule DB & Xendit)
  const calculatedPrice = 150000; 

  // 5. DATABASE TRANSACTION (Menggunakan Admin Client karena RLS memblokir insert langsung dari client)
  // Step A: Insert ke Vault
  const { data: vaultData, error: vaultErr } = await supabaseAdmin
    .from('credential_vault')
    .insert([{ encrypted_data: encryptedData, iv: iv }])
    .select('id').single();
    
  if (vaultErr) throw new Error("Gagal mengamankan kredensial");

  // Step B: Insert Order
  const { data: orderData, error: orderErr } = await supabaseAdmin
    .from('orders')
    .insert([{
      user_id: user.id,
      credential_vault_id: vaultData.id,
      game_username: username,
      current_rank: currentRank,
      target_rank: targetRank,
      service_id: serviceId,
      total_price: calculatedPrice,
      status: 'PENDING_PAYMENT'
    }])
    .select('id').single();

  if (orderErr) throw new Error("Gagal membuat order");

  // Step C: Insert AI Estimation result
  await supabaseAdmin
    .from('ai_estimations')
    .insert([{
      order_id: orderData.id,
      estimated_days: aiEstimation.estimated_days,
      estimated_hours: aiEstimation.estimated_hours,
      confidence_score: aiEstimation.confidence_score,
      difficulty: aiEstimation.difficulty_label,
      reasoning: aiEstimation.reasoning_short,
      fallback_used: aiEstimation.fallback_rule_used
    }]);

  // Selesai -> Lempar ke halaman checkout Xendit (Step berikutnya)
  redirect(`/user/checkout/${orderData.id}`);
}