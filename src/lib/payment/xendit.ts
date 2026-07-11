const XENDIT_API_KEY = process.env.XENDIT_SECRET_KEY!;
const XENDIT_BASE_URL = 'https://api.xendit.co';

export async function createXenditInvoice(orderId: string, amount: number, customerEmail: string, description: string) {
  const token = Buffer.from(`${XENDIT_API_KEY}:`).toString('base64');
  
  const response = await fetch(`${XENDIT_BASE_URL}/v2/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
    body: JSON.stringify({
      external_id: `gxshift_order_${orderId}`,
      amount: amount,
      description: description,
      customer: { email: customerEmail },
      success_redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/user/order/${orderId}?status=success`,
      failure_redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/user/order/${orderId}?status=failed`,
      currency: 'IDR'
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Xendit Invoice Creation Failed: ${JSON.stringify(error)}`);
  }
  
  return response.json(); // { id, invoice_url, ... }
}