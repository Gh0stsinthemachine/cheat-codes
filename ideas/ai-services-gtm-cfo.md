# Four AI-service ideas, run through the GTM/CFO bar

A Threads post (@kiro_hq_ai) listed four AI service businesses with price tags attached, closing with "none of these need a degree. all of them need one thing: proof you did it once." Run through the [GTM/CFO analyst posture](../tips/workflow.md#make-claude-your-gtmcfo-analyst-not-your-hype-man): unlike most viral revenue threads, **one of these is real, one is real-but-a-job, and two fail the bar** — one on legal exposure, one on arithmetic. The closer is the best line in the thread: proof-of-one is exactly how the surviving idea gets sold.

---

## The claims

| # | Idea | Claimed price | The pitch |
|---|---|---|---|
| 1 | RAG on internal docs | $6,000–$18,000 per build | "companies sit on 10 years of PDFs nobody can search… two builds a month is a salary" |
| 2 | AI-assisted contract review | $3,400–$9,000/mo retainer | "paralegal-level first pass on NDAs and vendor agreements… prove their accuracy rate" |
| 3 | Grant writing + AI research layer | $4,000–$11,000 per application cycle | "one person covers six orgs because the research half stopped taking a week" |
| 4 | Claims triage for small insurance brokers | $12,000–$27,000/mo | "the boring one… because nobody wants to touch insurance" |

The four-term bar: **named buyer / ~$0 channel / evidence money changes hands today / a price.** Scored one at a time.

## 1. RAG on internal docs — 🟢 the real one

**Price claim checks out.** 2026 market guides put a scoped internal-docs RAG bot (small knowledge base, Q&A, one or two read-only integrations) at **$5K–$15K per build**, with $5K–$25K for custom-knowledge-base builds generally and freelance rates of $40–$200/hr. The post's $6K–$18K is squarely inside the researched range — this is the only idea in the thread whose number survives contact with published pricing.

- **Named buyer:** yes — the ops/IT lead at an SMB or mid-market firm sitting on a decade of policies, SOPs, and PDFs. Specific person, specific pain.
- **~$0 channel:** the weak term. No organic channel exists; it's outbound, referrals, or a niche you already have warm access to. This is where the "two builds a month is a salary" arithmetic breaks — the build is 40–80 hours, but the *sale* is the bottleneck, and the post prices the labor while ignoring the pipeline.
- **Money changes hands today:** yes — agencies and freelancers demonstrably sell this at these prices, and productized comps run $500–$5K setup + $200–$1K/mo ongoing.
- **Price:** validated, plus a sleeper: custom builds carry **15–20% of build cost annually** in maintenance — the retainer tail is recurring revenue the post doesn't even mention.

**Founder fit: strong.** Only idea of the four that is a pure software build — Claude API + vector store + the existing Vercel/Cloudflare deploy muscle. Deep-dive below.

## 2. AI contract review — 🔴 the legal-exposure one

**Price claim doesn't survive.** Attorney contract review runs **$200–$500 per document**; AI contract-review tools sell for **$20–$90/mo** at the small end and ~$1K+/mo for team plans (Spellbook, LawGeex, et al. — a funded, crowded category). A $3,400–$9,000/mo retainer to a solo non-lawyer sits an order of magnitude above what the tool market bears, and the phrase doing all the work in the post is "someone who can prove their accuracy rate" — an unpriced, unbuilt eval harness.

The bigger problem is structural. In every U.S. state, advising on whether contract terms are favorable or enforceable is the **practice of law**; a non-lawyer selling "paralegal-level first pass" *directly to businesses* is unauthorized-practice-of-law exposure with no malpractice cover. Selling *to law firms* instead is legal — paralegals work under attorney supervision — but then the competition is established legal-tech at a tenth of the claimed price, not an open field.

- **Named buyer:** fuzzy — "firms" (which side of the UPL line?).
- **Channel:** none named; legal buys on trust and bar cards.
- **Money changes hands:** yes, but to lawyers and to funded tools — not to uncredentialed solos at retainer prices.
- **Verdict: kill**, unless you *are* a lawyer or sell tooling to one. The accuracy-proof requirement alone is a product company's roadmap wearing a freelancer's price tag.

## 3. Grant writing + AI research — 🟡 real, but it's a job

**Price claim is real at the high end.** Researched fees: foundation grants **$1,500–$5,000** flat, federal grants **$5,000–$15,000+**, retainers **$2,000–$6,000/mo**. The post's $4K–$11K "per application cycle" maps to legitimate market rates — this one isn't inflated.

What the post skips:

- **Success/commission fees are prohibited** by grant-professional ethics codes (and funders' rules) — so the model is selling *writing labor at flat rates*, not taking a cut of wins. The AI research layer compresses one input; the writing, relationships, and reporting remain human hours.
- **The buyer is relationship-gated.** Nonprofits hire grant writers with funded-grant track records, usually through their network. Cold entry without a portfolio of wins is slow; "one person covers six orgs" describes someone *already embedded* in that world running at full utilization.
- **Six orgs × ongoing cycles is full-time employment**, not a leveraged business. Fine if writing grants is the work you want; it's income, not an asset.

- **Named buyer:** yes (nonprofit EDs). **Channel:** network-gated, not ~$0. **Money changes hands:** yes. **Price:** verified.
- **Verdict: legitimate income for someone with nonprofit ties and writing chops; pass for this repo's owner** — zero network in the space, and every hour is billed labor competing with six other projects.

## 4. Insurance claims triage — 🔴 the arithmetic one

The "$12K–$27K/mo because nobody wants to touch insurance" line collapses on contact with small-brokerage economics:

- Roughly **half of independent agencies gross under $500K/yr** (median ~$1.2M), and tech spend runs **5–10% of revenue**. $12K–$27K/mo is **$144K–$324K/yr — 30–65% of a typical small agency's entire revenue** on one vendor. The actual market rate for automation at a 3–8 agent agency is **$3.5K–$10K in year one**, total.
- **Wrong buyer for the job.** Brokers *advocate and track* claims; carriers and TPAs *triage and adjudicate* them. The entities that pay enterprise money for triage (Guidewire ClaimsCenter, Snapsheet territory) buy from vendors with SOC 2, E&O cover, and references — not from solo outsiders, which is the entire premise of the post.
- "Nobody wants to touch insurance" is true and is not a moat you're on the right side of: the reason is regulated data, compliance burden, and trust cycles measured in years.

- **Named buyer:** misidentified. **Channel:** none. **Money changes hands:** yes, at carriers/TPAs, to incumbents. **Price:** fantasy for the named segment.
- **Verdict: kill as posted.** The honest version — back-office automation for small agencies at $3–10K/yr — is idea #1 wearing an insurance costume, at insurance-agency prices.

---

## Deep-dive: RAG on internal docs, fitted to this owner

**One-liner:** fixed-scope, fixed-price builds that make a company's document pile answerable — Claude over their own files, in their own accounts — sold per-build with a maintenance retainer tail.

**Who it's for:** SMB/mid-market ops or IT leads (10–200 staff) in document-heavy niches — trades/field services, property management, clinics, local manufacturing — where "ask the PDF pile" replaces asking the one veteran employee who remembers.

**Why now:** the capability got commoditized (Claude + off-the-shelf vector stores) but the *buyers* still can't self-serve; 2026 pricing guides show a real per-build market at exactly the post's range, and maintenance norms (15–20%/yr) turn each build into recurring revenue.

### Financial snapshot

| Metric | Estimate | Basis |
|---|---|---|
| Startup capital | ~$0–$500 | Stack already owned (Claude Code, Vercel/Cloudflare, Polar for deposits); capital is *time* |
| Price per build | $6K–$15K | Market-validated range for scoped internal-docs RAG |
| Cost per build | 40–80 hrs + ~$100–300/mo API/infra passed through | Effective $75–$150+/hr at the low price point |
| Maintenance retainer | $200–$1K/mo per client | Productized-service comps; 15–20%-of-build annual norm |
| Time to first dollar | 4–10 weeks | First build discounted or free-for-case-study, per the thread's own closer |
| Year-one shape | 4–8 builds ($24K–$100K) + retainer base compounding to $1K–$5K/mo | At 1–2 builds/quarter alongside existing projects — *not* "two a month" |
| Gross margin | 80%+ | Labor business; infra costs land in the client's accounts |

**Key risk:** pipeline, not product. Every published failure mode is "could build, couldn't sell." Mitigations below are all channel moves. Second risk: data handling — deploy into *the client's* cloud/API accounts so their documents never live on your infrastructure; it's both the security answer and the churn-proofing.

### 5-point action plan

1. **Build the proof this week** — point Claude Code at a real, messy public corpus (e.g. a municipal code, an equipment-manual pile) and ship a live demo at a URL. The thread's one true line: proof you did it once. *~3–4 days.*
2. **Write the one-page productized offer** — fixed scope (up to N docs, Q&A + citations, deployed in your accounts), fixed price ($7,500 anchor), 2-week delivery, maintenance retainer from month two. Fixed-scope is what separates a product from an hourly gig. *1 day.*
3. **First client at cost via warm access** — the AF Auto Mechanics network is a wedge into trades/local-services firms drowning in manuals, invoices, and compliance PDFs. One discounted build in exchange for measured before/after numbers and a named testimonial. *Weeks 2–5.*
4. **Turn build #1 into the case study** — time-to-answer before/after, hours saved, quote. This is the entire marketing asset; the niche makes referrals compound ("the person who does this for shops like ours"). *Week 6.*
5. **Standardize and repeat inside one niche** — same stack, same scope doc, same onboarding; raise price each build until resistance. Target 1–2 builds/quarter as a portfolio project, retainers as the compounding layer. *Ongoing.*

### Verdict

**Profitability: 7/10** — validated prices, 80%+ margins, retainer tail; capped by solo hours and sales cycle.
**Feasibility for this owner: 8/10** — the build is squarely inside existing skills and stack; the untested muscle is outbound sales.
**Overall: 🟡 Conditional Go** — conditional on treating it as a *sales* project, not a build project, and on the first proof artifact shipping before any outreach. As a seventh parallel project, the honest arithmetic is 1–2 builds a quarter, not the post's two-a-month salary — but unlike the other three ideas, every term of the bar can actually be answered.

---

**Method note:** same play as the faceless-business prompt-pack teardown (also in `ideas/`, via PR #1) — take the thread seriously, check its numbers against published rates, kill what fails, and hand back the one version that clears the bar. The tell that separates #1 from the rest: its price matched independent market data, and its buyer, seller, and law all sit on the same side of the table.

**Sources:**

- RAG/chatbot build pricing: [Layer3Labs — custom chatbot development services](https://www.layer3labs.io/guides/custom-chatbot-development-services), [Kellton — custom AI chatbot with LLMs and RAG, 2026 cost guide](https://www.kellton.com/kellton-tech-blog/custom-ai-chatbot-development-llm-rag), [Metageeks — chatbot developer rates 2026](https://www.metageeks.tech/insights/chatbot-developer-cost)
- Productized AI service comps and first-client playbooks: [Chipp — AI chatbot pricing guide](https://chipp.ai/blog/ai-chatbot-pricing-guide-how-much-charge/), [MindStudio — AI automation business case studies](https://www.mindstudio.ai/blog/start-ai-automation-business-case-studies)
- Contract review market and UPL: [AI Legal Authority — AI contract review under U.S. law](https://ailegalauthority.com/ai-contract-review-us-law/), [Thomson Reuters — AI contract review buyer's guide](https://legal.thomsonreuters.com/blog/buyers-guide-artificial-intelligence-in-contract-review-software/)
- Grant-writing fees and ethics: [Instrumentl — grant writing fees](https://www.instrumentl.com/blog/grant-writing-fees), [Funding for Good — how to determine grant writing fees](https://fundingforgood.org/how-to-determine-grant-writing-fees/), [Foundation Group — grant writer compensation](https://www.501c3.org/grant-writer-compensation/)
- Small-agency economics and software spend: [AgencyEquity — average size of independent agencies](https://www.agencyequity.com/agency-management/the-average-size-of-independent-agencies-is-growing), [US Tech Automations — insurance agency automation cost guide 2026](https://ustechautomations.com/resources/blog/how-much-does-insurance-agency-crm-automation-cost-2026)
- The thread: @kiro_hq_ai on Threads
