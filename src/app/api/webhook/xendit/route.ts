import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { handlePaymentSuccess } from '@/lib/services/orderService';

// Cegah Next.js melakukan compile statis pada route ini saat build time
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabaseAdmin = createAdminClient();
  
  // 1. Verifikasi Xendit Callback Token
  const callbackToken = req.headers.get('x-callback-token');
  if (callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const payload = await req.json();
    const webhookId = payload.id; // Unique event ID dari Xendit

    // 2. Cek Idempotency (Apakah webhook ini sudah pernah diproses?)
    const { data: existingLog } = await supabaseAdmin
      .from('webhook_logs')
      .select('id')
      .eq('webhook_id', webhookId)
      .single();

    if (existingLog) {
      return NextResponse.json({ message: 'Already processed' }, { status: 200 });
    }

    // 3. Catat Webhook sebelum diproses (mencegah race condition parsial)
    await supabaseAdmin.from('webhook_logs').insert([{
      webhook_id: webhookId,
      event_type: payload.status,
      payload: payload
    }]);

    // 4. State Machine Update
    if (payload.status === 'PAID') {
      const orderId = payload.external_id.replace('gxshift_order_', '');
      await handlePaymentSuccess(orderId, payload.id);
    } else if (payload.status === 'EXPIRED') {
      // Update logic untuk expired
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('[WEBHOOK_ERROR]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}