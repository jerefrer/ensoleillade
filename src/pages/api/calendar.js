import { fetchBookedDates } from '../../utils/calendar.js';

export async function GET() {
  try {
    const bookedDates = await fetchBookedDates();
    
    return new Response(JSON.stringify({ bookedDates }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch calendar data', bookedDates: [] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
