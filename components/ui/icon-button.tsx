"use client";

import type { ComponentProps, ReactNode } from "react";
import { usePress } from "./button";
import "./button.css";

// Icon button (kit #01 · D-095). Styles: ./button.css (rb-icon).
// 44 px circle or soft tile, surface colour, teal-tinted shadow, brand icon; lifts on hover/focus, sinks on press.
// The name is required (aria-label). `caption` prints it under the icon; there is no hover-only tooltip.

export type IconButtonProps = Omit<ComponentProps<"button">, "aria-label" | "children"> & {
  /** Accessible name, e.g. «بازگشت». Required. */
  label: string;
  /** A lucide icon element. Directional icons must already point the RTL way. */
  icon: ReactNode;
  shape?: "circle" | "tile";
  /** Print the label under the icon. */
  caption?: boolean;
  /** White focus ring for night surfaces. */
  tone?: "light" | "night";
  /** /kit only: draw a state statically. */
  forceState?: "hover" | "focus" | "pressed";
};

export function IconButton({
  label,
  icon,
  shape = "circle",
  caption = false,
  tone = "light",
  forceState,
  className,
  type,
  ...props
}: IconButtonProps) {
  const { pressed, pressHandlers } = usePress();
  const button = (
    <button
      type={type ?? "button"}
      aria-label={label}
      className={["rb-icon", className].filter(Boolean).join(" ")}
      data-shape={shape}
      data-tone={tone === "night" ? "night" : undefined}
      data-force={forceState}
      data-pressed={pressed || undefined}
      {...props}
      {...pressHandlers}
    >
      <span aria-hidden className="rb-shadow" data-s="rest" />
      <span aria-hidden className="rb-shadow" data-s="lift" />
      <span aria-hidden className="rb-icon-face">
        {icon}
      </span>
    </button>
  );
  if (!caption) return button;
  return (
    <span className="inline-flex flex-col items-center gap-1.5">
      {button}
      <span aria-hidden className="text-xs leading-5 opacity-80">
        {label}
      </span>
    </span>
  );
}
