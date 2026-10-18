import Link from "next/link";
import type { ReactNode } from "react";
import "./kit-parts.css";

/** Thin bar on top of each preview so nobody mistakes it for the live home page. */
export function KitBar({ name }: { name: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 bg-night px-4 text-sm text-white">
      <span>
        پیش‌نمایش جهت «{name}» · متن از content/home.md · فقط برای مقایسه
      </span>
      <Link href="/kit/directions" className="flex min-h-11 items-center underline underline-offset-4">
        همهٔ جهت‌ها
      </Link>
    </div>
  );
}

/** The one filled button: action colour with ink text (DESIGN.md §3 — never white). */
export function ActionButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="#"
      className={`inline-flex min-h-12 items-center justify-center rounded-[10px] bg-action px-6 text-base font-bold text-ink transition-colors duration-150 hover:bg-action-dark focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {children}
    </a>
  );
}

export function OutlineButton({
  children,
  className = "",
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "light";
}) {
  const colors =
    tone === "light"
      ? "border-white/70 text-white hover:bg-white/10"
      : "border-brand text-brand hover:bg-brand-tint";
  return (
    <a
      href="#"
      className={`inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 px-6 text-base font-medium transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand ${colors} ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Mobile sticky bar (DESIGN.md §5.3). Fades in after the hero via a CSS scroll timeline;
 * browsers without scroll timelines show it all the time.
 */
export function StickyStart({ label }: { label: string }) {
  return (
    <div className="kit-sticky fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 p-3 backdrop-blur md:hidden">
      <ActionButton className="w-full">{label}</ActionButton>
    </div>
  );
}

/** Small «نمونه» label for every illustrative number (CLAUDE.md rule 9). */
export function SampleTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}
