import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date, time } = req.query as { date: string; time: string };

  if (!date || !time) {
    return res.status(400).json({ error: 'Missing date or time' });
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    const startTime = new Date(`${date}T${time}:00`);
    const endTime   = new Date(startTime.getTime() + 90 * 60 * 1000); // 90-min slot

    const response = await calendar.events.list({
      calendarId:   process.env.GOOGLE_CALENDAR_ID!,
      timeMin:      startTime.toISOString(),
      timeMax:      endTime.toISOString(),
      singleEvents: true,
    });

    const events = response.data.items || [];

    return res.status(200).json({ available: events.length === 0 });
  } catch (err: any) {
    console.error('Calendar check error:', err);
    return res.status(500).json({ error: err.message || 'Failed to check availability' });
  }
}
