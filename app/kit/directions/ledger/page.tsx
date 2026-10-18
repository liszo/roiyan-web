import type { ReactNode } from "react";
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
import "./ledger.css";

// Direction C · «دفتر گزارش» (Ledger)
// Refs: 63 Ghost / 64 Cartesia / 59 Zapier (ruled pricing, honest lines), 21 Monarch + 44 Wise
// (big number, tiny label), 38 Interfere (diagnosis record), 56 13g (founders beside "book a call").
// A calm report: start-aligned, numbered sections, ruled rows instead of cards, compact rhythm.

export const metadata = { title: "جهت ج · دفتر گزارش" };

function Section({
  children,
  index,
  label,
  id,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  index: number;
  label: string;
  id?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section id={id} className={`px-4 py-12 md:px-10 md:py-[72px] ${className}`}>
      <div className="mx-auto grid max-w-[1120px] gap-6 md:grid-cols-[200px_1fr] md:gap-10">
        <p className={`flex items-center gap-3 self-start border-t-2 border-current pt-3 text-sm font-medium md:sticky md:top-6 ${dark ? "text-white/80" : "text-brand"}`}>
          <span className="tabular-nums">{toFarsiDigits(String(index).padStart(2, "0"))}</span>
          <span>{label}</span>
        </p>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Heading({ children, lead }: { children: ReactNode; lead: string }) {
  return (
    <div className="mb-8 max-w-[680px]">
      <h2 className="text-[22px] font-bold leading-[1.7] text-ink md:text-[28px] md:leading-[1.65]">{children}</h2>
      <p className="mt-2 text-base leading-[1.85] text-muted-foreground">{lead}</p>
    </div>
  );
}

function ScoreCard() {
  return (
    <figure className="rounded-[12px] border border-border bg-surface p-5 md:p-6" aria-label="نمونهٔ کارت امتیاز برای یک کسب‌وکار فرضی">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <SampleTag>{sampleDiagnosis.label}</SampleTag>
        <span className="text-sm text-muted-foreground">{sampleDiagnosis.business}</span>
      </div>
      <div className="flex items-end gap-3 pt-5">
        <span className="sr-only">امتیاز {toFarsiDigits(sampleDiagnosis.score)} از ۱۰۰</span>
        <span
          aria-hidden
          className="lg-score text-[64px] font-black leading-none text-brand md:text-[80px]"
          style={{ ["--score" as string]: sampleDiagnosis.score }}
        />
        <span aria-hidden className="pb-2 text-base text-muted-foreground">از ۱۰۰ · امتیاز سلامت</span>
      </div>
      <ul className="mt-6 flex flex-col gap-3">
        {sampleDiagnosis.pillars.map((pillar, i) => {
          const leak = pillar.state === "leak";
          return (
            <li key={pillar.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5">
              <span className={`text-sm leading-6 ${leak ? "font-bold text-ink" : "text-ink/80"}`}>
                {pillar.name}
                {leak && <span className="lg-flag ms-3 inline-block rounded-full align-middle bg-[#fdf4e8] px-2 py-0.5 text-xs font-bold text-warning">ضعیف‌ترین بخش</span>}
              </span>
              <span className={`text-sm tabular-nums ${leak ? "font-bold text-warning" : "text-muted-foreground"}`}>
                {toFarsiDigits(pillar.value)}
              </span>
              <span className="col-span-2 h-2 overflow-hidden rounded-full bg-[#eef2f1]">
                <span
                  className={`lg-bar block h-full rounded-full ${leak ? "lg-bar-leak" : "bg-brand"}`}
                  style={{ width: `${pillar.value}%`, ["--i" as string]: i }}
                />
              </span>
            </li>
          );
        })}
      </ul>
      <p className="lg-flag mt-5 border-t border-border pt-4 text-sm leading-7 text-ink">
        <strong>نشتی:</strong> {sampleDiagnosis.leak} · <strong className="text-brand">در پلن:</strong> {sampleDiagnosis.fix}
      </p>
    </figure>
  );
}

function RuledRow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <li className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border py-4 md:grid-cols-[3rem_1fr]">
      <span className="pt-0.5 text-sm font-medium tabular-nums text-brand">{toFarsiDigits(String(index).padStart(2, "0"))}</span>
      <div>{children}</div>
    </li>
  );
}

export default async function LedgerPreview() {
  const month = await currentMonth();
  const prices = priceSection(month);

  return (
    <div className="min-h-screen bg-surface pb-24 text-ink md:pb-0">
      <KitBar name="دفتر گزارش" />

      {/* Header */}
      <header className="border-b border-ink/80">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 md:px-10">
          <span className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-brand">رویان</span>
            <span className="hidden text-sm text-muted-foreground sm:inline">تشخیص و رشد کسب‌وکار</span>
          </span>
          <OutlineButton className="min-h-11 px-4 text-sm">{cta.start}</OutlineButton>
        </div>
      </header>

      {/* 1 · Hero */}
      <section className="px-4 pb-12 pt-10 md:px-10 md:pb-[72px] md:pt-16">
        <div className="mx-auto grid max-w-[1120px] items-start gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <div>
            <p className="mb-5 text-sm font-medium text-brand">پرونده‌ای که از تشخیص شروع می‌شود</p>
            <h1 className="text-[28px] font-bold leading-[1.65] md:text-[40px] md:leading-[1.6]">{hero.title}</h1>
            <p className="mt-4 max-w-[560px] text-base leading-[1.9] text-muted-foreground md:text-lg">{hero.lead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionButton>{hero.primary}</ActionButton>
              <OutlineButton>{hero.secondary}</OutlineButton>
            </div>
            <a href="#" className="mt-3 inline-flex min-h-11 items-center text-[15px] text-brand underline underline-offset-8">
              {hero.starterLink}
            </a>
            <p className="text-sm leading-7 text-muted-foreground">{hero.note}</p>
          </div>
          <ScoreCard />
        </div>
      </section>

      {/* 2 · How it works */}
      <Section index={2} label="روش کار" id="how" className="border-t border-border">
        <Heading lead={how.lead}>{how.title}</Heading>
        <ol>
          {how.steps.map((step, i) => (
            <li key={step.title} className="grid gap-1 border-t border-border py-5 md:grid-cols-[180px_1fr] md:gap-6">
              <h3 className="flex items-baseline gap-3 text-lg font-bold leading-8">
                <span className="text-3xl font-black leading-none text-brand">{toFarsiDigits(i + 1)}</span>
                {step.title}
              </h3>
              <p className="text-base leading-[1.85] text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
        <OutlineButton className="mt-6">{cta.start}</OutlineButton>
      </Section>

      {/* 3 · Six problems — a two-column ledger */}
      <Section index={3} label="شش مشکل" id="problems" className="border-t border-border">
        <Heading lead={problems.lead}>{problems.title}</Heading>
        <div role="table" aria-label="مشکل‌ها و کاری که می‌کنیم">
          <div role="row" className="hidden grid-cols-[1fr_1.3fr] gap-6 border-b-2 border-ink/80 pb-2 text-sm font-medium text-muted-foreground md:grid">
            <span role="columnheader">مشکل</span>
            <span role="columnheader">کاری که می‌کنیم</span>
          </div>
          {problems.items.map((item) => (
            <div role="row" key={item.problem} className="grid gap-1 border-b border-border py-4 md:grid-cols-[1fr_1.3fr] md:gap-6">
              <span role="cell" className="text-base font-bold leading-8">
                {item.problem}
              </span>
              <span role="cell" className="text-base leading-[1.85] text-muted-foreground">
                {item.fix}
              </span>
            </div>
          ))}
        </div>
        <OutlineButton className="mt-6">{cta.start}</OutlineButton>
      </Section>

      {/* 4 · Pay for results — dark brand band, rules as numbered rows */}
      <div className="bg-brand-dark text-white">
        <Section index={4} label="پرداخت برای نتیجه" id="results" dark>
          <div className="mb-8 max-w-[680px]">
            <h2 className="text-[22px] font-bold leading-[1.7] md:text-[28px]">{results.title}</h2>
            <p className="mt-2 text-base leading-[1.85] text-white/80">{results.lead}</p>
          </div>
          <dl className="mb-10 grid grid-cols-3 border-y border-white/20">
            {ruleFigures.map((rule) => (
              <div key={rule.label} className="flex flex-col border-s border-white/20 px-3 py-5 first:border-s-0 md:px-6">
                <dd className="text-4xl font-black leading-none md:text-5xl">
                  {rule.figure}
                  <span className="ms-1 text-sm font-medium text-white/75 md:text-base">{rule.unit}</span>
                </dd>
                <dt className="order-last mt-2 text-xs leading-6 text-white/75 md:text-sm">{rule.label}</dt>
              </div>
            ))}
          </dl>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: results.countingTitle, items: results.counting },
              { title: results.paymentTitle, items: results.payment },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="mb-2 text-lg font-bold leading-8">{group.title}</h3>
                <ol>
                  {group.items.map((rule, i) => (
                    <li key={rule.title} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-white/15 py-3.5">
                      <span className="text-sm tabular-nums text-white/70">{toFarsiDigits(String(i + 1).padStart(2, "0"))}</span>
                      <p className="text-[15px] leading-[1.85] text-white/85">
                        <strong className="font-bold text-white">{rule.title}</strong> {rule.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <OutlineButton tone="light" className="mt-8">
            {cta.start}
          </OutlineButton>
        </Section>
      </div>

      {/* 5 · Open prices */}
      <Section index={5} label="قیمت باز" id="prices">
        <Heading lead={prices.lead}>{prices.title}</Heading>
        <p className="mb-2 inline-flex items-center gap-2 rounded-[8px] border border-brand px-3 py-1.5 text-sm font-bold text-brand">
          معتبر تا پایان {month}
        </p>
        <ol>
          {prices.notes.map((note, i) => (
            <RuledRow key={note} index={i + 1}>
              <p className="text-base leading-[1.85] text-muted-foreground">{note}</p>
            </RuledRow>
          ))}
        </ol>
        <OutlineButton className="mt-6">{cta.prices}</OutlineButton>
      </Section>

      {/* 6 · Founders — faces next to the booking button */}
      <Section index={6} label="بنیان‌گذاران" className="border-t border-border">
        <Heading lead={founders.lead}>{founders.title}</Heading>
        <div className="flex flex-col gap-6 rounded-[12px] bg-bg p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              {[0, 1].map((i) => (
                <span key={i} aria-hidden className="size-16 rounded-full border-2 border-surface bg-brand-tint" />
              ))}
            </div>
            <span className="text-sm leading-7 text-muted-foreground">{founders.placeholder}</span>
          </div>
          <OutlineButton>{cta.book}</OutlineButton>
        </div>
      </Section>

      {/* 7 · FAQ */}
      <Section index={7} label="پرسش‌ها" className="border-t border-border">
        <Heading lead={faq.lead}>{faq.title}</Heading>
        <div>
          {faq.items.map((item, i) => (
            <details key={item.q} name="faq-c" className="group border-t border-border last:border-b">
              <summary className="grid min-h-14 cursor-pointer list-none grid-cols-[2rem_1fr_auto] items-center gap-3 py-3 md:grid-cols-[3rem_1fr_auto]">
                <span className="text-sm tabular-nums text-brand">{toFarsiDigits(String(i + 1).padStart(2, "0"))}</span>
                <span className="text-base font-bold leading-8">{item.q}</span>
                <span aria-hidden className="text-sm text-brand group-open:hidden">باز کنید</span>
                <span aria-hidden className="hidden text-sm text-brand group-open:inline">بستن</span>
              </summary>
              <p className="pb-5 ps-11 text-base leading-[1.9] text-muted-foreground md:ps-[3.75rem]">{item.a}</p>
            </details>
          ))}
        </div>
        <OutlineButton className="mt-6">{cta.book}</OutlineButton>
      </Section>

      {/* 8 · Final CTA */}
      <section className="bg-brand-dark px-4 py-14 text-white md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <h2 className="text-[26px] font-bold leading-[1.65] md:text-[36px]">{finalCta.title}</h2>
            <p className="mt-2 text-base leading-[1.85] text-white/80">{finalCta.lead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionButton>{cta.start}</ActionButton>
            <OutlineButton tone="light">{cta.book}</OutlineButton>
          </div>
        </div>
      </section>

      <footer className="px-4 py-8 text-center text-sm text-muted-foreground">
        <span className="font-bold text-brand">رویان</span> · تشخیص و رشد کسب‌وکار
      </footer>

      <StickyStart label={cta.start} />
    </div>
  );
}
