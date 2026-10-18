import type { ReactNode } from "react";
import { Check, Plus } from "lucide-react";
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
  samplePath,
} from "../_shared/copy";
import { ActionButton, KitBar, OutlineButton, SampleTag, StickyStart } from "../_shared/kit-parts";
import "./leak-map.css";

// Direction B · «نقشهٔ نشتی» (Leak Map)
// Refs: 28 Melius (process drawn as a growing graph), 32 Flowin (diagram vocabulary),
// 37 Spherical Waves (story in numbered lines), 27 Bobbin (above-footer field of pills).
// Story-led, diagrammatic, white + brand-tint panels, rounder shapes.

export const metadata = { title: "جهت ب · نقشهٔ نشتی" };

function Section({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`px-4 py-14 md:px-10 md:py-24 ${className}`}>
      <div className="mx-auto max-w-[1120px]">{children}</div>
    </section>
  );
}

function Heading({ children, lead, eyebrow }: { children: ReactNode; lead: string; eyebrow: string }) {
  return (
    <div className="mb-8 max-w-[620px] md:mb-12">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1 text-sm font-medium text-brand">
        <span aria-hidden className="size-1.5 rounded-full bg-brand" />
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold leading-[1.65] text-ink md:text-[32px] md:leading-[1.6]">{children}</h2>
      <p className="mt-2 text-base leading-[1.9] text-muted-foreground md:text-[17px]">{lead}</p>
    </div>
  );
}

/** Customer path drawn right → left; one node leaks, then is sealed. Pure SVG + CSS. */
function LeakDiagram() {
  // Node x positions in reading order (RTL: first node on the right).
  const xs = [560, 400, 240, 80];
  return (
    <figure className="relative rounded-[24px] bg-brand-tint p-4 md:p-8" aria-label="نمونهٔ نقشهٔ مسیر مشتری با یک نشتی، برای کسب‌وکار فرضی">
      <div className="mb-2 flex items-center justify-between">
        <SampleTag>نمونه · کسب‌وکار فرضی</SampleTag>
        <span className="text-xs text-muted-foreground">مسیر مشتری</span>
      </div>
      <svg viewBox="0 0 640 200" className="block h-auto w-full" role="img" aria-hidden>
        {/* the path, drawn from the right */}
        <path d="M 600 100 L 40 100" className="lm-path" pathLength={1} />
        {/* the leak: drops falling from the weak node */}
        <g className="lm-drops">
          <line x1={400} y1={124} x2={400} y2={188} />
          <line x1={388} y1={130} x2={378} y2={180} />
          <line x1={412} y1={130} x2={422} y2={180} />
        </g>
        {samplePath.map((node, i) => {
          const leak = node.state === "leak";
          return (
            <g key={node.name} className="lm-node" style={{ ["--i" as string]: i }}>
              {leak ? (
                <>
                  <circle cx={xs[i]} cy={100} r={20} className="lm-leak-ring" />
                  <circle cx={xs[i]} cy={100} r={20} className="lm-seal-ring" />
                  <path d={`M ${xs[i] - 7} 100 l 5 5 l 10 -11`} className="lm-seal-tick" />
                </>
              ) : (
                <circle cx={xs[i]} cy={100} r={14} className="lm-ok-node" />
              )}
              <text x={xs[i]} y={leak ? 58 : 62} textAnchor="middle" className="lm-label">
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="lm-result mt-2 flex items-start gap-3 rounded-[16px] bg-surface p-4">
        <span aria-hidden className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        <p className="text-sm leading-7 text-ink">
          نشتی «تماس و پیام» پیدا شد و در پلن بسته می‌شود؛ هر نوبتی که بعد از آن ثبت و با پیامک تأیید شود، شمرده می‌شود.
        </p>
      </div>
    </figure>
  );
}

export default async function LeakMapPreview() {
  const month = await currentMonth();
  const prices = priceSection(month);

  return (
    <div className="min-h-screen bg-surface pb-24 text-ink md:pb-0">
      <KitBar name="نقشهٔ نشتی" />

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/70 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 md:px-10">
          <span className="text-2xl font-bold text-brand">رویان</span>
          <nav className="hidden items-center gap-1 text-[15px] md:flex" aria-label="ناوبری نمونه">
            {[
              ["#how", "روش کار"],
              ["#problems", "مشکل‌ها"],
              ["#results", "پرداخت برای نتیجه"],
              ["#prices", "قیمت‌ها"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-4 py-2 text-muted-foreground hover:bg-brand-tint hover:text-brand">
                {label}
              </a>
            ))}
          </nav>
          <OutlineButton className="min-h-11 px-4 text-sm">{cta.start}</OutlineButton>
        </div>
      </header>

      {/* 1 · Hero */}
      <Section className="pt-10 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14">
          <div>
            <h1 className="text-[30px] font-bold leading-[1.6] md:text-[44px] md:leading-[1.55]">{hero.title}</h1>
            <p className="mt-4 text-[17px] leading-[1.95] text-muted-foreground md:text-lg">{hero.lead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionButton>{hero.primary}</ActionButton>
              <OutlineButton>{hero.secondary}</OutlineButton>
            </div>
            <a href="#" className="mt-3 inline-flex min-h-11 items-center text-[15px] text-brand underline underline-offset-8">
              {hero.starterLink}
            </a>
            <p className="text-sm leading-7 text-muted-foreground">{hero.note}</p>
          </div>
          <LeakDiagram />
        </div>
      </Section>

      {/* 2 · How it works — a vertical path with numbered stops */}
      <Section id="how" className="bg-bg">
        <Heading eyebrow="روش کار" lead={how.lead}>
          {how.title}
        </Heading>
        <ol className="lm-timeline relative flex flex-col gap-10 ps-12 md:gap-14 md:ps-16">
          {how.steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="absolute -start-12 top-0 inline-flex size-9 items-center justify-center rounded-full border-2 border-brand bg-surface text-sm font-bold text-brand md:-start-16 md:size-11 md:text-base"
              >
                {toFarsiDigits(String(i + 1).padStart(2, "0"))}
              </span>
              <h3 className="text-xl font-bold leading-9 md:text-2xl">{step.title}</h3>
              <p className="mt-1 max-w-[620px] text-base leading-[1.95] text-muted-foreground md:text-[17px]">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <OutlineButton>{cta.start}</OutlineButton>
        </div>
      </Section>

      {/* 3 · Six problems — one open at a time */}
      <Section id="problems">
        <Heading eyebrow="شش مشکل" lead={problems.lead}>
          {problems.title}
        </Heading>
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {problems.items.map((item, i) => (
            <details
              key={item.problem}
              name="problems-b"
              open={i === 0}
              className="group rounded-[16px] border border-border bg-surface px-5 transition-colors open:border-brand/40 open:bg-brand-tint"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold leading-8">
                {item.problem}
                <Plus aria-hidden className="size-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-base leading-[1.9] text-ink/80">{item.fix}</p>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <OutlineButton>{cta.start}</OutlineButton>
        </div>
      </Section>

      {/* 4 · Pay for results */}
      <Section id="results">
        <div className="rounded-[24px] bg-brand px-5 py-10 text-white md:px-12 md:py-16">
          <p className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-medium">پرداخت برای نتیجه</p>
          <h2 className="max-w-[640px] text-2xl font-bold leading-[1.65] md:text-[32px] md:leading-[1.6]">{results.title}</h2>
          <p className="mt-2 max-w-[640px] text-base leading-[1.9] text-white/85 md:text-[17px]">{results.lead}</p>
          <p className="mt-8 max-w-[760px] text-lg leading-[2.1] md:text-xl">
            به هر نتیجه <strong className="rounded-md bg-white/15 px-2 font-bold">۷۲ ساعت</strong> وقت اعتراض دارید؛ مبلغ نتیجه‌ها
            حداکثر <strong className="rounded-md bg-white/15 px-2 font-bold">۳ برابر</strong> هزینهٔ پایه است؛ و قرارداد نتیجه‌محور
            دست‌کم <strong className="rounded-md bg-white/15 px-2 font-bold">۳ ماه</strong> است.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { title: results.countingTitle, items: results.counting },
              { title: results.paymentTitle, items: results.payment },
            ].map((group) => (
              <div key={group.title} className="rounded-[16px] bg-white/[0.07] p-5 md:p-6">
                <h3 className="text-lg font-bold leading-8">{group.title}</h3>
                <ul className="mt-3 flex flex-col gap-3">
                  {group.items.map((rule) => (
                    <li key={rule.title} className="flex gap-3">
                      <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-white/80" strokeWidth={2.5} />
                      <p className="text-[15px] leading-[1.9] text-white/90">
                        <strong className="font-bold text-white">{rule.title}</strong> {rule.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <OutlineButton tone="light">{cta.start}</OutlineButton>
          </div>
        </div>
      </Section>

      {/* 5 · Open prices */}
      <Section id="prices">
        <Heading eyebrow={`معتبر تا پایان ${month}`} lead={prices.lead}>
          {prices.title}
        </Heading>
        <ul className="grid gap-3 md:grid-cols-2">
          {prices.notes.map((note) => (
            <li key={note} className="flex gap-3 rounded-[16px] border border-border p-5">
              <Check aria-hidden className="mt-1.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
              <p className="text-base leading-[1.9] text-muted-foreground">{note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <OutlineButton>{cta.prices}</OutlineButton>
        </div>
      </Section>

      {/* 6 · Founders */}
      <Section className="bg-bg">
        <Heading eyebrow="بنیان‌گذاران" lead={founders.lead}>
          {founders.title}
        </Heading>
        <ul className="grid gap-4 sm:grid-cols-2 md:max-w-[760px]">
          {[0, 1].map((i) => (
            <li key={i} className="flex items-center gap-4 rounded-[16px] bg-surface p-5">
              <span aria-hidden className="size-20 shrink-0 rounded-full border border-dashed border-brand/40 bg-brand-tint" />
              <span className="text-sm leading-7 text-muted-foreground">{founders.placeholder}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <OutlineButton>{cta.book}</OutlineButton>
        </div>
      </Section>

      {/* 7 · FAQ */}
      <Section>
        <Heading eyebrow="پرسش‌ها" lead={faq.lead}>
          {faq.title}
        </Heading>
        <div className="flex flex-col gap-3 md:max-w-[820px]">
          {faq.items.map((item) => (
            <details key={item.q} name="faq-b" className="group rounded-[16px] bg-bg px-5">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-bold leading-8 md:text-lg">
                {item.q}
                <Plus aria-hidden className="size-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="pb-5 text-base leading-[1.95] text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <OutlineButton>{cta.book}</OutlineButton>
        </div>
      </Section>

      {/* 8 · Final CTA — a field of brand-tint pills around one headline (ref 27) */}
      <section className="px-4 pb-16 md:px-10">
        <div className="lm-field relative mx-auto max-w-[1120px] overflow-hidden rounded-[28px] bg-bg px-5 py-20 text-center md:py-28">
          <div aria-hidden className="lm-pills">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} style={{ ["--i" as string]: i }} />
            ))}
          </div>
          <div className="relative mx-auto max-w-[520px] rounded-[20px] bg-bg px-4 py-6">
            <h2 className="text-[28px] font-bold leading-[1.6] md:text-[40px]">{finalCta.title}</h2>
            <p className="mt-3 text-[17px] leading-[1.95] text-muted-foreground">{finalCta.lead}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ActionButton>{cta.start}</ActionButton>
              <OutlineButton>{cta.book}</OutlineButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10 text-center text-sm text-muted-foreground">
        <span className="text-lg font-bold text-brand">رویان</span>
      </footer>

      <StickyStart label={cta.start} />
    </div>
  );
}
