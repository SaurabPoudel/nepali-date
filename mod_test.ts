import { assertEquals, assertNotEquals } from "@std/assert";
import {
  compareNepaliDates,
  createNepaliDate,
  getDaysInMonth,
  isValidNepaliDate,
  type NepaliDate,
  VERSION,
} from "./mod.ts";

Deno.test("createNepaliDate - with Nepali language", () => {
  const date = createNepaliDate(2080, 1, 15);
  assertEquals(date.year, 2080);
  assertEquals(date.month, 1);
  assertEquals(date.day, 15);
  assertEquals(date.monthName, "बैशाख");
  assertEquals(typeof date.weekday, "number");
  assertEquals(typeof date.weekdayName, "string");
});

Deno.test("createNepaliDate - with English language", () => {
  const date = createNepaliDate(2080, 1, 15, "en");
  assertEquals(date.year, 2080);
  assertEquals(date.month, 1);
  assertEquals(date.day, 15);
  assertEquals(date.monthName, "Baisakh");
  assertEquals(typeof date.weekday, "number");
  assertEquals(typeof date.weekdayName, "string");
});

Deno.test("isValidNepaliDate - valid dates", () => {
  assertEquals(isValidNepaliDate(2080, 1, 15), true);
  assertEquals(isValidNepaliDate(2080, 12, 30), true);
  assertEquals(isValidNepaliDate(2080, 3, 32), true);
  assertEquals(isValidNepaliDate(2080, 4, 32), true);
});

Deno.test("isValidNepaliDate - invalid dates", () => {
  assertEquals(isValidNepaliDate(2080, 0, 15), false);
  assertEquals(isValidNepaliDate(2080, 13, 15), false);
  assertEquals(isValidNepaliDate(2080, 1, 0), false);
  assertEquals(isValidNepaliDate(2080, 1, 33), false);
  assertEquals(isValidNepaliDate(2080, 10, 30), false);
});

Deno.test("compareNepaliDates - different scenarios", () => {
  assertEquals(compareNepaliDates(2080, 1, 15, 2080, 1, 15), 0);
  assertNotEquals(compareNepaliDates(2080, 1, 15, 2081, 1, 15), 0);
  assertEquals(compareNepaliDates(2080, 1, 15, 2081, 1, 15) < 0, true);
  assertNotEquals(compareNepaliDates(2080, 1, 15, 2080, 2, 15), 0);
  assertEquals(compareNepaliDates(2080, 1, 15, 2080, 2, 15) < 0, true);
  assertNotEquals(compareNepaliDates(2080, 1, 15, 2080, 1, 16), 0);
  assertEquals(compareNepaliDates(2080, 1, 15, 2080, 1, 16) < 0, true);
});

Deno.test("getDaysInMonth - returns correct days for each month", () => {
  assertEquals(getDaysInMonth(2080, 1), 31);
  assertEquals(getDaysInMonth(2080, 2), 31);
  assertEquals(getDaysInMonth(2080, 5), 31);
  assertEquals(getDaysInMonth(2080, 6), 31);
  assertEquals(getDaysInMonth(2080, 3), 32);
  assertEquals(getDaysInMonth(2080, 4), 32);
  assertEquals(getDaysInMonth(2080, 7), 30);
  assertEquals(getDaysInMonth(2080, 8), 30);
  assertEquals(getDaysInMonth(2080, 9), 30);
  assertEquals(getDaysInMonth(2080, 11), 30);
  assertEquals(getDaysInMonth(2080, 12), 30);
  assertEquals(getDaysInMonth(2080, 10), 29);
});

Deno.test("VERSION - should be defined", () => {
  assertEquals(typeof VERSION, "string");
  assertEquals(VERSION.split(".").length, 3);
});

const nepaliDate: NepaliDate = {
  year: 2080,
  month: 1,
  day: 15,
  weekday: 0,
  monthName: "बैशाख",
  weekdayName: "आइतबार",
};
