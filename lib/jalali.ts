import { toFarsiDigits } from "@/lib/farsiNumerals";

const jalaliFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "Asia/Tehran",
});

const jalaliLongFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Tehran",
});

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value);
}

/** Jalali date as Persian digits, e.g. «۱۴۰۵/۰۷/۲۳». Accepts an ISO string or Date. */
export function formatJalali(value: string | Date): string {
  const parts = jalaliFormatter.formatToParts(toDate(value));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const pad = (n: string) => n.padStart(2, "0");
  return toFarsiDigits(`${get("year")}/${pad(get("month"))}/${pad(get("day"))}`);
}

/** Long Jalali date, e.g. «۲۳ مهر ۱۴۰۵». */
export function formatJalaliLong(value: string | Date): string {
  return jalaliLongFormatter.format(toDate(value));
}
