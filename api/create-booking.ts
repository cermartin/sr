import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, time, guests, notes } = req.body;

  if (!name || !email || !date || !time || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const startTime = new Date(`${date}T${time}:00`);
    const endTime   = new Date(startTime.getTime() + 90 * 60 * 1000); // 90-min breakfast sitting

    // Double-check availability before creating (prevent race conditions)
    const existing = await calendar.events.list({
      calendarId:   process.env.GOOGLE_CALENDAR_ID!,
      timeMin:      startTime.toISOString(),
      timeMax:      endTime.toISOString(),
      singleEvents: true,
    });

    if ((existing.data.items || []).length > 0) {
      return res.status(409).json({
        error: 'This slot was just taken. Please choose another time.',
      });
    }

    const bookingRef = Math.random().toString(36).slice(2, 10).toUpperCase();
    const guestCount = Number(guests);

    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: {
        summary: `☕ Breakfast — ${name} (${guestCount} guest${guestCount !== 1 ? 's' : ''})`,
        description: [
          `Booking Ref: ${bookingRef}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || 'Not provided'}`,
          `Guests: ${guestCount}`,
          `Notes: ${notes || 'None'}`,
        ].join('\n'),
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Europe/London',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Europe/London',
        },
      },
    });

    return res.status(200).json({
      success:    true,
      bookingRef,
      eventId:    event.data.id,
    });
  } catch (err: any) {
    console.error('Booking creation error:', err);
    return res.status(500).json({ error: err.message || 'Failed to create booking' });
  }
}
