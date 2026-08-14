# Report JSON schema

Every published report is a file in `data/reports/{slug}.json` matching `lib/types.ts` `Report`.

Required:

- `slug` — lowercase, used in `/report/{slug}`
- `brand`, `sector`, `country`
- `homepage`, `helpUrls[]`
- `scannedAt` — ISO date
- `scoreSource` — `editor+rubric` for league, `heuristic` for live scans
- `crawlQuality` — `full` | `partial` | `blocked`
- `crawlNote` — one or two sentences, honest
- `summary` — the lede. No slogan.
- `score` 0–100, `grade` A–F
- `dimensions[]` — all six keys, scores already in weight units
- `findings[]` — each with evidence quotes
- `widgets[]`, `pagesFetched[]`

To publish a new brand:

1. Fetch the pages. Save quotes you can point at.
2. Score with `docs/RUBRIC.md`. Do not vibe a 72.
3. Write `data/reports/{slug}.json`.
4. Import it in `lib/reports.ts`.
5. Run `npm run lint` and `npm run build`.
6. Update `docs/STATE.md` (count, date, next five targets).

Never invent a quote. If the crawler was blocked, say so and do not publish a fake full crawl.
