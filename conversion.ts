import { NepaliDate } from "./mod";

interface GregorianDate {
  year: number;
  month: number;
  day: number;
}

export function toGregorianDate(
  npYear: number,
  npMonth: number,
  npDay: number
): GregorianDate {
  // Add conversion logic from Nepali to Gregorian date
  // This requires implementing the actual conversion algorithm
  throw new Error("Not implemented yet");
}

export function fromGregorianDate(
  year: number,
  month: number,
  day: number
): NepaliDate {
  // Add conversion logic from Gregorian to Nepali date
  // This requires implementing the actual conversion algorithm
  throw new Error("Not implemented yet");
}
