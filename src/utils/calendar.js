// Calendar utilities for iCal integration
import ical from "node-ical";

// iCal URLs for the three platforms (these would need to be provided)
const ICAL_URLS = {
  airbnb:
    "https://www.airbnb.fr/calendar/ical/12562881.ics?s=c5cb9488bb9f463532a4383212529951",
  abritel:
    "http://www.abritel.fr/icalendar/2925a341739b4f4982e09edc2a7eb1df.ics?nonTentative",
  greengo:
    "https://calendars.greengo.voyage/calendar/greengo-icalendar/b6bd8d97-b9bf-4554-a16a-e91b3f7dbf74",
};

export async function fetchBookedDates() {
  const bookedDates = new Set();

  try {
    // Fetch calendars from all platforms
    const calendars = await Promise.allSettled(
      Object.values(ICAL_URLS).map((url) => ical.async.fromURL(url))
    );

    calendars.forEach((result) => {
      if (result.status === "fulfilled") {
        const calendar = result.value;

        Object.values(calendar).forEach((event) => {
          if (event.type === "VEVENT" && event.start && event.end) {
            // Add all dates between start and end to booked dates
            const startDate = new Date(event.start);
            const endDate = new Date(event.end);

            // Normalize to avoid timezone issues
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(0, 0, 0, 0);

            const currentDate = new Date(startDate);
            while (currentDate < endDate) {
              bookedDates.add(currentDate.toISOString().split("T")[0]);
              currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }
          }
        });
      }
    });

    return Array.from(bookedDates).sort();
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    return [];
  }
}

export function generateCalendarData(
  bookedDates,
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push({ day: null, isBooked: false, isPast: false });
  }

  // Add days of the month
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split("T")[0];
    const isPast = date < today;
    const isBooked = bookedDates.includes(dateString);

    calendarDays.push({
      day,
      date: dateString,
      isBooked,
      isPast,
      isAvailable: !isBooked && !isPast,
    });
  }

  return {
    year,
    month,
    monthName: firstDay.toLocaleDateString("fr-FR", { month: "long" }),
    monthNameEn: firstDay.toLocaleDateString("en-US", { month: "long" }),
    days: calendarDays,
  };
}

export const MONTH_NAMES = {
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export const DAY_NAMES = {
  fr: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
