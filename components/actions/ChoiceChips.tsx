"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Kit #01 · Choice chips: short, tappable choices that look like buttons but ARE native radios (single) or
// checkboxes (multi), so arrow keys, Space, labels and screen-reader roles come from the browser.
// Selected = brand tint + brand border + check mark (DESIGN.md §7: never the action colour; not colour alone).
// Used for short answers (wizard screen 8 bands, Org screen 7). Large option cards are kit #10.

export type ChoiceOption = { value: string; label: string; hint?: string; disabled?: boolean };

type Props = {
  name: string;
  legend: string;
  hint?: string;
  options: ChoiceOption[];
  multiple?: boolean;
  /** Multi only: at most this many. A further tap is refused with `limitMessage`. */
  max?: number;
  limitMessage?: string;
  defaultValue?: string | string[];
  /** Validation message in Persian, e.g. «یک گزینه را انتخاب کنید.» */
  error?: string;
  disabled?: boolean;
  /** /kit only: draw the keyboard focus ring on this option. */
  forceFocus?: string;
  className?: string;
};

export function ChoiceChips({
  name,
  legend,
  hint,
  options,
  multiple = false,
  max,
  limitMessage,
  defaultValue,
  error,
  disabled = false,
  forceFocus,
  className,
}: Props) {
  const initial = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const [selected, setSelected] = React.useState<string[]>(initial);
  const [limitHit, setLimitHit] = React.useState(false);
  const id = React.useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const msgId = `${id}-msg`;
  const message = error ?? (limitHit ? limitMessage : undefined);

  function onChange(value: string, checked: boolean) {
    if (!multiple) {
      setSelected([value]);
      return;
    }
    if (checked && max !== undefined && selected.length >= max) {
      setLimitHit(true); // refuse the extra choice; the input stays unchecked because state did not change
      return;
    }
    setLimitHit(false);
    setSelected((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  }

  return (
    <fieldset
      className={cn("flex flex-col gap-3", className)}
      aria-describedby={[hintId, message ? msgId : undefined].filter(Boolean).join(" ") || undefined}
      aria-invalid={error ? true : undefined}
      disabled={disabled}
    >
      <legend className="mb-1 text-base font-bold leading-8 text-ink">{legend}</legend>
      {hint && (
        <p id={hintId} className="-mt-2 text-sm leading-7 text-muted-foreground">
          {hint}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const isOn = selected.includes(o.value);
          return (
            <label
              key={o.value}
              data-force={forceFocus === o.value ? "focus" : undefined}
              className={cn(
                "group/chip relative inline-flex min-h-11 cursor-pointer select-none items-center gap-2 rounded-full border px-4 py-2 text-sm leading-6",
                "transition-[background-color,border-color,color] duration-150 motion-reduce:transition-none",
                // default + hover (decoration only; selection happens on tap/click/Space)
                "border-border bg-surface text-ink hover:border-brand/60",
                // selected
                "has-checked:border-brand has-checked:bg-brand-tint has-checked:font-bold has-checked:text-brand",
                // keyboard focus on the hidden native input
                "has-focus-visible:ring-3 has-focus-visible:ring-brand/70 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-surface",
                "data-[force=focus]:ring-3 data-[force=focus]:ring-brand/70 data-[force=focus]:ring-offset-2",
                // disabled
                "has-disabled:cursor-not-allowed has-disabled:border-dashed has-disabled:text-muted-foreground has-disabled:hover:border-border",
                // error: border only; the message below carries the meaning
                error && !isOn && "border-danger/70",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.value}
                checked={isOn}
                disabled={o.disabled}
                onChange={(e) => onChange(o.value, e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "inline-flex size-4 shrink-0 items-center justify-center border-[1.5px] border-muted-foreground",
                  multiple ? "rounded-[4px]" : "rounded-full",
                  "peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white",
                )}
              >
                <Check className="hidden size-3 group-has-checked/chip:block" strokeWidth={3} />
              </span>
              <span className="flex flex-col">
                <span>{o.label}</span>
                {o.hint && <span className="text-xs font-normal text-muted-foreground">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      <p
        id={msgId}
        role={error ? "alert" : "status"}
        className={cn("min-h-6 text-sm leading-6", error ? "text-danger" : "text-ink")}
      >
        {message}
      </p>
    </fieldset>
  );
}
