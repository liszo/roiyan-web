const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/**
 * Converts Latin digits (0-9) in a string or number to Persian numerals.
 * Other characters (%, +, /, spaces, separators) are kept as-is.
 */
export function toFarsiDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => persianDigits[Number(digit)]);
}
