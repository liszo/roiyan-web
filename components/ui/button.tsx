"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Check, LoaderCircle } from "lucide-react";
import "./button.css";

// Roiyan button system (kit #01 · D-095 · DESIGN.md §3, §5, §13). Styles: ./button.css.
//
// Variants and where they belong:
//   action       the ONE primary action per screen on light pages. The arrow circle fills the pill; tactile base.
//   hero         the primary action on night sections. Soft action glow; a light travels the border on enter,
//                then every 6 s (the only loop allowed on a screen).
//   brand        strong secondary on light («ادامه», «دانلود پلن»). Same-hue depth, lifts, arrow slides.
//   ghost        secondary on light («رزرو تماس»). Outline, tint fill, lift, arrow slides.
//   glass        secondary on night or over media. Teal frosted pill; solid fallback built in.
//   ghost-night  secondary on night. A white fill rises from the bottom; the label stays readable every frame.
// Text links: ./text-link.tsx. Icon buttons: ./icon-button.tsx.
//
// States: hover (pointer devices only), focus-visible, pressed (held ≥ 140 ms so a tap is seen), disabled,
// loading (status="loading": border scan + spinner, label stays, no double submit), success (status="success":
// ✓ + successLabel in place; `burst` only for earned moments: plan ready, OTP verified, booking confirmed).
// prefers-reduced-motion → every effect jumps to its end state.

export type ButtonVariant = "action" | "hero" | "brand" | "glass" | "ghost" | "ghost-night";
export type ButtonStatus = "idle" | "loading" | "success";
type ForcedState = "hover" | "focus" | "pressed";

const ORB = new Set<ButtonVariant>(["action", "hero"]);
const ARROW = new Set<ButtonVariant>(["brand", "ghost"]);
const SHADOW = new Set<ButtonVariant>(["brand", "ghost"]);

/** Hold a visible "pressed" state for at least `min` ms, so a quick tap on a phone is still seen. */
export function usePress(min = 140) {
  const [pressed, setPressed] = React.useState(false);
  const since = React.useRef(0);
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const down = React.useCallback(() => {
    clearTimeout(timer.current);
    since.current = performance.now();
    setPressed(true);
  }, []);
  const up = React.useCallback(() => {
    const left = Math.max(0, min - (performance.now() - since.current));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPressed(false), left);
  }, [min]);
  React.useEffect(() => () => clearTimeout(timer.current), []);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) down();
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") up();
  };
  return {
    pressed,
    pressHandlers: { onPointerDown: down, onPointerUp: up, onPointerCancel: up, onPointerLeave: up, onKeyDown, onKeyUp },
  };
}

/** True once the element has been on screen (hero: the light starts when the visitor sees it). */
function useEntered<T extends Element>(enabled: boolean) {
  const ref = React.useRef<T>(null);
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    if (!enabled || entered || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [enabled, entered]);
  return { ref, entered };
}

const noop = () => () => {};
/** Very little memory, or few cores AND little memory: glass uses its solid fallback (DESIGN.md §13.1). */
function isLowEnd() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8; // GB, Chromium only
  return memory <= 2 || (cores <= 4 && memory <= 4);
}

// 12 particles: angle, distance, size, colour token, dot or ring.
const BURST = Array.from({ length: 12 }, (_, i) => ({
  a: `${-160 + i * 28}deg`,
  d: `${46 + (i % 3) * 14}px`,
  s: `${i % 4 === 0 ? 9 : 6}px`,
  c: i % 3 === 0 ? "var(--action)" : "var(--brand)",
  ring: i % 4 === 0,
}));

type CommonProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  size?: "md" | "sm";
  /** Full width (e.g. the mobile sticky bar). */
  block?: boolean;
  /** Leading icon (lucide element), e.g. <Download /> for «دانلود پلن». */
  icon?: React.ReactNode;
  /** Trailing arrow ← on brand/ghost (default on). Action and hero always carry their arrow circle. */
  arrow?: boolean;
  status?: ButtonStatus;
  /** Text shown with ✓ when status="success" (from the copy decks). */
  successLabel?: string;
  /** Particle burst on success — earned moments only. */
  burst?: boolean;
  /** Glass: force the solid fallback. */
  solid?: boolean;
  /** /kit only: draw a pointer/keyboard state statically. */
  forceState?: ForcedState;
  className?: string;
};

export type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & Omit<React.ComponentProps<"button">, "children" | "className">)
    | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "children" | "className" | "href">)
  );

export function Button(props: ButtonProps) {
  const {
    variant = "brand",
    children,
    size = "md",
    block = false,
    icon,
    arrow = true,
    status = "idle",
    successLabel,
    burst = false,
    solid = false,
    forceState,
    className,
    ...rest
  } = props;
  const { pressed, pressHandlers } = usePress();
  const { ref, entered } = useEntered<HTMLElement>(variant === "hero");
  const lowEnd = React.useSyncExternalStore(noop, isLowEnd, () => false);
  const orb = ORB.has(variant);
  const busy = status === "loading";
  const done = status === "success";
  const disabled = "disabled" in rest ? Boolean(rest.disabled) : false;

  const leading = icon ? <span aria-hidden className="inline-flex">{icon}</span> : null;
  const trailing = orb ? (
    <span className="rb-slot">
      {busy ? (
        <LoaderCircle aria-hidden className="rb-spin" strokeWidth={2.4} />
      ) : (
        <span className="rb-arrow">
          <ArrowLeft aria-hidden strokeWidth={2.4} />
        </span>
      )}
    </span>
  ) : busy ? (
    <LoaderCircle aria-hidden className="rb-spin" strokeWidth={2.4} />
  ) : ARROW.has(variant) && arrow ? (
    <span className="rb-arrow">
      <ArrowLeft aria-hidden strokeWidth={2.4} />
    </span>
  ) : null;

  const inner = (
    <>
      {orb && !disabled && <span aria-hidden className="rb-base" />}
      {variant === "hero" && <span aria-hidden className="rb-glow" />}
      {SHADOW.has(variant) && (
        <>
          <span aria-hidden className="rb-shadow" data-s="rest" />
          <span aria-hidden className="rb-shadow" data-s="lift" />
        </>
      )}

      <span className="rb-face">
        <span aria-hidden className="rb-fx">
          {variant === "ghost" && <span className="rb-tint" />}
          {orb && <span className="rb-orb" />}
          {orb && <span className="rb-edge" />}
          {variant === "glass" && <span className="rb-band" />}
          {variant === "hero" && (
            <span className="rb-ring rb-hero-ring">
              <span className="rb-rotor" />
            </span>
          )}
          <span className="rb-ring rb-scan">
            <span className="rb-rotor" />
          </span>
          <span className="rb-donebg" />
        </span>

        <span className="rb-stack">
          <span className="rb-layer" data-layer="idle" data-orb={orb ? "" : undefined} aria-hidden={done || undefined}>
            {orb ? (
              <span className="inline-flex items-center justify-center gap-2">
                {leading}
                <span>{children}</span>
              </span>
            ) : (
              <>
                {leading}
                <span>{children}</span>
              </>
            )}
            {trailing}
          </span>
          {successLabel && (
            <span className="rb-layer" data-layer="done" aria-hidden={!done || undefined}>
              <span className="rb-check">
                <Check aria-hidden strokeWidth={3} />
              </span>
              <span>{successLabel}</span>
            </span>
          )}
        </span>

        {variant === "ghost-night" && (
          <span aria-hidden className="rb-liquid">
            <span className="rb-liquid-label">
              <span className="rb-layer">
                {leading}
                <span>{children}</span>
              </span>
            </span>
          </span>
        )}
      </span>

      {burst && done && (
        <span aria-hidden className="rb-burst">
          {BURST.map((p, i) => (
            <span
              key={i}
              data-ring={p.ring || undefined}
              style={{ ["--a" as string]: p.a, ["--d" as string]: p.d, ["--s" as string]: p.s, ["--c" as string]: p.c }}
            />
          ))}
        </span>
      )}
    </>
  );

  const shared = {
    className: ["rb", className].filter(Boolean).join(" "),
    "data-v": variant,
    "data-size": size === "sm" ? "sm" : undefined,
    "data-block": block ? "" : undefined,
    "data-base": orb && !disabled ? "" : undefined,
    "data-status": status,
    "data-force": forceState,
    "data-pressed": pressed || undefined,
    "data-entered": entered || undefined,
    "data-solid": variant === "glass" && (solid || lowEnd) ? "" : undefined,
  };

  // The outcome is announced outside the control, so it does not become part of the control's name.
  const announce = successLabel ? (
    <span role="status" className="sr-only">
      {done ? successLabel : ""}
    </span>
  ) : null;

  if (props.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<React.ComponentProps<typeof Link>, "children" | "className">;
    return (
      <>
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...shared} {...linkRest} {...pressHandlers}>
          {inner}
        </Link>
        {announce}
      </>
    );
  }

  const { onClick, type, ...buttonRest } = rest as React.ComponentProps<"button">;
  return (
    <>
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? "button"}
        {...shared}
        {...buttonRest}
        // Busy/done keep their colour (working, not unavailable) but ignore further clicks and Enter.
        aria-disabled={busy || done || undefined}
        aria-busy={busy || undefined}
        onClick={(e) => {
          if (busy || done) {
            e.preventDefault();
            return;
          }
          onClick?.(e);
        }}
        {...pressHandlers}
      >
        {inner}
      </button>
      {announce}
    </>
  );
}
