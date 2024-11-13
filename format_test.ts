import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { formatNepaliDate, formatRelativeTime } from "./format.ts";

Deno.test("formatNepaliDate - default options", () => {
  const result = formatNepaliDate(2080, 1, 15);
  assertEquals(result, "२०८०-०१-१५");
});

Deno.test("formatNepaliDate - English language", () => {
  const result = formatNepaliDate(2080, 1, 15, { language: "en" });
  assertEquals(result, "2080-01-15");
});

Deno.test("formatNepaliDate - custom format with full month name", () => {
  const result = formatNepaliDate(2080, 1, 15, {
    format: "MMMM DD, YYYY",
    language: "np",
  });
  assertEquals(result, "बैशाख १५, २०८०");
});

Deno.test("formatNepaliDate - custom format with short month name", () => {
  const result = formatNepaliDate(2080, 1, 15, {
    format: "MMM DD, YY",
    language: "np",
  });
  assertEquals(result, "बै १५, ८०");
});

Deno.test("formatNepaliDate - weekday formats in Nepali", () => {
  const result = formatNepaliDate(2080, 1, 15, {
    format: "dddd, ddd",
    language: "np",
  });
  // Note: The actual weekday will depend on the date
  // This test might need adjustment based on the actual weekday
  const hasWeekday = WEEKDAYS_LONG_NP.some((day) => result.includes(day));
  assertEquals(hasWeekday, true);
});

Deno.test("formatNepaliDate - full format in English", () => {
  const result = formatNepaliDate(2080, 1, 15, {
    format: "dddd, MMMM DD, YYYY",
    language: "en",
  });
  const hasMonth = MONTHS_EN.some((month) => result.includes(month));
  assertEquals(hasMonth, true);
  assertEquals(result.includes("2080"), true);
  assertEquals(result.includes("15"), true);
});

Deno.test("formatRelativeTime - future date in Nepali", () => {
  const now = new Date();
  const future = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days later
  const result = formatRelativeTime(future, now, { language: "np" });
  assertEquals(result, "२ दिन पछि");
});

Deno.test("formatRelativeTime - past date in Nepali", () => {
  const now = new Date();
  const past = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
  const result = formatRelativeTime(past, now, { language: "np" });
  assertEquals(result, "१ दिन अगाडि");
});

Deno.test("formatRelativeTime - future date in English", () => {
  const now = new Date();
  const future = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days later
  const result = formatRelativeTime(future, now, { language: "en" });
  assertEquals(result, "5 days from now");
});

Deno.test("formatRelativeTime - past date in English", () => {
  const now = new Date();
  const past = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
  const result = formatRelativeTime(past, now, { language: "en" });
  assertEquals(result, "1 day ago");
});

// Test edge cases
Deno.test("formatNepaliDate - handles single digit months and days", () => {
  const result = formatNepaliDate(2080, 1, 5, { language: "np" });
  assertEquals(result, "२०८०-०१-०५");
});

Deno.test("formatNepaliDate - handles last month of year", () => {
  const result = formatNepaliDate(2080, 12, 30, { language: "np" });
  assertEquals(result, "२०८०-१२-३०");
});

Deno.test("toNepaliDigits - converts numbers correctly", () => {
  const result = formatNepaliDate(2080, 10, 5, {
    format: "MM DD YYYY",
    language: "np",
  });
  assertEquals(result, "१० ०५ २०८०");
});
