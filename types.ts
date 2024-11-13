export type Language = "en" | "np";
export type DateFormat =
  | "YYYY"
  | "YY"
  | "MM"
  | "MMM"
  | "MMMM"
  | "DD"
  | "ddd"
  | "dddd";

export interface DateOptions {
  language?: Language;
  format?: string;
  strict?: boolean;
}
