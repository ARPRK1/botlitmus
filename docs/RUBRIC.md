# BotLitmus scoring rubric

Do not change weights without writing a note in `docs/STATE.md` and bumping `scannedAt` on every published report. Old scores must stay comparable.

## What we measure

Public help-centre honesty. Not brand love. Not CSAT. Not whether the product is good.

A high score means a customer can read the public pages and know what will actually happen when something goes wrong.

## Weights (sum 100)

| Key | Label | Weight |
|---|---|---|
| `internal` | Articles agree with each other | 25 |
| `surface` | Help centre agrees with homepage / marketing | 20 |
| `staleness` | Policies look current | 15 |
| `coverage` | High-intent topics exist | 20 |
| `escalation` | A human path is findable and honest | 10 |
| `botSurface` | Chat/bot is identifiable and not pretending | 10 |

Each dimension is scored **0 to its weight**. The total is the sum. Grade:

- A 90–100
- B 80–89
- C 70–79
- D 55–69
- F 0–54

## Deduction rules (use these, do not vibe)

### internal
Start at 25.
- −8 each pair of pages that state different numbers for the same policy (return window, phone, hours) on the same brand property
- −5 same-page contradiction (e.g. “15 days” and “15 business days”)
- −3 wording clash that would change a customer decision
Floor 0.

### surface
Start at 20.
- −8 homepage promise that the policy page takes back (“easy returns”, “liberal cancellation”, “free delivery” vs charged shipping)
- −5 different sister sites (Fashion vs Beauty) stating different windows without a clear “this property only” label
- −3 inflated-MRP / “X% off” pattern next to a policy that lets them cancel wrong prices
Floor 0.

### staleness
Start at 15.
- −6 security or legal claims that are a generation out of date (e.g. “1024-bit SSL”)
- −4 no last-updated date on the main policy
- −3 “coming soon” / “we are working on expanding this” left hanging
- +0 if a dated bulletin from the current month exists (Zerodha-style)

### coverage
Start at 0, add:
- +4 refund
- +4 cancel
- +4 return / replacement
- +3 warranty or equivalent
- +3 named grievance / escalation
- +2 account deletion or data rights
Cap 20.

### escalation
Start at 0, add:
- +3 working phone
- +3 working email
- +2 ticket / form
- +2 named officer
- −3 if the headline says 24×7 and the named head of CX is weekday-only, and that clash is unexplained
Cap 10.

### botSurface
Start at 5 if no chat widget is visible (neutral: we did not catch them lying).
- +3 chat exists and is labelled as support hours / human team
- +2 widget vendor is identifiable
- −4 chat exists and is unlabelled or styled as a person with no hours
- −3 “AI assistant” with no escalation
Cap 10.

## Two score sources

- `editor+rubric` — published league reports. A human (or Claude acting as editor) applied this rubric to fetched pages. Evidence quotes are mandatory.
- `heuristic` — live `/scan` results. Deterministic detectors only. Always labelled as a first pass, never a league score, until an editor promotes it.

## Evidence rules

- Every finding needs at least one `{ url, quote, accessedAt }`.
- Quote must be a real substring of the page we fetched. Never invent a quote.
- If a site blocks the crawler, set `crawlQuality: "blocked"` or `"partial"` and say so on the report. Do not guess the missing pages.
- Do not score a live bot conversation unless we actually sent a prompt and stored the reply. v1 does **not** drive Intercom/Zendesk widgets. Help-centre honesty is the product.

## What is not a finding

- A strict policy that is clearly stated (boAt “no refund, replacement only” is honest if marketing does not say otherwise).
- A missing chatbot. Many good help centres have none.
- Competitor complaints on Reddit. Those can inform what we look for. They are not evidence.
