import { createAdminClient } from '@/lib/supabase/server';

const supabaseAdmin = createAdminClient();

export async function handlePaymentSuccess(orderId: string, paymentEventId: string) {
  // Update Payment menjadi PAID_AND_HELD (Escrow system)
  await supabaseAdmin.from('payments')
    .update({ status: 'PAID_AND_HELD', paid_at: new Date().toISOString() })
    .eq('order_id', orderId);

  // Update Order menjadi PAID / IN_QUEUE
  await supabaseAdmin.from('orders')
    .update({ status: 'PAID' })
    .eq('id', orderId);
}

export async function markOrderTargetReached(orderId: string) {
  // Grinder melaporkan selesai
  await supabaseAdmin.from('orders')
    .update({ status: 'AWAITING_USER_CONFIRMATION' })
    .eq('id', orderId);
    
  // Trigger notifikasi ke user via tabel notifications (Fase 2)
}

export async function completeOrderAndReleaseFunds(orderId: string, isAuto: boolean = false) {
  // 1. Update Order
  await supabaseAdmin.from('orders')
    .update({ status: isAuto ? 'AUTO_COMPLETED' : 'COMPLETED' })
    .eq('id', orderId);

  // 2. Release Funds (Update Ledger)
  await supabaseAdmin.from('payments')
    .update({ status: 'RELEASABLE' })
    .eq('order_id', orderId);

  // 3. TODO (Roadmap): Hapus / Purge Credential Vault untuk keamanan
}