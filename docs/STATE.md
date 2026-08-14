# STATE — 2026-08-14

Update this file at the end of every working session. A new Claude with no chat history should be able to start from here.

## Status

- Product: BotLitmus (option A from the Grok session: public Bot Honesty Score)
- Repo: https://github.com/ARPRK1/botlitmus (public, main @ bd46be7+)
- Live URL: not deployed yet. Intended: Vercel, project `botlitmus`.
- First rupee: not received.
- Published reports: 5 (zerodha 89 B, razorpay 68 D, groww 68 D, nykaa 66 D, boat 48 F)

## What shipped this session

- Next.js 15.5.21 app: league, report pages, scan, method, pricing, about
- `npm run build` green on 2026-08-14 (17 static routes, 5 report pages)
- Heuristic scanner (`lib/scanner.ts`) + `POST /api/scan`
- Five editor-scored reports from fetched public pages, quotes on file
- Handoff: CLAUDE.md, docs/*

## What is not done

- Vercel deploy
- Razorpay
- PDF generation
- 20 more reports
- Live chatbot transcripts
- Custom domain

## Next work, in order

1. `npm run build` must stay green.
2. Deploy to Vercel (owner: Rana, GitHub ARPRK1). Put the URL in this file.
3. Add 5 more reports. Suggested, only if fetchable:
   - Freshworks support
   - Chargebee docs/support
   - Mamaearth policy
   - PhonePe help
   - Policybazaar help
   Skip anything Cloudflare-blocked (Wakefit homepage was).
4. One public post (LAUNCH.md item 1). Rana sends it. Claude drafts.
5. Razorpay only after a human asks to pay.

## Parked forever (for this repo)

YouTube automation, SastaSense features, FindDoc, Gumroad, trading bots, new product names.

## Owner constraints

- Full-time Cognizant. No company data, no company time, no Cognizant clients.
- Not a developer. Claude implements. Rana deploys and sends posts.
- No 15 warm contacts who will forward this. Distribution is the public report.
