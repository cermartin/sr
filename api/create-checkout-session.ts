import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface RequestBody {
  items: CartItem[];
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  shipping: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      items,
      email,
      firstName,
      lastName,
      address,
      city,
      postcode,
      country,
      phone,
      shipping,
    } = req.body as RequestBody;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.variant ? `${item.name} — ${item.variant}` : item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })
    );

    if (shipping > 0) {
      line_items.push({
        price_data: {
          currency: 'gbp',
          product_data: { name: 'Shipping' },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || '';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items,
      metadata: {
        firstName,
        lastName,
        address,
        city,
        postcode,
        country,
        phone: phone || '',
      },
      success_url: `${origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?cancelled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe session error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create checkout session' });
  }
}
