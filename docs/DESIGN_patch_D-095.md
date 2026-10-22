# DESIGN.md patch — D-095 (expressive effects + pill buttons)

Apply three changes to DESIGN.md. Keep everything else as it is.

---

## Change 1 · §3 Visual tokens — replace the "Radius" row with:

| Radius | 12 px cards · **full pill for buttons, chips and toggles** · 10 px inputs | Pills are part of the look (D-095) |

And add this row under it:

| Easing | `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` · `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` · `--ease-press: cubic-bezier(0.34, 1.56, 0.64, 1)` | One set of curves keeps all motion feeling like one family |

---

## Change 2 · §11 Motion, 3D & video — replace the "Palette" row with:

| Palette | Only brand tokens: teal family for scenes, `--color-night` behind them. The action colour marks the **one primary action**: it may glow or carry light on that button (§13), never on decoration elsewhere |

---

## Change 3 · add this new section at the end

## 13 · Expressive effects: glass, glow, gradients, light (D-095)

Glass, glow, gradients, animated borders, liquid fills and particle bursts are **allowed and wanted**. They look "AI-made" only in their default form: purple and blue, black backgrounds, the same effect on every element, endless loops with no meaning, grey glass with nothing behind it. Roiyan uses them with **our palette, our story and a budget**, so they look like ours.

### 13.1 Our version of each effect

| Effect | Roiyan version (what makes it ours) | Fits best | Conditions |
|---|---|---|---|
| **Glass** (frosted surface) | Teal-tinted: brand at 8–16 % over `blur(12–20px) saturate(140%)`, 1 px hairline border (white 20–30 %), 1 px inner top highlight. Something real is always behind it | Navbar after scroll; phone gate over the blurred score preview; secondary button on night sections; sticky totals bar over the plan; text panels over 3D/video | Text contrast AA measured on the busiest part of the background; solid fallback when `backdrop-filter` is unsupported, `prefers-reduced-transparency` is set, or the device is low-end; max 2 blurred elements per viewport |
| **Glow / light** | Light comes from one source and means "live / scanning / here". Action-colour glow only on the one primary action; brand-teal glow on the "leak" point (for example the weakest pillar) | Primary CTA on night sections; the weakest pillar on the results screen; the hero scan | On light pages: plays once on enter and on hover/focus/press (≤ 1.2 s), no idle loop. On night sections: slow loop allowed (≥ 4 s cycle with rest) on the one primary CTA only |
| **Gradients** | Only from tokens: night → brand, brand → brand-dark (same-hue depth), brand → brand-tint, action → action-dark, and a night "aurora" of teal with a little action warmth | Night sections (hero, CTA band, pay-for-results explainer); subtle same-hue depth on button fills; progress fills | Never purple, blue, pink or rainbow; never behind body text; animated gradients are slow (≥ 8 s) or scroll-linked |
| **Spinning / conic border** | Means "scanning in progress" | Loading states only, while something real is waiting: building the plan, sending the OTP, submitting a form | Stops the moment the wait ends; never idle |
| **Liquid / fluid fill** | Fill rises or morphs from the start side with a soft curved edge, in surface or brand-tint | Ghost/outline buttons on night sections; option-card selection | ≤ 500 ms; must work on press as well as hover |
| **Particles / burst / confetti** | Small dots and rings in brand + action colours, no emoji | Earned moments only: OTP verified, plan ready, booking confirmed | Once, ≤ 900 ms, 8–16 particles; never on page load or on ordinary clicks |
| **Depth** (tactile base, layered shadows) | Shadows tinted with brand-dark/ink at low opacity, never pure black; buttons sink on press | All buttons, option cards, toggles | Press feedback must be visible on a phone (≥ 120 ms) |

### 13.2 Budget and composition

1. **One signature effect per screen-height.** Signature effects are glass, glow, animated gradient, conic border, liquid fill and burst. Quiet effects (hover lift, press sink, arrow slide, fades) are unlimited.
2. **Light pages get quiet versions; night sections are the stage** for the full versions.
3. **Every effect has a job:** point to the action, show waiting, confirm success, show layers, or tell the story scan → leak → fix → result. If you can't name its job, remove it.
4. **Still-frame test:** with motion off, the screen still looks finished.
5. **Make it ours:** Vazirmatn, real Persian text, RTL. Light sweeps travel right → left (reading direction), arrows point ← and sit at the end. Colours always from tokens, never library defaults.
6. **Conversion screens** (wizard, phone gate, plan page): effects only respond to the user (select, press, wait, success). No ambient loops, and nothing delays a tap.
7. **Technique and access:** animate only transform, opacity and filter; CSS first, Motion only when CSS can't do it; no canvas/WebGL inside components; `prefers-reduced-motion` → final static state; contrast AA at every animation frame; nothing flashes more than 3 times per second.
