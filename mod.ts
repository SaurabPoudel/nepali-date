/**
 * Constants for Nepali calendar months and weekdays
 * @public
 */
export const MONTHS_EN = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Aswin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

export const MONTHS_NP = [
  "बैशाख",
  "जेठ",
  "असार",
  "श्रावण",
  "भाद्र",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पौष",
  "माघ",
  "फाल्गुण",
  "चैत्र",
];

export const WEEKDAYS_NP = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहिबार",
  "शुक्रबार",
  "शनिबार",
];

export const NUM_NP = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/**
 * Interface for Nepali date object
 * @public
 */
export interface NepaliDate {
  year: number; // Nepali year (e.g., 2080)
  month: number; // Month (1-12)
  day: number; // Day of month (1-32)
  weekday: number; // Day of week (0-6, 0 = Sunday)
  monthName: string; // Nepali month name
  weekdayName: string; // Nepali weekday name
}

/**
 * Converts English digits to Nepali unicode digits
 * @example
 * toNepaliDigits(123) // returns "१२३"
 * toNepaliDigits("45") // returns "४५"
 */
export function toNepaliDigits(num: number | string): string {
  return num
    .toString()
    .split("")
    .map((char) => (char >= "0" && char <= "9" ? NUM_NP[parseInt(char)] : char))
    .join("");
}

/**
 * Creates a NepaliDate object with date information
 * @param year - Nepali year (e.g., 2080)
 * @param month - Month (1-12)
 * @param day - Day of month
 * @throws {Error} If date is invalid
 * @example
 * const date = createNepaliDate(2080, 1, 15);
 * console.log(date.monthName); // बैशाख
 * console.log(date.weekdayName); // आइतबार
 */
export function createNepaliDate(
  year: number,
  month: number,
  day: number
): NepaliDate {
  validateNepaliDate(year, month, day);
  const date = new Date(year, month - 1, day);
  const weekday = date.getDay();

  return {
    year,
    month,
    day,
    weekday,
    monthName: MONTHS_NP[month - 1],
    weekdayName: WEEKDAYS_NP[weekday],
  };
}

/**
 * Formats a Nepali date according to the specified format string
 * @param year - Nepali year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @param options - Formatting options
 * @throws {Error} If date is invalid
 *
 * @example
 * // Default format (YYYY-MM-DD)
 * formatNepaliDate(2080, 1, 15) // २०८०-०१-१५
 *
 * // Custom format with English
 * formatNepaliDate(2080, 1, 15, {
 *   format: "MMMM DD, YYYY",
 *   language: "en"
 * }) // Baisakh 15, 2080
 *
 * // Custom format with Nepali
 * formatNepaliDate(2080, 1, 15, {
 *   format: "MMMM DD, YYYY",
 *   language: "np"
 * }) // बैशाख १५, २०८०
 */
export function formatNepaliDate(
  year: number,
  month: number,
  day: number,
  options: { format?: string; language?: "en" | "np" } = {}
): string {
  const { format = "YYYY-MM-DD", language = "np" } = options;
  validateNepaliDate(year, month, day);

  let result = format;
  const monthIndex = month - 1;
  const date = new Date(year, monthIndex, day);
  const weekday = date.getDay();

  if (language === "np") {
    result = result
      .replace("YYYY", toNepaliDigits(year))
      .replace("YY", toNepaliDigits(year % 100))
      .replace("MM", toNepaliDigits(month.toString().padStart(2, "0")))
      .replace("DD", toNepaliDigits(day.toString().padStart(2, "0")))
      .replace("MMMM", MONTHS_NP[monthIndex])
      .replace("dddd", WEEKDAYS_NP[weekday]);
  } else {
    result = result
      .replace("YYYY", year.toString())
      .replace("YY", (year % 100).toString().padStart(2, "0"))
      .replace("MM", month.toString().padStart(2, "0"))
      .replace("DD", day.toString().padStart(2, "0"))
      .replace("MMMM", MONTHS_EN[monthIndex])
      .replace("dddd", WEEKDAYS_NP[weekday]);
  }

  return result;
}

/**
 * Returns the number of days in a given Nepali month
 * @param month - Month number (1-12)
 * @returns Number of days in the month
 * @example
 * getDaysInMonth(1) // 31 (Baisakh)
 * getDaysInMonth(3) // 32 (Asar)
 */
export function getDaysInMonth(month: number): number {
  const daysInMonth: Record<number, number> = {
    1: 31,
    2: 31,
    3: 32,
    4: 32,
    5: 31,
    6: 31,
    7: 30,
    8: 30,
    9: 30,
    10: 29,
    11: 30,
    12: 30,
  };
  return daysInMonth[month] || 30;
}

/**
 * Validates a Nepali date
 * @throws {Error} If the date is invalid
 */
export function validateNepaliDate(
  year: number,
  month: number,
  day: number
): void {
  if (
    year < 1970 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getDaysInMonth(month)
  ) {
    throw new Error(`Invalid Nepali date: ${year}-${month}-${day}`);
  }
}

/**
 * Compares two Nepali dates
 * @returns Negative if date1 < date2, 0 if equal, positive if date1 > date2
 * @example
 * compareNepaliDates(2080, 1, 15, 2080, 2, 1) // returns negative number
 * compareNepaliDates(2080, 1, 15, 2080, 1, 15) // returns 0
 */
export function compareNepaliDates(
  year1: number,
  month1: number,
  day1: number,
  year2: number,
  month2: number,
  day2: number
): number {
  validateNepaliDate(year1, month1, day1);
  validateNepaliDate(year2, month2, day2);

  if (year1 !== year2) return year1 - year2;
  if (month1 !== month2) return month1 - month2;
  return day1 - day2;
}

export const VERSION = "1.0.0";
