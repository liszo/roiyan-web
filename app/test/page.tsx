import { Suspense } from "react";
import { getPillars, getServices } from "@/lib/api/client";
import { toFarsiDigits } from "@/lib/farsiNumerals";
import { formatTomanWithUnit } from "@/lib/money";

export const metadata = { robots: { index: false } };

async function SampleData() {
  const [pillars, services] = await Promise.all([getPillars(), getServices()]);
  const sample = services[0];

  return (
    <>
      <ol className="mb-8 flex flex-col gap-2">
        {pillars.map((p, i) => (
          <li key={p.code} className="leading-8">
            {toFarsiDigits(i + 1)}. {p.nameFa}
          </li>
        ))}
      </ol>
      {sample && (
        <p className="leading-8">
          {sample.nameFa}: {formatTomanWithUnit(sample.oneTimePriceToman)}
        </p>
      )}
    </>
  );
}

export default function TestPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">ستون‌ها (داده نمونه)</h1>
      <Suspense fallback={<p>در حال بارگذاری…</p>}>
        <SampleData />
      </Suspense>
    </main>
  );
}
