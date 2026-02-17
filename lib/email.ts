import emailjs from '@emailjs/browser';
import { CartItem } from '../types';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID as string;
const OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''));
}

function formatItems(items: CartItem[]): string {
  return items.map(item => {
    const variant = item.product.variants?.find(v => v.id === item.variantId);
    const variantStr = variant ? ` (${variant.name})` : '';
    const lineTotal = parsePrice(item.product.price) * item.quantity;
    return `${item.product.name}${variantStr} × ${item.quantity} — £${lineTotal.toLocaleString()}`;
  }).join('\n');
}

interface OrderEmailData {
  customerEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  const itemsList = formatItems(data.items);
  const shippingStr = data.shipping === 0 ? 'Free' : `£${data.shipping}`;

  const commonParams = {
    customer_name: `${data.firstName} ${data.lastName}`,
    customer_email: data.customerEmail,
    phone: data.phone || 'Not provided',
    address: `${data.address}, ${data.city}, ${data.postcode}, ${data.country}`,
    items_list: itemsList,
    subtotal: `£${data.subtotal.toLocaleString()}`,
    shipping: shippingStr,
    total: `£${data.total.toLocaleString()}`,
  };

  await Promise.all([
    emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, {
      ...commonParams,
      to_name: `${data.firstName} ${data.lastName}`,
      to_email: data.customerEmail,
      from_name: 'Serrano Rivers',
    }, PUBLIC_KEY),
    emailjs.send(SERVICE_ID, OWNER_TEMPLATE_ID, {
      ...commonParams,
    }, PUBLIC_KEY),
  ]);
}
