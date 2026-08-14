# CLAUDE.md — read this before touching anything

You are continuing **BotLitmus** for Rana Appannagari (`ARPRK1`, `rp271187@gmail.com`). This file is the contract. If a chat has no history, this repo is the history.

## Read order (do this first)

1. `docs/STATE.md` — what is true today
2. `docs/PRODUCT.md` — what we are building, and the offer ladder
3. `docs/RUBRIC.md` — how scores are made
4. `docs/REPORT-SCHEMA.md` — how to add a brand
5. `docs/LAUNCH.md` — how strangers find this without Rana’s contacts

Do not invent a new product. Do not reopen YouTube, SastaSense, FindDoc, Gumroad, or a trading bot in this repo.

## What this company is

A **public league table** of whether Indian help centres tell the truth. Same teardown Rana already designed. Distribution is `/report/{slug}`, not cold email.

v1 measures **public pages**. It does not log into Intercom. Do not claim “we probed the bot” unless a transcript is stored in the report.

## Who Rana is

- Hyderabad / India. Full-time at Cognizant (support ops / Pulse CX). Moonlighting: no employer data, time, or clients.
- Not a software engineer. You implement. He deploys, sends the one post, and emails founders who reply.
- He has no 15 contacts who will forward a CX product. Do not ask him to.
- He wants an asset that compounds. This repo is that asset. One product.

## Stack

- Next.js 15 App Router, React 19, TypeScript, Tailwind 3
- Reports are JSON in `data/reports/`. Import them in `lib/reports.ts`. No database.
- Scanner: `lib/scanner.ts`. Live: `POST /api/scan`. CLI: `npm run scan -- URL`
- Hosting: Vercel (not deployed on first commit)

```
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build
npm run scan -- https://support.zerodha.com/
```

## How to add a published report

1. Fetch real pages. Quotes must be substrings.
2. Score with the rubric. Write the six dimensions in weight units.
3. Add `data/reports/{slug}.json`.
4. Import + append in `lib/reports.ts`.
5. Build. Update `docs/STATE.md`.

If Cloudflare/Akamai blocks the fetch, say `crawlQuality: "blocked"` or skip the brand. Wakefit homepage was blocked on 2026-08-14.

## Writing

Short sentences. Evidence first. No em dashes. No “unlock / leverage / seamless / robust / game-changer / delve”. Never invent a client, a metric, a quote, or a testimonial. Rana has zero paying customers.

## What “done” looks like for the next session

In order. Stop when the session ends. Update STATE.

1. Deploy to Vercel if not live. Write the URL into STATE.
2. Five more honest reports (fetchable brands only).
3. Draft one Reddit/LinkedIn post from a real finding. Do not post it. Rana posts.
4. If someone asks to pay: generate a simple HTML/PDF fix order by hand. Do not build a PDF factory first.

## Do not

- Change rubric weights without a STATE note and a version bump
- Promote a heuristic scan into the league without an editor pass
- Add auth, a blog engine, or a second product
- Wire Razorpay before a human has asked to pay
- Use Cognizant / Jastra / Pulse CX data as examples

## Origin

Decided 2026-08-14 with Grok as cofounder. Option A over a trading bot and over warm-network services. First five reports scored the same day from fetched pages.
