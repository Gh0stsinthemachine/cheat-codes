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

### Prefer hosted checkout links over server-side checkout

Two ways to take money with Polar — same tradeoff applies to Stripe, LemonSqueezy, and Paddle:

- **Hosted checkout link** — a static `buy.polar.sh/...` URL you just open. No credential anywhere in the money path.
- **Server-side checkout** — your backend POSTs to the provider's API with an access token, mints a session, redirects the user.

Server-side buys custom flows, metadata, and dynamic pricing. It also buys a **silent single point of failure**: the token expires or gets revoked, checkout starts returning 500, and nothing tells you. Revenue quietly goes to zero while the app looks perfectly healthy.

Learned the expensive way. Of three products, the two on hosted links (arrangementLab, DriveMosaic) kept taking money without incident. The one on server-side checkout sat **broken for 59 days** on an expired token — undetected, because nothing watches a checkout nobody tests.

**Rules:**

1. **Default to hosted links for v1.** Nothing in the path can expire.
2. **If you truly need server-side checkout, ship monitoring in the same PR** — a synthetic that hits the endpoint on a schedule and alerts on any non-2xx. Untested payment code is not revenue.
3. **Fail fast and loud on missing config.** `Bearer ${process.env.TOKEN}` with an unset var cheerfully sends the literal string `Bearer undefined`, and the provider returns a generic auth error identical to a real expired token. Guard the env vars up front and return a distinct status (503) so misconfiguration is legible at a glance.
4. **Verify the money path before calling anything "live."** Probe the real checkout endpoint. A 200 on the marketing site tells you nothing about whether a customer can actually pay you.

**Note:** Polar's current checkout API is `POST /v1/checkouts/` with a `products` **array**. The older `/v1/checkouts/custom/` with a `product_id` scalar still routes but is undocumented — don't build on it. Auth is checked before body validation, so a 401 tells you nothing about whether your payload shape is correct.
