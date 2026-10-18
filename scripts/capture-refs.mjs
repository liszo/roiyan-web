// scripts/capture-refs.mjs — Roiyan design-reference capture
//
// What it does, for every URL in refs/direction/urls.txt:
//   • opens the page in a desktop (1440 px) and a phone (390 px) window
//   • scrolls slowly to the bottom like a person (mouse wheel, so smooth-scroll
//     libraries such as Lenis and GSAP ScrollTrigger react as they would for you)
//   • records a video of each scroll (.webm) and saves a screenshot every half screen
//   • makes one "contact sheet" image per device (all frames on one picture)
//   • reads the page's tech: libraries (GSAP, Three.js, Lenis, Framer…), fonts,
//     type sizes, colours, corner radius, running animations, videos, 3D canvases,
//     reduced-motion support, page weight
//   • writes report.md per site and refs/direction/SUMMARY.md for all sites
//
// Run:   npm run refs              (all URLs)
//        npm run refs -- 3         (only line 3 of urls.txt)
// Proxy: set REFS_PROXY=http://127.0.0.1:10809 first if your VPN is a local proxy.
//
// Output lives in refs/direction/ which is git-ignored (never commit other sites' material).
// Purpose: study only. We rebuild ideas our own way; we never copy code, images or text.

import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("refs/direction");
const URL_FILE = path.join(ROOT, "urls.txt");
const MAX_SCROLL_SECONDS = 70; // safety cap per device
const DEVICES = {
  desktop: { viewport: { width: 1440, height: 900 }, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
  mobile: {
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const slug = (s) =>
  s.replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 40).toLowerCase();

async function readUrls() {
  let text;
  try {
    text = await fs.readFile(URL_FILE, "utf8");
  } catch {
    await fs.mkdir(ROOT, { recursive: true });
    await fs.writeFile(
      URL_FILE,
      "# One link per line. Optional short name after a space. Anything after \" #\" is a note.\n# https://example.com calm-fintech  # found on land-book\n",
    );
    console.log(`Created ${URL_FILE} — add your links there and run again.`);
    process.exit(0);
  }
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l, i) => {
      const [url, ...rest] = l.replace(/\s+#.*$/, "").split(/\s+/);
      const name = rest.join("-") || slug(url);
      return { n: i + 1, url, folder: `${String(i + 1).padStart(2, "0")}-${slug(name)}` };
    });
}

async function launchBrowser() {
  const proxy = process.env.REFS_PROXY ? { server: process.env.REFS_PROXY } : undefined;
  // 1st choice: the Google Chrome already installed on this PC (no big download).
  try {
    return await chromium.launch({ channel: "chrome", headless: true, proxy });
  } catch {
    // 2nd choice: Playwright's own Chromium (run `npx playwright install chromium` once).
    return await chromium.launch({ headless: true, proxy });
  }
}

// Runs inside the page: everything we want to know about how it is built.
function inspectPage() {
  const w = window;
  const has = (sel) => !!document.querySelector(sel);
  const scripts = [...document.scripts].map((s) => s.src).filter(Boolean);
  const scriptText = scripts.join(" ").toLowerCase();
  const html = document.documentElement;
  const gen = document.querySelector('meta[name="generator"]')?.content || "";

  const libs = [];
  const add = (name, ok) => ok && libs.push(name);
  add("GSAP", !!w.gsap || /gsap|greensock/.test(scriptText));
  add("GSAP ScrollTrigger", !!w.ScrollTrigger || /scrolltrigger/.test(scriptText));
  add("GSAP SplitText", !!w.SplitText || /splittext/.test(scriptText));
  add("Three.js", !!w.THREE || !!w.__THREE__ || /three(\.module)?(\.min)?\.js/.test(scriptText));
  add("Lenis smooth scroll", !!w.lenis || !!w.Lenis || html.classList.contains("lenis") || /lenis/.test(scriptText));
  add("Locomotive Scroll", has("[data-scroll-container]") || /locomotive/.test(scriptText));
  add("Framer Motion / Motion", has("[data-framer-appear-id]") || has("[data-projection-id]") || /framer-motion|motion\.dev/.test(scriptText));
  add("Framer (site builder)", /framer/i.test(gen) || has("#__framer-badge-container") || /framerusercontent|framer\.com\/m\//.test(scriptText));
  add("Webflow", has("html[data-wf-page]") || /webflow/i.test(gen));
  add("Webflow Interactions (IX2)", /webflow.*\.js/.test(scriptText) && has("[data-w-id]"));
  add("Spline 3D", has("spline-viewer") || /spline\.design|splinetool/.test(scriptText + document.body.innerHTML.slice(0, 200000)));
  add("Rive", /rive\.app|@rive-app/.test(scriptText) || has("canvas[data-rive]"));
  add("Lottie", !!w.lottie || !!w.bodymovin || has("lottie-player, dotlottie-player, dotlottie-wc") || /lottie/.test(scriptText));
  add("Swiper", !!w.Swiper || has(".swiper"));
  add("Splide", has(".splide"));
  add("Barba.js page transitions", !!w.barba || has("[data-barba]"));
  add("anime.js", !!w.anime || /anime(\.min)?\.js/.test(scriptText));
  add("AOS (animate on scroll)", !!w.AOS || has("[data-aos]"));
  add("Next.js", !!w.__NEXT_DATA__ || !!w.next || /\/_next\//.test(scriptText));
  add("Nuxt", !!w.__NUXT__ || /\/_nuxt\//.test(scriptText));
  add("Astro", has("astro-island") || /astro/i.test(gen));
  add("React", !!w.React || has("[data-reactroot]") || !!document.querySelector("#__next, #root")?._reactRootContainer || libs.includes("Next.js"));
  add("Vue", !!w.Vue || has("[data-v-app]"));
  add("Svelte", has("[class*='svelte-']"));
  add("WordPress", /wordpress/i.test(gen) || /wp-content/.test(scriptText));
  add("Tailwind (class names)", has("[class*='px-'][class*='py-']") || has("[class*='md:']"));

  // Typography
  const cs = (el) => (el ? getComputedStyle(el) : null);
  const typo = {};
  for (const tag of ["h1", "h2", "h3", "p", "a", "button"]) {
    const el = [...document.querySelectorAll(tag)].find((e) => e.offsetParent && e.textContent.trim().length > 2);
    const s = cs(el);
    if (s)
      typo[tag] = {
        size: s.fontSize,
        lineHeight: s.lineHeight,
        weight: s.fontWeight,
        letterSpacing: s.letterSpacing,
        family: s.fontFamily.split(",")[0].replace(/["']/g, ""),
      };
  }
  const fontsLoaded = [...new Set([...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family.replace(/["']/g, "")} ${f.weight}`))];

  // Colours, corner radius, by how much area uses them
  const colorArea = {};
  const textColor = {};
  const radius = {};
  const all = [...document.querySelectorAll("body, body *")].slice(0, 6000);
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const s = getComputedStyle(el);
    const area = Math.min(r.width * r.height, 2e6);
    if (s.backgroundColor && !s.backgroundColor.endsWith(", 0)") && s.backgroundColor !== "transparent")
      colorArea[s.backgroundColor] = (colorArea[s.backgroundColor] || 0) + area;
    if (el.childNodes.length && [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim()))
      textColor[s.color] = (textColor[s.color] || 0) + 1;
    if (s.borderRadius && s.borderRadius !== "0px" && r.width > 40) {
      const key = parseFloat(s.borderRadius) > 999 ? "pill" : s.borderRadius;
      radius[key] = (radius[key] || 0) + 1;
    }
  }
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);

  // Layout
  const main = document.querySelector("main") || document.body;
  const sections = [...main.querySelectorAll(":scope > section, :scope > div > section, section")].filter((s) => s.offsetHeight > 200);
  const pads = sections.slice(0, 12).map((s) => parseFloat(getComputedStyle(s).paddingTop)).filter((n) => n > 0);
  const containers = [...document.querySelectorAll("body *")]
    .slice(0, 3000)
    .map((e) => getComputedStyle(e).maxWidth)
    .filter((m) => m.endsWith("px") && parseFloat(m) >= 900 && parseFloat(m) <= 1800);

  // Media and motion
  const videos = [...document.querySelectorAll("video")].map((v) => ({
    src: (v.currentSrc || v.src || v.querySelector("source")?.src || "").split("?")[0].slice(0, 120),
    autoplay: v.autoplay,
    muted: v.muted,
    loop: v.loop,
    poster: !!v.poster,
    size: `${v.clientWidth}×${v.clientHeight}`,
  }));
  const canvases = [...document.querySelectorAll("canvas")]
    .filter((c) => c.clientWidth > 100)
    .map((c) => ({ size: `${c.clientWidth}×${c.clientHeight}`, engine: c.dataset.engine || "" }));

  let reducedMotionRules = 0;
  let scrollTimeline = 0;
  let viewTransitions = 0;
  let blockedSheets = 0;
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      blockedSheets++;
      continue;
    }
    const walk = (list) => {
      for (const r of list) {
        if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) reducedMotionRules++;
        if (r.cssText && /animation-timeline|scroll-timeline|view-timeline/.test(r.cssText)) scrollTimeline++;
        if (r.cssText && /view-transition/.test(r.cssText)) viewTransitions++;
        if (r.cssRules) walk(r.cssRules);
      }
    };
    walk(rules);
  }

  // Page weight (approximate: cross-origin files without timing headers report 0)
  const res = performance.getEntriesByType("resource");
  const nav = performance.getEntriesByType("navigation")[0];
  const kb = (n) => Math.round(n / 1024);
  const byType = {};
  for (const r of res) byType[r.initiatorType] = (byType[r.initiatorType] || 0) + (r.transferSize || 0);

  return {
    title: document.title,
    lang: html.lang,
    dir: html.dir || getComputedStyle(document.body).direction,
    generator: gen,
    libs,
    scriptHosts: [...new Set(scripts.map((s) => { try { return new URL(s).host; } catch { return ""; } }).filter(Boolean))].slice(0, 15),
    typo,
    fontsLoaded: fontsLoaded.slice(0, 12),
    bgColors: top(colorArea, 8),
    textColors: top(textColor, 6),
    radius: top(radius, 5),
    sectionPaddingPx: pads.length ? [Math.min(...pads), Math.max(...pads)] : [],
    containerMaxWidth: top(Object.fromEntries(containers.map((c) => [c, containers.filter((x) => x === c).length])), 3),
    videos: videos.slice(0, 8),
    canvases: canvases.slice(0, 6),
    reducedMotionRules,
    scrollTimelineRules: scrollTimeline,
    viewTransitionRules: viewTransitions,
    unreadableStylesheets: blockedSheets,
    weightKB: { total: kb(res.reduce((a, r) => a + (r.transferSize || 0), 0) + (nav?.transferSize || 0)), ...Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, kb(v)])) },
    requests: res.length,
    pageHeightPx: document.documentElement.scrollHeight,
  };
}

// Runs inside the page: the animations running right now (CSS, Web Animations, Motion).
function sampleAnimations() {
  if (!document.getAnimations) return [];
  return document.getAnimations().slice(0, 60).map((a) => {
    const t = a.effect?.getTiming?.() || {};
    const target = a.effect?.target;
    const props = a.effect?.getKeyframes?.().flatMap((k) => Object.keys(k)).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k));
    return {
      kind: a.constructor.name, // CSSAnimation, CSSTransition, Animation (JS / Motion)
      name: a.animationName || a.transitionProperty || a.id || "",
      props: [...new Set(props || [])].slice(0, 5).join(","),
      duration: typeof t.duration === "number" ? Math.round(t.duration) : String(t.duration),
      easing: t.easing,
      iterations: t.iterations,
      el: target ? `${target.tagName?.toLowerCase()}${target.classList?.length ? "." + [...target.classList].slice(0, 2).join(".") : ""}` : "",
    };
  });
}

async function humanScroll(page, outDir, prefix, vh) {
  const frames = [];
  const animations = new Map();
  const start = Date.now();
  let lastY = -1;
  let stuck = 0;
  let nextShotAt = 0;
  let i = 0;
  const shoot = async () => {
    const f = path.join(outDir, "frames", `${prefix}-${String(i++).padStart(3, "0")}.jpg`);
    await page.screenshot({ path: f, type: "jpeg", quality: 70 });
    frames.push(f);
  };
  await shoot(); // first screen, as a visitor lands
  while (Date.now() - start < MAX_SCROLL_SECONDS * 1000) {
    const before = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 140);
    await sleep(90);
    let y = await page.evaluate(() => window.scrollY);
    if (y === before) {
      // some pages ignore wheel events in phone mode: nudge with a normal scroll
      await page.evaluate(() => window.scrollBy(0, 140));
      await sleep(90);
      y = await page.evaluate(() => window.scrollY);
    }
    if (y >= nextShotAt) {
      await sleep(350); // let entrance animations play a little
      for (const a of await page.evaluate(sampleAnimations)) animations.set(`${a.kind}|${a.name}|${a.el}`, a);
      await shoot();
      nextShotAt = y + vh * 0.5;
    }
    const atEnd = await page.evaluate(() => window.scrollY + innerHeight >= document.documentElement.scrollHeight - 4);
    stuck = y === lastY ? stuck + 1 : 0;
    lastY = y;
    if (atEnd || stuck > 12) break;
  }
  await sleep(800);
  await shoot(); // the footer
  return { frames, animations: [...animations.values()] };
}

// One picture with all frames, so Claude can see the whole page flow at a glance.
async function contactSheet(browser, frames, outFile, cols) {
  if (!frames.length) return;
  const imgs = await Promise.all(frames.map(async (f) => `data:image/jpeg;base64,${(await fs.readFile(f)).toString("base64")}`));
  const page = await browser.newPage({ viewport: { width: 1800, height: 1000 } });
  await page.setContent(
    `<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;padding:6px">` +
      imgs.map((s, n) => `<figure style="margin:0;position:relative"><img src="${s}" style="width:100%;display:block"><figcaption style="position:absolute;top:4px;left:4px;background:#000c;color:#fff;font:12px sans-serif;padding:2px 6px">${n}</figcaption></figure>`).join("") +
      "</body>",
  );
  await page.waitForLoadState("load");
  await page.screenshot({ path: outFile, type: "jpeg", quality: 72, fullPage: true });
  await page.close();
}

let videoOk = true;

// Close cookie / consent banners so they don't cover every frame. Prefers "reject".
async function dismissCookies(page) {
  const names = [
    /reject (all|non-essential|optional)|decline|only necessary|necessary only/i,
    /accept all|allow all|accept|agree|got it|i understand|^ok$/i,
    /قبول|موافقم|پذیرفتن|متوجه شدم|باشه/,
  ];
  for (const name of names) {
    const btn = page.getByRole("button", { name }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click({ timeout: 2000 }).catch(() => {});
      await sleep(600);
      return;
    }
  }
}

async function captureDevice(browser, site, deviceName) {
  const outDir = path.join(ROOT, site.folder);
  await fs.mkdir(path.join(outDir, "frames"), { recursive: true });
  const dev = DEVICES[deviceName];
  let context;
  let page;
  if (videoOk) {
    try {
      context = await browser.newContext({ ...dev, recordVideo: { dir: path.join(outDir, "video-tmp"), size: dev.viewport }, locale: "fa-IR" });
      page = await context.newPage();
    } catch (e) {
      await context?.close().catch(() => {});
      videoOk = false;
      console.log(`\n  (no video: ${String(e.message).split("\n")[0].slice(0, 90)}…)\n  Fix once with: npx playwright-core install ffmpeg\n  continuing with screenshots only… `);
    }
  }
  if (!page) {
    context = await browser.newContext({ ...dev, locale: "fa-IR" });
    page = await context.newPage();
  }
  page.setDefaultTimeout(45000);
  await page.goto(site.url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load").catch(() => {});
  await sleep(2500); // hero intro animations
  await dismissCookies(page);
  const scroll = await humanScroll(page, outDir, deviceName, dev.viewport.height);
  const info = deviceName === "desktop" ? await page.evaluate(inspectPage) : null;
  const video = page.video();
  await context.close(); // finishes writing the video
  if (video) {
    await fs.rename(await video.path(), path.join(outDir, `${deviceName}-scroll.webm`)).catch(() => {});
    await fs.rm(path.join(outDir, "video-tmp"), { recursive: true, force: true });
  }
  await contactSheet(browser, scroll.frames, path.join(outDir, `${deviceName}-sheet.jpg`), deviceName === "desktop" ? 3 : 6);
  return { ...scroll, info };
}

async function reducedMotionCheck(browser, site) {
  const context = await browser.newContext({ ...DEVICES.mobile, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(site.url, { waitUntil: "load", timeout: 45000 }).catch(() => {});
  await sleep(2500);
  await dismissCookies(page);
  await page.screenshot({ path: path.join(ROOT, site.folder, "mobile-reduced-motion.jpg"), type: "jpeg", quality: 70 });
  const running = (await page.evaluate(sampleAnimations)).length;
  await context.close();
  return running;
}

function report(site, d, m, reducedRunning) {
  const i = d.info;
  const t = (o) => (o ? `${o.size} / ${o.lineHeight} / ${o.weight}${o.letterSpacing !== "normal" ? ` / ls ${o.letterSpacing}` : ""} — ${o.family}` : "—");
  const anim = [...new Map([...d.animations, ...m.animations].map((a) => [`${a.kind}|${a.name}|${a.el}`, a])).values()];
  const kinds = anim.reduce((a, x) => ((a[x.kind] = (a[x.kind] || 0) + 1), a), {});
  return `# ${site.folder} — ${i.title}

Link: ${site.url}
Language/direction: ${i.lang || "?"} / ${i.dir} · Generator: ${i.generator || "—"} · Page height (desktop): ${i.pageHeightPx}px

## Files
- \`desktop-sheet.jpg\`, \`mobile-sheet.jpg\` — every frame of the scroll on one image (numbers = frame order)
- \`desktop-scroll.webm\`, \`mobile-scroll.webm\` — the scroll as a video
- \`frames/\` — the single frames · \`mobile-reduced-motion.jpg\` — the page with "reduce motion" on

## Tech detected
- Libraries: ${i.libs.join(", ") || "none detected"}
- Script hosts: ${i.scriptHosts.join(", ") || "—"}
- Videos: ${i.videos.length ? i.videos.map((v) => `${v.size} ${v.autoplay ? "autoplay" : ""} ${v.muted ? "muted" : ""} ${v.loop ? "loop" : ""} ${v.poster ? "poster" : "NO poster"} (${v.src || "blob/stream"})`).join("; ") : "none"}
- 3D / canvas: ${i.canvases.length ? i.canvases.map((c) => c.size).join(", ") : "none"}
- Reduced-motion CSS rules: ${i.reducedMotionRules} · animations still running with reduce-motion on: ${reducedRunning}
- CSS scroll-driven animation rules: ${i.scrollTimelineRules} · view-transition rules: ${i.viewTransitionRules}
- Page weight (approx., desktop): ${i.weightKB.total} KB in ${i.requests} requests — ${Object.entries(i.weightKB).filter(([k]) => k !== "total").map(([k, v]) => `${k} ${v} KB`).join(", ")}

## Typography (size / line height / weight — font)
| Tag | Value |
|---|---|
${["h1", "h2", "h3", "p", "a", "button"].map((k) => `| ${k} | ${t(i.typo[k])} |`).join("\n")}

Fonts loaded: ${i.fontsLoaded.join(", ") || "—"}

## Look
- Background colours (most area first): ${i.bgColors.join(" · ")}
- Text colours (most used first): ${i.textColors.join(" · ")}
- Corner radius (most used): ${i.radius.join(" · ") || "none"}
- Section padding top (min–max): ${i.sectionPaddingPx.join("–") || "—"} px · Container max-width: ${i.containerMaxWidth.join(", ") || "—"}

## Motion seen while scrolling (${anim.length} distinct; ${Object.entries(kinds).map(([k, v]) => `${k} ${v}`).join(", ") || "none"})
| Kind | Name / property | Changes | Duration ms | Easing | Element |
|---|---|---|---|---|---|
${anim.slice(0, 40).map((a) => `| ${a.kind} | ${a.name} | ${a.props} | ${a.duration} | ${a.easing} | \`${a.el}\` |`).join("\n") || "| — | | | | | |"}

> GSAP and Three.js animate with JavaScript every frame, so they don't appear in this table — watch the video and frames for them.
> Unreadable stylesheets (other domains): ${i.unreadableStylesheets}. Detection is a best guess; check by eye.
`;
}

async function main() {
  const only = Number(process.argv[2]) || 0;
  const sites = (await readUrls()).filter((s) => !only || s.n === only);
  if (!sites.length) return console.log("No links in refs/direction/urls.txt");
  const browser = await launchBrowser();
  const summary = [];
  for (const site of sites) {
    process.stdout.write(`\n[${site.n}/${sites.length}] ${site.url}\n`);
    try {
      process.stdout.write("  desktop scroll… ");
      const d = await captureDevice(browser, site, "desktop");
      process.stdout.write(`${d.frames.length} frames\n  phone scroll… `);
      const m = await captureDevice(browser, site, "mobile");
      process.stdout.write(`${m.frames.length} frames\n  reduced-motion check… `);
      const r = await reducedMotionCheck(browser, site);
      await fs.writeFile(path.join(ROOT, site.folder, "report.md"), report(site, d, m, r));
      await fs.writeFile(path.join(ROOT, site.folder, "report.json"), JSON.stringify({ url: site.url, ...d.info, animations: [...d.animations, ...m.animations] }, null, 2));
      summary.push(`| ${site.folder} | ${d.info.libs.join(", ") || "—"} | ${d.info.typo.h1?.size || "—"} / ${d.info.typo.p?.size || "—"} | ${d.info.videos.length} / ${d.info.canvases.length} | ${d.info.reducedMotionRules ? "yes" : "no"} | ${d.info.weightKB.total} |`);
      console.log("done ✓");
    } catch (e) {
      summary.push(`| ${site.folder} | FAILED: ${String(e.message).split("\n")[0].slice(0, 80)} | | | | |`);
      console.log(`FAILED — ${String(e.message).split("\n")[0]}`);
    }
  }
  await browser.close();
  await fs.writeFile(
    path.join(ROOT, "SUMMARY.md"),
    `# Reference capture — ${new Date().toISOString().slice(0, 16).replace("T", " ")}\n\n| Site | Libraries | h1 / body size | Videos / 3D | Reduced motion | KB |\n|---|---|---|---|---|---|\n${summary.join("\n")}\n`,
  );
  console.log(`\nFinished. Open ${path.join(ROOT, "SUMMARY.md")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
