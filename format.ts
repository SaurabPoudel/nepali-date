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
export const MONTHS_SHORT_EN = [
  "Bai",
  "Jes",
  "Asa",
  "Shr",
  "Bhd",
  "Asw",
  "Kar",
  "Man",
  "Pou",
  "Mag",
  "Fal",
  "Cha",
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
export const MONTHS_SHORT_NP = [
  "बै",
  "जे",
  "अ",
  "श्रा",
  "भा",
  "आ",
  "का",
  "मं",
  "पौ",
  "मा",
  "फा",
  "चै",
];
export const NUM_NP = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
export const WEEKDAYS_SHORT_EN = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
export const WEEKDAYS_LONG_EN = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const WEEKDAYS_SHORT_NP = [
  "आइत",
  "सोम",
  "मंगल",
  "बुध",
  "बिहि",
  "शुक्र",
  "शनि",
];
export const WEEKDAYS_LONG_NP = [
  "आइतबार",
  "सोमबार",
  "मंगलबार",
  "बुधबार",
  "बिहिबार",
  "शुक्रबार",
  "शनिबार",
];

interface FormatOptions {
  language?: "en" | "np";
  format?: string;
}

/**
 * Converts English numbers to Nepali unicode numbers
 */
function toNepaliDigits(number: number | string): string {
  const numberStr = number.toString();
  return numberStr
    .split("")
    .map((char) => (char >= "0" && char <= "9" ? NUM_NP[parseInt(char)] : char))
    .join("");
}

/**
 * Formats a Nepali date according to the specified format string
 * @param year Nepali year
 * @param month Nepali month (1-12)
 * @param day Nepali day
 * @param options Formatting options
 *
 * Format patterns:
 * YYYY - Full year (२०८०)
 * YY - Short year (८०)
 * MM - Month number (०१-१२)
 * MMM - Short month name (बै, जे, etc.)
 * MMMM - Full month name (बैशाख, जेठ, etc.)
 * DD - Day of month (०१-३२)
 * ddd - Short weekday (आइत, सोम, etc.)
 * dddd - Full weekday (आइतबार, सोमबार, etc.)
 */
export function formatNepaliDate(
  year: number,
  month: number,
  day: number,
  options: FormatOptions = {}
): string {
  const { language = "np", format = "YYYY-MM-DD" } = options;

  // Adjust month to 0-based index for array access
  const monthIndex = month - 1;

  // Calculate weekday (0-6)
  const date = new Date(year, monthIndex, day);
  const weekday = date.getDay();

  let result = format;

  // Year formatting
  result = result.replace(
    "YYYY",
    language === "np" ? toNepaliDigits(year) : year.toString()
  );
  result = result.replace(
    "YY",
    language === "np"
      ? toNepaliDigits(year % 100)
      : (year % 100).toString().padStart(2, "0")
  );

  // Month formatting
  result = result.replace(
    "MMMM",
    language === "np" ? MONTHS_NP[monthIndex] : MONTHS_EN[monthIndex]
  );
  result = result.replace(
    "MMM",
    language === "np"
      ? MONTHS_SHORT_NP[monthIndex]
      : MONTHS_SHORT_EN[monthIndex]
  );
  result = result.replace(
    "MM",
    language === "np"
      ? toNepaliDigits(month.toString().padStart(2, "0"))
      : month.toString().padStart(2, "0")
  );

  // Day formatting
  result = result.replace(
    "DD",
    language === "np"
      ? toNepaliDigits(day.toString().padStart(2, "0"))
      : day.toString().padStart(2, "0")
  );

  // Weekday formatting
  result = result.replace(
    "dddd",
    language === "np" ? WEEKDAYS_LONG_NP[weekday] : WEEKDAYS_LONG_EN[weekday]
  );
  result = result.replace(
    "ddd",
    language === "np" ? WEEKDAYS_SHORT_NP[weekday] : WEEKDAYS_SHORT_EN[weekday]
  );

  return result;
}

/**
 * Returns a relative time string (e.g., "2 days ago", "३ दिन अगाडि")
 */
export function formatRelativeTime(
  fromDate: Date,
  toDate: Date = new Date(),
  options: FormatOptions = {}
): string {
  const { language = "np" } = options;
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (language === "np") {
    return `${toNepaliDigits(diffDays)} दिन ${
      fromDate > toDate ? "पछि" : "अगाडि"
    }`;
  } else {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ${
      fromDate > toDate ? "from now" : "ago"
    }`;
  }
}
