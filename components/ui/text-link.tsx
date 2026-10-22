import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./button.css";

// Text link (kit #01 · D-095). Styles: ./button.css (rb-link).
// - standalone: own line, 44 px tall tap area, arrow ← at the end that nudges on hover/focus.
// - inline: inside a sentence, kept on one line, exempt from the 44 px rule (WCAG 2.5.8 inline exception).
// Thin underline at rest (never colour-only); a 2 px underline grows from the start (right) when engaged.

export type TextLinkProps = Omit<ComponentProps<typeof Link>, "children"> & {
  children: string;
  inline?: boolean;
  /** Arrow at the end (standalone only, default on). */
  arrow?: boolean;
  /** White text and focus ring for night surfaces. */
  tone?: "light" | "night";
  /** /kit only: draw a state statically. */
  forceState?: "hover" | "focus";
};

export function TextLink({ children, inline = false, arrow = true, tone = "light", forceState, className, ...props }: TextLinkProps) {
  return (
    <Link
      className={["rb-link", className].filter(Boolean).join(" ")}
      data-inline={inline ? "" : undefined}
      data-tone={tone === "night" ? "night" : undefined}
      data-force={forceState}
      {...props}
    >
      <span className="rb-link-text">{children}</span>
      {!inline && arrow && (
        <span className="rb-arrow">
          <ArrowLeft aria-hidden strokeWidth={2.4} />
        </span>
      )}
    </Link>
  );
}
