import type { ReactNode } from "react";

// Wireframe-only phone frame: 375 × 667 viewport drawn as a dashed outline.
// Content flows past the dashed line on purpose, so anything below the fold is obvious.
// Not a real component — delete with the (wireframes) routes.

export const FRAME_W = 375;
export const FRAME_H = 667;
export const BAR_H = 80; // sticky bottom bar: 16 px padding + 48 px button + 16 px padding
export const KEYBOARD_H = 260;

export function PhoneFrame({
  label,
  note,
  children,
  bar,
  keyboard = false,
  scrolledBy = 0,
}: {
  /** LTR label above the frame, e.g. "5 · SB track · G1 owner". */
  label: string;
  /** Extra LTR note under the label (what is assumed, what scrolls). */
  note?: string;
  children: ReactNode;
  /** Sticky bottom bar, pinned to the bottom of the visible viewport (or above the keyboard). */
  bar?: ReactNode;
  /** Draw the on-screen numeric keyboard over the bottom 260 px. */
  keyboard?: boolean;
  /** Draw the page scrolled up by this many px (clipped to the viewport), e.g. focused field above the keyboard. */
  scrolledBy?: number;
}) {
  const barTop = FRAME_H - (keyboard ? KEYBOARD_H : 0) - BAR_H;
  return (
    <figure className="flex flex-col gap-2" style={{ width: FRAME_W }} data-frame={label}>
      <figcaption dir="ltr" lang="en" className="font-mono text-xs leading-5 text-neutral-700">
        <span className="font-bold text-neutral-900">{label}</span>
        {note && <span className="block text-neutral-600">{note}</span>}
      </figcaption>

      <div
        className={`relative bg-white text-neutral-900 ${scrolledBy ? "overflow-hidden" : ""}`}
        style={{ width: FRAME_W, minHeight: FRAME_H, height: scrolledBy ? FRAME_H : undefined }}
      >
        {/* in-flow content; bottom padding keeps the last item clear of the sticky bar */}
        <div
          dir="rtl"
          lang="fa"
          data-frame-content
          style={{ paddingBottom: bar ? BAR_H + 16 : 16, marginTop: scrolledBy ? -scrolledBy : undefined }}
        >
          {children}
        </div>

        {/* the visible viewport (375 × 667) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 border-2 border-dashed border-neutral-500"
          style={{ height: FRAME_H }}
        />

        {keyboard && (
          <div
            dir="ltr"
            className="absolute inset-x-0 flex items-center justify-center bg-neutral-400 text-xs text-neutral-800"
            style={{ top: FRAME_H - KEYBOARD_H, height: KEYBOARD_H }}
          >
            numeric keyboard · 260 px
          </div>
        )}

        {bar && (
          <div
            dir="rtl"
            className="absolute inset-x-0 border-t border-neutral-400 bg-white p-4"
            style={{ top: barTop, height: BAR_H }}
          >
            {bar}
          </div>
        )}
      </div>
    </figure>
  );
}

/** Grey bar standing in for text that is still [TODO] in the copy deck. */
export function TodoBar({ className = "w-40", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-4 rounded-sm align-middle ${dark ? "bg-neutral-500" : "bg-neutral-300"} ${className}`}
    />
  );
}

/** Sticky bottom button: drawn disabled (light grey) until something is selected. */
export function BarButton({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  return (
    <button
      type="button"
      disabled={!enabled}
      className={
        enabled
          ? "h-12 w-full rounded-[10px] bg-neutral-800 text-base font-bold text-white"
          : "h-12 w-full rounded-[10px] bg-neutral-200 text-base font-bold text-neutral-500"
      }
    >
      {children}
    </button>
  );
}
