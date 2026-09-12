# STATE — 2026-09-12

Update this file at the end of every working session. A new Claude with no chat history should be able to start from here.

## Status

- Product: BotLitmus
- Repo: https://github.com/ARPRK1/botlitmus
- Live: https://botlitmus.vercel.app
- First rupee: not received
- Published reports: 6 (zerodha 89 B, mamaearth 77 C, razorpay 68 D, groww 68 D, nykaa 66 D, boat 48 F)
- Mamaearth report is in the local working tree. Not committed or deployed yet. Rana commits and deploys.
- r/indianstartups: removed (promo)
- r/SideProject: posted by u/Modernmonk_Build. https://www.reddit.com/r/SideProject/comments/1vo9chq/i_scored_5_indian_help_centers_on_whether_the/
- Pricing links: FIXED. `/pricing` reachable from header, footer, and report CTA.
- Razorpay: code present but DORMANT. Do not turn on live keys until a human asks to pay. Buy buttons fall back to email without keys.

## What shipped this session

- Mamaearth report (partial crawl, editor+rubric). Key finding: wrong/expired return window is 7 days; damaged/missing is 2 days.
- Draft LinkedIn/X post added to docs/POSTS.md item 4.
- `npm run lint` and `npm run build` required before commit.

## Next work, in order

1. Rana: review mamaearth.json + reports.ts, commit, deploy to Vercel.
2. Rana: post the Mamaearth draft from docs/POSTS.md item 4 (or LinkedIn item 2 if unused).
3. More reports if fetchable: Freshworks, Chargebee, PhonePe, Policybazaar (Mamaearth done).
4. If a founder emails: hand PDF, take ₹999. Razorpay keys only after someone asks to pay.

## Parked

YouTube, SastaSense, FindDoc, Gumroad, trading bots, new products, TicketLeak merge inside BotLitmus.

## Pending commit (Rana return)

Working tree is mixed. Do not commit everything in one blob.

### Mamaearth-only (this week deliverable)
Stage only:
- data/reports/mamaearth.json
- lib/reports.ts
- docs/STATE.md
- docs/POSTS.md

Suggested message:
Add Mamaearth help-centre report (77 C)

Then: git push, Vercel deploy (or wait for auto-deploy), open https://botlitmus.vercel.app/report/mamaearth

### Leave unstaged (Razorpay / pricing session, dormant)
- app/pricing/page.tsx
- app/report/[slug]/page.tsx
- components/Footer.tsx
- components/BuyButton.tsx
- app/api/checkout/
- lib/pricing.ts
- .env.example
- CLAUDE.md
- HANDOVER.md

Review those separately. Do not turn on live Razorpay keys until a human asks to pay.

