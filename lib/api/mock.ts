// SAMPLE DATA ONLY — shaped like the API response. Real prices come only from
// the API. Delete this file before launch (CLAUDE.md, "Infra gotchas").
import type { Pillar, Service } from "@/lib/api/types";

export const mockPillars: Pillar[] = [
  { code: "GA", nameFa: "تحلیل رشد" }, // SAMPLE
  { code: "SY", nameFa: "سیستم‌سازی" }, // SAMPLE
  { code: "AU", nameFa: "اتوماسیون و هوش مصنوعی" }, // SAMPLE
  { code: "DS", nameFa: "راهکارهای دیجیتال" }, // SAMPLE
  { code: "PM", nameFa: "مارکتینگ نتیجه‌محور" }, // SAMPLE
  { code: "VB", nameFa: "دیده‌شدن و برند" }, // SAMPLE
];

export const mockServices: Service[] = [
  {
    code: "SAMPLE-GA-1", // SAMPLE
    pillarCode: "GA", // SAMPLE
    nameFa: "تشخیص و نقشه رشد", // SAMPLE
    oneTimePriceToman: 10_000_000, // SAMPLE
    monthlyPriceToman: null, // SAMPLE
  },
  {
    code: "SAMPLE-SY-1", // SAMPLE
    pillarCode: "SY", // SAMPLE
    nameFa: "راه‌اندازی سیستم فروش", // SAMPLE
    oneTimePriceToman: 20_000_000, // SAMPLE
    monthlyPriceToman: 5_000_000, // SAMPLE
  },
  {
    code: "SAMPLE-AU-1", // SAMPLE
    pillarCode: "AU", // SAMPLE
    nameFa: "اتوماسیون پیگیری مشتری", // SAMPLE
    oneTimePriceToman: 15_000_000, // SAMPLE
    monthlyPriceToman: 3_000_000, // SAMPLE
  },
  {
    code: "SAMPLE-VB-1", // SAMPLE
    pillarCode: "VB", // SAMPLE
    nameFa: "بازطراحی هویت برند", // SAMPLE
    oneTimePriceToman: 25_000_000, // SAMPLE
    monthlyPriceToman: null, // SAMPLE
  },
];
