# Nepali Date Library

A comprehensive Nepali date manipulation library for Deno. This library provides utilities for working with Nepali (Bikram Sambat) dates, including formatting, conversion, and date arithmetic.

[![Tags](https://img.shields.io/github/v/tag/saurab/nepali-date)](https://github.com/saurab/nepali-date/tags)
[![License](https://img.shields.io/github/license/saurab/nepali-date)](https://github.com/saurab/nepali-date/blob/main/LICENSE)

## Features

- Format Nepali dates with various patterns
- Convert between Nepali and Gregorian dates
- Date arithmetic operations
- Supports both English and Nepali languages
- Zero dependencies
- Tree-shakeable exports
- Type-safe with TypeScript

## Usage

```ts
import { NepaliDate } from "nepali-date";

// Create a new Nepali date
const date = new NepaliDate();

// Format date
console.log(date.format("YYYY-MM-DD")); // 2081-01-02

// Convert to Gregorian
const gregorianDate = date.toGregorian();

// Date arithmetic
const tomorrow = date.add({ days: 1 });
const nextMonth = date.add({ months: 1 });

// Parse from string
const parsedDate = NepaliDate.parse("2081-01-02");

// Get date components
console.log(date.getYear()); // 2081
console.log(date.getMonth()); // 1 (Baisakh)
console.log(date.getDate()); // 2

// Localized output
console.log(date.format("MMMM DD, YYYY", "ne")); // बैशाख ०२, २०८१
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
