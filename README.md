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

### Format Nepali Date

```ts
import { formatNepaliDate } from "@saurab/nepali-date";

console.log(formatNepaliDate(2071, 1, 30));
// returns "२०७१-०१-३०"
```

### Validate Nepali Date

```ts
import { validateNepaliDate } from "@saurab/nepali-date";

validateNepaliDate(2071, 1, 222); // throws error if date is invalid
```

### Compare Nepali Dates

```ts
import { compareNepaliDates } from "@saurab/nepali-date";

compareNepaliDates(2071, 1, 20, 2071, 1, 30); // return -10
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
