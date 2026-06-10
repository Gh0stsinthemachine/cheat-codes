# The Stack

Frontend, backend, infrastructure, payments. What to use, what to skip, libraries worth knowing.

---

## Opinions on what to use

### Tech stack red flags — what to avoid when starting an app

One practitioner's strong opinions. Take with context — these aren't universal — but several hold up well.

| Avoid | Use instead |
|---|---|
| Supabase (as primary) | Convex, Neon, or Better-Auth |
| Clerk (auth) | Better-Auth |
| Supabase Storage / AWS S3 | Cloudflare R2 (cheapest) |
| Namecheap | Porkbun or Cloudflare |
| MongoDB | (just don't) |

**Source:** @dovep_c on Threads
**Note:** R2-over-S3 for cost is widely supported. Better-Auth over Clerk is worth investigating for arrangementLab. The rest are opinions, not gospel.

---

## Frontend

### Pretext — text layout 500x faster than the DOM

A tiny TypeScript library that measures and lays out text far faster than the DOM by bypassing browser text measurement. Built by the dev behind React, ReasonML, and Midjourney's frontend.

[github.com/chenglou/pretext](https://github.com/chenglou/pretext)

**Source:** @marc.kaz on Threads
**Note:** Watch for canvas-based UI work (e.g. arrangementLab). Foundational concept even if not used directly.

---

## Infra / deploy

*(Add notes here as they come up — Vercel deploy patterns, R2 setup, domain config, etc.)*

---

## Payments

*(Polar → Stripe flow notes go here. Already running this for arrangementLab and DriveMosaic.)*
