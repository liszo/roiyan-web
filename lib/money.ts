import { toFarsiDigits } from "@/lib/farsiNumerals";

/** Groups digits in threes with the Persian thousands separator «٬». */
function groupThousands(amount: number): string {
  return String(Math.round(Math.abs(amount))).replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
}

/** Toman amount as Persian digits with «٬» separators, e.g. «۱۲٬۵۰۰٬۰۰۰». No unit. */
export function formatToman(amount: number): string {
  const sign = amount < 0 ? "−" : "";
  return toFarsiDigits(sign + groupThousands(amount));
}

/** Toman amount with the unit, e.g. «۱۲٬۵۰۰٬۰۰۰ تومان». */
export function formatTomanWithUnit(amount: number): string {
  return `${formatToman(amount)} تومان`;
}
