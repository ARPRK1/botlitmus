import {
  type Finding,
  type FindingType,
  type Report,
  type Severity,
  type WidgetSignal,
} from "./types";
import { gradeFromScore, makeDimension, totalFromDimensions } from "./score";

const HELP_HINTS = [
  "help",
  "support",
  "faq",
  "return",
  "refund",
  "cancel",
  "warranty",
  "policy",
  "contact",
  "grievance",
  "ticket",
];

const UA =
  "BotLitmus/0.1 (+https://github.com/ARPRK1/botlitmus; public help-centre honesty scanner)";

export type FetchedPage = {
  url: string;
  ok: boolean;
  status: number;
  title: string;
  text: string;
  html: string;
};

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function titleOf(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? stripTags(m[1]).slice(0, 140) : "";
}

export async function fetchPage(url: string, timeoutMs = 12000): Promise<FetchedPage> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml",
      },
    });
    const html = await res.text();
    return {
      url: res.url || url,
      ok: res.ok,
      status: res.status,
      title: titleOf(html),
      text: stripTags(html).slice(0, 40000),
      html: html.slice(0, 200000),
    };
  } catch (err) {
    return {
      url,
      ok: false,
      status: 0,
      title: "",
      text: err instanceof Error ? err.message : "fetch failed",
      html: "",
    };
  } finally {
    clearTimeout(t);
  }
}

function originOf(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

export function discoverHelpLinks(page: FetchedPage, limit = 7): string[] {
  const origin = originOf(page.url);
  if (!origin) return [];
  const hrefs = [...page.html.matchAll(/href=["']([^"'#]+)["']/gi)].map((m) => m[1]);
  const out: string[] = [];
  for (const href of hrefs) {
    let abs = href;
    try {
      abs = new URL(href, page.url).toString();
    } catch {
      continue;
    }
    if (!abs.startsWith(origin)) continue;
    const low = abs.toLowerCase();
    if (!HELP_HINTS.some((h) => low.includes(h))) continue;
    if (out.includes(abs)) continue;
    out.push(abs);
    if (out.length >= limit) break;
  }
  return out;
}

export function detectWidgets(pages: FetchedPage[]): WidgetSignal[] {
  const blob = pages.map((p) => p.html).join("\n");
  const checks: [string, RegExp][] = [
    ["Intercom", /widget\.intercom\.io|intercomSettings/i],
    ["Zendesk", /static\.zdassets\.com|zopim/i],
    ["Freshdesk / Freshchat", /freshchat|freshdesk\.com\/widget/i],
    ["Gorgias", /gorgias\.chat|config\.gorgias/i],
    ["Crisp", /client\.crisp\.chat/i],
    ["Tawk", /embed\.tawk\.to/i],
    ["Drift", /js\.driftt\.com/i],
    ["WhatsApp", /api\.whatsapp\.com\/send|wa\.me\//i],
  ];
  const found: WidgetSignal[] = [];
  for (const [vendor, re] of checks) {
    if (re.test(blob)) found.push({ vendor, evidence: re.source });
  }
  return found;
}

function phones(text: string): string[] {
  const raw = text.match(/(?:\+91[\s-]?)?[6-9]\d{9}|1800[\s-]?\d{3}[\s-]?\d{3,5}/g) || [];
  return [...new Set(raw.map((p) => p.replace(/\s+/g, "")))];
}

function dayWindows(text: string): string[] {
  const raw = text.match(/\b(\d{1,3})\s*(?:business\s*)?days?\b/gi) || [];
  return [...new Set(raw.map((s) => s.toLowerCase().replace(/\s+/g, " ")))];
}

function snippet(text: string, needle: RegExp, pad = 80): string {
  const m = text.match(needle);
  if (!m || m.index === undefined) return "";
  const start = Math.max(0, m.index - 20);
  return text.slice(start, start + pad + m[0].length).trim();
}

function finding(
  id: string,
  severity: Severity,
  type: FindingType,
  title: string,
  whyItHurts: string,
  fix: string,
  url: string,
  quote: string
): Finding {
  return {
    id,
    severity,
    type,
    title,
    whyItHurts,
    fix,
    evidence: [
      {
        url,
        quote: quote.slice(0, 280),
        accessedAt: new Date().toISOString().slice(0, 10),
      },
    ],
  };
}

export function analyze(pages: FetchedPage[]): Finding[] {
  const ok = pages.filter((p) => p.ok && p.text.length > 80);
  const findings: Finding[] = [];
  const today = new Date().toISOString().slice(0, 10);

  const allPhones = new Set<string>();
  const phoneByPage: { url: string; phones: string[] }[] = [];
  const windows: { url: string; values: string[] }[] = [];

  for (const p of ok) {
    const ph = phones(p.text);
    ph.forEach((x) => allPhones.add(x));
    if (ph.length) phoneByPage.push({ url: p.url, phones: ph });
    const days = dayWindows(p.text).filter((d) =>
      /return|refund|replac|cancel|deliver|ship/i.test(
        p.text.slice(
          Math.max(0, p.text.toLowerCase().search(/return|refund|replac|cancel/)),
          p.text.length
        )
      )
        ? true
        : /return|refund|replac/.test(p.text)
    );
    if (days.length) windows.push({ url: p.url, values: days });
  }

  if (allPhones.size >= 2) {
    const first = phoneByPage[0];
    const other = phoneByPage.find((p) => p.phones.some((x) => !first.phones.includes(x)));
    if (first && other) {
      findings.push({
        id: "phones-disagree",
        severity: "high",
        type: "contradiction",
        title: "Support phone numbers do not agree across pages",
        whyItHurts: "A failed chat user will call. Two numbers is a leak.",
        fix: "One number on every policy and footer.",
        evidence: [
          {
            url: first.url,
            quote: first.phones.join(", "),
            accessedAt: today,
          },
          {
            url: other.url,
            quote: other.phones.join(", "),
            accessedAt: today,
          },
        ],
      });
    }
  }

  const hasDays = pages.some((p) => /\b\d+\s+days?\b/i.test(p.text) && /return|refund/i.test(p.text));
  const hasBusiness = pages.some((p) => /\b\d+\s+business\s+days?\b/i.test(p.text) && /return|refund/i.test(p.text));
  if (hasDays && hasBusiness) {
    const a = ok.find((p) => /\b\d+\s+days?\b/i.test(p.text));
    const b = ok.find((p) => /business\s+days/i.test(p.text));
    if (a) {
      findings.push({
        id: "calendar-vs-business",
        severity: "high",
        type: "contradiction",
        title: "Return or refund clock mixes calendar days and business days",
        whyItHurts: "The customer cannot tell if the window has closed.",
        fix: "One clock. Spell it once.",
        evidence: [
          {
            url: a.url,
            quote: snippet(a.text, /\b\d+\s+days?\b/i) || "days",
            accessedAt: today,
          },
          {
            url: (b || a).url,
            quote: snippet((b || a).text, /business\s+days/i) || "business days",
            accessedAt: today,
          },
        ],
      });
    }
  }

  for (const p of ok) {
    const liberal = /liberal|easy return|hassle[- ]free|no questions asked/i.test(p.text);
    const hard =
      /no return or refund|cannot be returned|will not be entertained|cancellations request will not/i.test(
        p.text
      );
    if (liberal && hard) {
      findings.push(
        finding(
          "liberal-vs-hard",
          "critical",
          "overclaim",
          "Policy advertises easy or liberal, then refuses the request",
          "The heading sets an expectation the body takes back.",
          "Lead with the real rule. Drop the adjective.",
          p.url,
          snippet(p.text, /liberal|easy return|hassle[- ]free/i)
        )
      );
    }
    if (/1024-bit/i.test(p.text)) {
      findings.push(
        finding(
          "stale-1024",
          "low",
          "stale",
          "Security copy still cites 1024-bit encryption",
          "It signals the policy page is not owned.",
          "State current TLS. Say the gateway holds card data.",
          p.url,
          snippet(p.text, /1024-bit/i)
        )
      );
    }
    if (/free (express )?delivery/i.test(p.text) && /shipping charges|delivery charges/i.test(p.text)) {
      findings.push(
        finding(
          "free-vs-fee",
          "high",
          "contradiction",
          "Free delivery language sits next to a shipping fee",
          "Checkout is where this becomes a ticket.",
          "Write the threshold on the same line as Free.",
          p.url,
          snippet(p.text, /free (express )?delivery/i)
        )
      );
    }
  }

  const blob = ok.map((p) => p.text).join(" \n ");
  const coverageNeed: [string, RegExp][] = [
    ["refund", /refund/i],
    ["cancel", /cancel/i],
    ["return", /return|replac/i],
    ["grievance", /grievance|ombudsman|scores\.sebi/i],
  ];
  for (const [name, re] of coverageNeed) {
    if (!re.test(blob)) {
      const url = ok[0]?.url || pages[0]?.url || "";
      findings.push(
        finding(
          `missing-${name}`,
          "medium",
          "missing",
          `No public ${name} language on the pages we fetched`,
          "High-intent questions with no article become chats, then chargebacks.",
          `Publish a one-screen ${name} article and link it from the help home.`,
          url,
          `(scanner did not find /${name}/i on fetched pages)`
        )
      );
    }
  }

  return findings.slice(0, 12);
}

function coverageScore(text: string): { score: number; note: string } {
  let score = 0;
  const hits: string[] = [];
  const checks: [string, number, RegExp][] = [
    ["refund", 4, /refund/i],
    ["cancel", 4, /cancel/i],
    ["return", 4, /return|replac/i],
    ["warranty", 3, /warranty/i],
    ["grievance", 3, /grievance|ombudsman/i],
    ["data rights", 2, /delete.{0,20}account|privacy@|right to/i],
  ];
  for (const [name, pts, re] of checks) {
    if (re.test(text)) {
      score += pts;
      hits.push(name);
    }
  }
  return { score: Math.min(20, score), note: hits.length ? `Found: ${hits.join(", ")}.` : "No high-intent topics on fetched pages." };
}

export function scoreHeuristic(pages: FetchedPage[], findings: Finding[], widgets: WidgetSignal[]) {
  const ok = pages.filter((p) => p.ok);
  const text = ok.map((p) => p.text).join("\n");

  let internal = 25;
  let surface = 20;
  let staleness = 15;
  for (const f of findings) {
    if (f.type === "contradiction" && f.id.includes("phone")) internal -= 8;
    else if (f.type === "contradiction" && f.id.includes("calendar")) internal -= 5;
    else if (f.type === "contradiction") internal -= 5;
    if (f.type === "overclaim") surface -= 8;
    if (f.id.includes("free-vs-fee")) surface -= 8;
    if (f.type === "stale") staleness -= 6;
  }
  internal = Math.max(0, internal);
  surface = Math.max(0, surface);
  staleness = Math.max(0, text ? staleness : 6);

  const cov = coverageScore(text);
  let escalation = 0;
  if (/\+91|1800\d|\b\d{10}\b/.test(text)) escalation += 3;
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text) || /\[email\sprotected\]/i.test(text))
    escalation += 3;
  if (/ticket|raise a request|write to us|submit a request/i.test(text)) escalation += 2;
  if (/grievance officer|compliance officer|nodal/i.test(text)) escalation += 2;
  if (/24\s*[x×*]\s*7|24\*7/i.test(text) && /monday to friday/i.test(text)) escalation = Math.max(0, escalation - 3);
  escalation = Math.min(10, escalation);

  let botSurface = widgets.length ? 7 : 5;
  if (widgets.some((w) => /whatsapp/i.test(w.vendor))) botSurface = 5;
  botSurface = Math.min(10, botSurface);

  const dimensions = [
    makeDimension("internal", internal, findings.some((f) => f.type === "contradiction") ? "Heuristic found colliding facts." : "No colliding numbers in the first pass."),
    makeDimension("surface", surface, findings.some((f) => f.type === "overclaim") ? "Marketing language fights the policy." : "No slogan/policy clash in the first pass."),
    makeDimension("staleness", staleness, /1024-bit|©\s*20(1|2)[0-4]/.test(text) ? "Possible stale claim." : "No obvious stale year."),
    makeDimension("coverage", cov.score, cov.note),
    makeDimension("escalation", escalation, "Phone / email / ticket / officer detectors only."),
    makeDimension("botSurface", botSurface, widgets.length ? widgets.map((w) => w.vendor).join(", ") : "No known chat vendor on fetched HTML."),
  ];

  const score = totalFromDimensions(dimensions);
  return { score, grade: gradeFromScore(score), dimensions };
}

export function hostnameToBrand(url: string): { slug: string; brand: string } {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const slug = host.split(".")[0] || "site";
    const brand = slug.charAt(0).toUpperCase() + slug.slice(1);
    return { slug, brand };
  } catch {
    return { slug: "site", brand: "Unknown site" };
  }
}

export async function scanUrl(inputUrl: string): Promise<Report> {
  let start = inputUrl.trim();
  if (!/^https?:\/\//i.test(start)) start = `https://${start}`;

  const home = await fetchPage(start);
  const links = home.ok ? discoverHelpLinks(home) : [];
  const extras: FetchedPage[] = [];
  for (const link of links.slice(0, 6)) {
    extras.push(await fetchPage(link));
  }
  const pages = [home, ...extras];
  const widgets = detectWidgets(pages);
  const findings = analyze(pages);
  const { score, grade, dimensions } = scoreHeuristic(pages, findings, widgets);
  const { slug, brand } = hostnameToBrand(home.url || start);
  const okCount = pages.filter((p) => p.ok).length;

  return {
    slug,
    brand,
    sector: "unclassified",
    country: "IN",
    homepage: start,
    helpUrls: pages.filter((p) => p.ok).map((p) => p.url),
    scannedAt: new Date().toISOString(),
    scoreSource: "heuristic",
    crawlQuality: okCount === 0 ? "blocked" : okCount === 1 ? "partial" : "partial",
    crawlNote:
      okCount === 0
        ? "Could not fetch the URL. Many Indian storefronts block datacentre IPs. Run the scan from a home connection or paste a policy URL."
        : `Fetched ${okCount} page(s). This is a first pass, not a league score. An editor must promote it before it is public.`,
    summary:
      findings[0]?.title ||
      (okCount
        ? "First pass finished. Read the findings. Do not treat this number as a published grade."
        : "Scan blocked."),
    score,
    grade,
    dimensions,
    findings,
    widgets,
    pagesFetched: pages.map((p) => ({ url: p.url, ok: p.ok, title: p.title || undefined })),
  };
}
