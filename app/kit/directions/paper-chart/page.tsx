import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { toFarsiDigits } from "@/lib/farsiNumerals";
import {
  currentMonth,
  cta,
  faq,
  finalCta,
  founders,
  hero,
  how,
  priceSection,
  problems,
  results,
  ruleFigures,
  sampleDiagnosis,
} from "../_shared/copy";
import { ActionButton, KitBar, OutlineButton, SampleTag, StickyStart } from "../_shared/kit-parts";
import "./paper-chart.css";

// Direction A · «کاغذ تشخیص» (Paper Chart)
// Refs: 23 Planned (cream + teal, ruled grid, stat row), 38 Interfere (diagnosis record as hero),
// 05 Joyful (one artifact explains the process). Airy, centred, calm.

export const metadata = { title: "جهت الف · کاغذ تشخیص" };

function Section({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`pc-section px-4 py-16 md:px-12 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

function Heading({ children, lead }: { children: ReactNode; lead: string }) {
  return (
    <div className="mx-auto mb-10 max-w-[640px] text-center md:mb-14">
      <h2 className="text-[26px] font-bold leading-[1.6] text-ink md:text-4xl md:leading-[1.5]">{children}</h2>
      <p className="mt-3 text-[17px] leading-[2] text-muted-foreground md:text-lg">{lead}</p>
    </div>
  );
}

function DiagnosisCard() {
  return (
    <figure
      className="pc-card relative mx-auto mt-12 w-full max-w-[560px] overflow-hidden rounded-[12px] border border-border bg-surface p-5 text-start shadow-[0_1px_0_rgba(15,92,90,0.06),0_12px_32px_-16px_rgba(15,92,90,0.25)] md:mt-16 md:p-7"
      aria-label="نمونهٔ کارت تشخیص برای یک کسب‌وکار فرضی"
    >
      <span aria-hidden className="pc-scan" />
      <div className="flex items-center justify-between gap-3">
        <SampleTag>{sampleDiagnosis.label}</SampleTag>
        <span className="text-sm text-muted-foreground">{sampleDiagnosis.business}</span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">امتیاز سلامت کسب‌وکار</p>
          <p className="mt-1 text-5xl font-light leading-none text-brand md:text-6xl">
            {toFarsiDigits(sampleDiagnosis.score)}
            <span className="ms-2 text-base font-normal text-muted-foreground">از ۱۰۰</span>
          </p>
        </div>
        <p className="max-w-[12rem] text-end text-xs leading-6 text-muted-foreground">
          امتیاز از پاسخ‌های ویزارد ساخته می‌شود؛ این کارت فقط نمونه است.
        </p>
      </div>

      <ul className="mt-4 flex flex-col gap-1">
        {sampleDiagnosis.pillars.map((pillar, i) => {
          const leak = pillar.state === "leak";
          return (
            <li
              key={pillar.name}
              className={`pc-row ${leak ? "pc-leak-row" : ""} grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 rounded-[8px] px-2 py-2`}
              style={{ ["--i" as string]: i }}
            >
              <span className="text-sm leading-6 text-ink">{pillar.name}</span>
              <span className="h-1.5 rounded-full bg-[#eef2f1]">
                <span
                  className={`block h-full rounded-full ${leak ? "bg-action-dark" : "bg-brand/70"}`}
                  style={{ width: `${pillar.value}%` }}
                />
              </span>
              <span className={`text-end text-sm tabular-nums ${leak ? "font-bold text-warning" : "text-muted-foreground"}`}>
                {toFarsiDigits(pillar.value)}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="pc-fix mt-5 rounded-[10px] bg-brand-tint p-4">
        <p className="text-sm font-bold leading-7 text-ink">ضعیف‌ترین بخش: {sampleDiagnosis.leak}</p>
        <p className="mt-1 flex items-center gap-2 text-sm leading-7 text-brand">
          <span aria-hidden className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <Check className="size-3" strokeWidth={3} />
          </span>
          پیشنهاد پلن: {sampleDiagnosis.fix}
        </p>
      </div>
    </figure>
  );
}

export default async function PaperChartPreview() {
  const month = await currentMonth();
  const prices = priceSection(month);

  return (
    <div className="pc-paper min-h-screen text-ink">
      <KitBar name="کاغذ تشخیص" />

      <div className="pc-rails mx-auto max-w-[1180px] pb-24 md:pb-0">
        {/* Header */}
        <header className="flex h-16 items-center justify-between gap-4 px-4 md:h-20 md:px-12">
          <span className="text-2xl font-bold text-brand">رویان</span>
          <nav className="hidden items-center gap-8 text-[15px] text-muted-foreground md:flex" aria-label="ناوبری نمونه">
            <a href="#how">روش کار</a>
            <a href="#problems">مشکل‌ها</a>
            <a href="#results">پرداخت برای نتیجه</a>
            <a href="#prices">قیمت‌ها</a>
          </nav>
          <OutlineButton className="min-h-11 px-4 text-sm">{cta.start}</OutlineButton>
        </header>

        {/* 1 · Hero */}
        <Section className="pt-10 text-center md:pt-20">
          <h1 className="mx-auto max-w-[760px] text-[34px] font-bold leading-[1.55] text-ink md:text-[56px] md:leading-[1.45]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[2] text-muted-foreground md:text-xl md:leading-[2]">
            {hero.lead}
          </p>
          <div className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3 sm:flex-row sm:justify-center">
            <ActionButton>{hero.primary}</ActionButton>
            <OutlineButton>{hero.secondary}</OutlineButton>
          </div>
          <a href="#" className="mt-4 inline-flex min-h-11 items-center text-[15px] text-brand underline underline-offset-8">
            {hero.starterLink}
          </a>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">{hero.note}</p>
          <DiagnosisCard />
        </Section>

        {/* 2 · How it works */}
        <Section id="how">
          <Heading lead={how.lead}>{how.title}</Heading>
          <ol className="grid gap-0 md:grid-cols-3">
            {how.steps.map((step, i) => (
              <li
                key={step.title}
                className="border-t border-border py-8 md:border-t-0 md:border-s md:px-8 md:py-2 md:first:border-s-0"
              >
                <span className="text-5xl font-light leading-none text-brand">{toFarsiDigits(i + 1)}</span>
                <h3 className="mt-4 text-xl font-bold leading-9">{step.title}</h3>
                <p className="mt-2 text-base leading-[2] text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <OutlineButton>{cta.start}</OutlineButton>
          </div>
        </Section>

        {/* 3 · Six problems */}
        <Section id="problems">
          <Heading lead={problems.lead}>{problems.title}</Heading>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
            {problems.items.map((item, i) => (
              <li key={item.problem} className="rounded-[12px] border border-border bg-surface p-5 md:p-7">
                <span className="text-sm font-medium text-brand">{toFarsiDigits(String(i + 1).padStart(2, "0"))}</span>
                <h3 className="mt-2 text-lg font-bold leading-8">{item.problem}</h3>
                <p className="mt-1 text-base leading-[1.9] text-muted-foreground">{item.fix}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <OutlineButton>{cta.start}</OutlineButton>
          </div>
        </Section>

        {/* 4 · Pay for results */}
        <Section id="results">
          <Heading lead={results.lead}>{results.title}</Heading>
          <dl className="mb-12 grid grid-cols-1 border-y border-border sm:grid-cols-3">
            {ruleFigures.map((rule) => (
              <div key={rule.label} className="border-b border-border px-4 py-7 text-center last:border-b-0 sm:border-b-0 sm:border-s sm:first:border-s-0">
                <dt className="sr-only">{rule.label}</dt>
                <dd>
                  <span className="text-6xl font-light leading-none text-brand md:text-7xl">{rule.figure}</span>
                  <span className="ms-2 text-lg text-brand">{rule.unit}</span>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{rule.label}</p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            {[
              { title: results.countingTitle, items: results.counting },
              { title: results.paymentTitle, items: results.payment },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="text-xl font-bold leading-9">{group.title}</h3>
                <ol className="mt-4 flex flex-col">
                  {group.items.map((rule, i) => (
                    <li key={rule.title} className="flex gap-4 border-t border-border py-4">
                      <span className="text-sm font-medium text-brand">{toFarsiDigits(i + 1)}</span>
                      <p className="text-base leading-[1.95]">
                        <strong className="font-bold">{rule.title}</strong> <span className="text-muted-foreground">{rule.text}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <OutlineButton>{cta.start}</OutlineButton>
          </div>
        </Section>

        {/* 5 · Open prices */}
        <Section id="prices">
          <Heading lead={prices.lead}>{prices.title}</Heading>
          <div className="mx-auto max-w-[720px] rounded-[12px] border border-border bg-surface p-5 md:p-8">
            <p className="mb-4 inline-flex rounded-full bg-brand-tint px-3 py-1 text-sm font-medium text-brand">
              معتبر تا پایان {month}
            </p>
            <ol className="flex flex-col">
              {prices.notes.map((note, i) => (
                <li key={note} className="flex gap-4 border-t border-border py-4 first:border-t-0">
                  <span className="text-sm font-medium text-brand">{toFarsiDigits(i + 1)}</span>
                  <p className="text-base leading-[1.95] text-muted-foreground">{note}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-10 text-center">
            <OutlineButton>{cta.prices}</OutlineButton>
          </div>
        </Section>

        {/* 6 · Founders */}
        <Section>
          <Heading lead={founders.lead}>{founders.title}</Heading>
          <ul className="mx-auto grid max-w-[720px] gap-4 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <li key={i} className="flex items-center gap-4 rounded-[12px] border border-border bg-surface p-5">
                <span aria-hidden className="size-16 shrink-0 rounded-full border border-dashed border-brand/40 bg-brand-tint" />
                <span className="text-sm leading-7 text-muted-foreground">{founders.placeholder}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <OutlineButton>{cta.book}</OutlineButton>
          </div>
        </Section>

        {/* 7 · FAQ */}
        <Section>
          <Heading lead={faq.lead}>{faq.title}</Heading>
          <div className="mx-auto max-w-[760px]">
            {faq.items.map((item) => (
              <details key={item.q} name="faq-a" className="group border-t border-border last:border-b">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-bold leading-8">
                  {item.q}
                  <span aria-hidden className="text-2xl font-light text-brand transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-base leading-[2] text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <OutlineButton>{cta.book}</OutlineButton>
          </div>
        </Section>

        {/* 8 · Final CTA */}
        <Section className="text-center">
          <div className="rounded-[12px] bg-brand-tint px-5 py-14 md:px-12 md:py-20">
            <h2 className="text-[28px] font-bold leading-[1.6] md:text-[40px]">{finalCta.title}</h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[17px] leading-[2] text-muted-foreground">{finalCta.lead}</p>
            <div className="mx-auto mt-8 flex max-w-[480px] flex-col gap-3 sm:flex-row sm:justify-center">
              <ActionButton>{cta.start}</ActionButton>
              <OutlineButton>{cta.book}</OutlineButton>
            </div>
          </div>
        </Section>

        <footer className="flex flex-col items-center gap-2 px-4 py-10 text-sm text-muted-foreground">
          <span className="text-lg font-bold text-brand">رویان</span>
          <span>تشخیص اول، بعد پلن، بعد نتیجه</span>
        </footer>
      </div>

      <StickyStart label={cta.start} />
    </div>
  );
}
