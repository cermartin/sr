import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID as string;
const OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export interface OrderItem {
  product_name: string;
  quantity: number;
  unit_price: number;
}

function formatItems(items: OrderItem[]): string {
  return items.map(item => {
    const lineTotal = item.unit_price * item.quantity;
    return `${item.product_name} × ${item.quantity} — £${lineTotal.toLocaleString()}`;
  }).join('\n');
}

interface OrderEmailData {
  orderId: string;
  customerEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  const itemsList = formatItems(data.items);
  const shippingStr = data.shipping === 0 ? 'Free' : `£${data.shipping}`;

  const commonParams = {
    order_id: data.orderId,
    customer_name: `${data.firstName} ${data.lastName}`,
    customer_email: data.customerEmail,
    phone: data.phone || 'Not provided',
    address: `${data.address}, ${data.city}, ${data.postcode}, ${data.country}`,
    items_list: itemsList,
    subtotal: `£${data.subtotal.toLocaleString()}`,
    shipping: shippingStr,
    total: `£${data.total.toLocaleString()}`,
  };

  // Send owner email
  try {
    await emailjs.send(SERVICE_ID, OWNER_TEMPLATE_ID, commonParams, PUBLIC_KEY);
  } catch (err) {
    console.error('[Email] Owner notification FAILED:', err);
  }

  // Send customer email
  try {
    const customerParams = {
      ...commonParams,
      to_name: `${data.firstName} ${data.lastName}`,
      to_email: data.customerEmail,
      from_name: 'Serrano Rivers',
    };
    await emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, customerParams, PUBLIC_KEY);
  } catch (err: any) {
    console.error('[Email] Customer confirmation FAILED:', err?.text || err?.message || err);
  }
}
