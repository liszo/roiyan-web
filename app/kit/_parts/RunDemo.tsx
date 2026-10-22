"use client";

import * as React from "react";
import { Button, type ButtonStatus, type ButtonVariant } from "@/components/ui/button";

// /kit only: tap → loading → success → back to idle, so the in-place states can be judged on a phone.
// The wait is simulated; real pages set `status` from the Server Action result.

export function RunDemo({
  variant = "action",
  label,
  successLabel,
  burst = false,
  waitMs = 1600,
  resetMs = 2800,
}: {
  variant?: ButtonVariant;
  label: string;
  /** Without it the button returns to idle after the wait (e.g. «ادامه» moves to the next question). */
  successLabel?: string;
  burst?: boolean;
  waitMs?: number;
  resetMs?: number;
}) {
  const [status, setStatus] = React.useState<ButtonStatus>("idle");
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    setStatus("loading");
    timers.current.push(
      setTimeout(() => {
        if (!successLabel) return setStatus("idle");
        setStatus("success");
        timers.current.push(setTimeout(() => setStatus("idle"), resetMs));
      }, waitMs),
    );
  }

  return (
    <Button variant={variant} status={status} successLabel={successLabel} burst={burst} onClick={run}>
      {label}
    </Button>
  );
}
