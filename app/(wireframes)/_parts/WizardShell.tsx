import type { ReactNode } from "react";
import { toFarsiDigits } from "@/lib/farsiNumerals";
import { BarButton, PhoneFrame } from "./PhoneFrame";

// Wireframe-only wizard shell (DESIGN.md §7): back button, progress «مرحله x از n»,
// one question, optional hint, the options, sticky bottom button. Copy: content/wizard.md §1.

export function WizardShell({
  label,
  note,
  step,
  total,
  question,
  hint,
  children,
  next = "ادامه",
  enabled,
  keyboard,
  scrolledBy,
}: {
  label: string;
  note?: string;
  step: number;
  total: 8 | 9;
  question?: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  /** Sticky button text (content/wizard.md §1: «ادامه», or «ساخت پلن من» on the last question). */
  next?: string;
  enabled: boolean;
  keyboard?: boolean;
  scrolledBy?: number;
}) {
  return (
    <PhoneFrame
      label={label}
      note={note}
      keyboard={keyboard}
      scrolledBy={scrolledBy}
      bar={<BarButton enabled={enabled}>{next}</BarButton>}
    >
      {/* top bar */}
      <div className="flex flex-col gap-3 border-b border-neutral-300 px-4 pb-3 pt-2">
        <div className="flex h-11 items-center justify-between">
          <button type="button" className="flex h-11 items-center gap-1 text-sm font-medium text-neutral-800">
            <span aria-hidden>→</span> بازگشت
          </button>
          <span className="text-sm text-neutral-700">
            مرحله {toFarsiDigits(step)} از {toFarsiDigits(total)}
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-200" aria-hidden>
          <div className="h-full rounded-full bg-neutral-600" style={{ width: `${(step / total) * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-6">
        {question && <h2 className="text-xl font-bold leading-9">{question}</h2>}
        {hint && <p className="-mt-2 text-sm leading-7 text-neutral-600">{hint}</p>}
        {children}
      </div>
    </PhoneFrame>
  );
}

type OptionState = "idle" | "selected" | "blocked";

/** Full-width tappable option row (single or multi). Selected = heavy border + grey fill + mark. */
export function OptionRow({
  label,
  hint,
  state = "idle",
  multi = false,
}: {
  label: string;
  hint?: string;
  state?: OptionState;
  multi?: boolean;
}) {
  const box =
    state === "selected"
      ? "border-2 border-neutral-900 bg-neutral-200"
      : state === "blocked"
        ? "border border-dashed border-neutral-400 text-neutral-400"
        : "border border-neutral-400";
  return (
    <div className={`flex min-h-14 items-center gap-3 rounded-[12px] px-4 py-2 ${box}`}>
      <span
        aria-hidden
        className={`flex size-5 shrink-0 items-center justify-center border-2 text-[11px] ${
          multi ? "rounded-[4px]" : "rounded-full"
        } ${state === "selected" ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-400"}`}
      >
        {state === "selected" ? "✓" : ""}
      </span>
      <span className="flex flex-col">
        <span className="text-base font-medium leading-7">{label}</span>
        {hint && <span className="text-xs leading-6 text-neutral-600">{hint}</span>}
      </span>
    </div>
  );
}

/** Short chip for long single-choice lists (industry), two per row. */
export function Chip({ label, hint, selected = false }: { label: string; hint?: string; selected?: boolean }) {
  return (
    <div
      className={`flex min-h-11 flex-col justify-center rounded-[10px] px-3 py-1.5 text-center ${
        selected ? "border-2 border-neutral-900 bg-neutral-200" : "border border-neutral-400"
      }`}
    >
      <span className="text-sm font-medium leading-6">{label}</span>
      {hint && <span className="text-[11px] leading-5 text-neutral-600">{hint}</span>}
    </div>
  );
}

/** A labelled group of short single choices drawn as segments (screens 7 Org and 8). */
export function ChoiceGroup({
  question,
  hint,
  options,
  selected,
}: {
  question: string;
  hint?: string;
  options: string[];
  selected?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-base font-bold leading-8">{question}</legend>
      {hint && <p className="-mt-1 text-xs leading-6 text-neutral-600">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <span
            key={o}
            className={`flex min-h-11 items-center rounded-[10px] px-3 text-sm ${
              o === selected ? "border-2 border-neutral-900 bg-neutral-200 font-bold" : "border border-neutral-400"
            }`}
          >
            {o}
          </span>
        ))}
      </div>
    </fieldset>
  );
}

/** Neutral notice inside a frame (limit reached, errors). */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="rounded-[10px] border border-neutral-500 bg-neutral-100 px-3 py-2 text-sm leading-7">
      {children}
    </p>
  );
}
