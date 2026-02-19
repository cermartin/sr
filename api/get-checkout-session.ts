import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.query.session_id as string;
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const lineItems = session.line_items?.data.map((li) => ({
      description: li.description,
      quantity: li.quantity,
      amount_total: li.amount_total,
    })) || [];

    return res.status(200).json({
      customer_email: session.customer_email,
      metadata: session.metadata,
      amount_total: session.amount_total,
      line_items: lineItems,
    });
  } catch (err: any) {
    console.error('Session retrieve error:', err);
    return res.status(500).json({ error: err.message || 'Failed to retrieve session' });
  }
}
