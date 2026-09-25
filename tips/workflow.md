# Workflow & Security

General patterns, security prompts, and process.

---

### API security prompts for vibe-coders (copy-paste ready)

Four prompts to secure an app's API. Paste them at the point you're building the auth layer.

**1. Auth on all private endpoints**
> Every endpoint must: check for a valid auth token, verify it hasn't expired, confirm the user is logged in, and return 401 if invalid. Default to protected, not public.

**2. Verify ownership (authorization, not just authentication)**
> Check that the requested resource belongs to the requesting user. Match `user_id` on every request. Return 403 if not the owner. Authentication ≠ authorization.

**3. API keys for service-to-service**
> Generate a unique key per service/client, track usage per key, and make compromised keys easy to revoke.

**4. Role-based access control**
> Define roles: Admin = everything, User = own data only, Guest = read-only public. Check role before allowing any operation.

**Source:** @hendrynug on Threads
**Note:** Run through all four when building any backend.

---

### Give Claude a way to verify its output

The highest-leverage habit across all AI coding: never ask for output you can't let the model check. A browser for frontend, a test suite for logic, a linter for style. With a feedback loop, Claude iterates to "great"; without one, it guesses.

**Source:** @boris_cherny on Threads (restated as a general principle)

---

### Make Claude your GTM/CFO analyst, not your hype man

If you generate ideas faster than you can vet them, the bottleneck isn't ideas — it's honest analysis. Claude defaults to enthusiasm, which is worse than useless: it feels like validation and costs you months. Fix it by writing the division of labor into CLAUDE.md:

> **My job:** be creative, ideative, kick off new opportunities.
> **Your job:** run a thorough GTM and CFO analysis on each one — can it book revenue, and if so, how. If an idea is a waste, say so plainly. If it just needs a revenue path, figure out the path — don't hand the question back to me.

Three things make it actually work:

1. **Define the bar, not the vibe.** "Can book revenue" has to be a claim that gets checked: a named buyer, a channel that reaches them at ~$0, evidence money changes hands for this today, and a price. An idea that can't answer all four hasn't earned a yes. Add the CFO half — unit economics, units/month to clear your burn, time to first dollar — so every verdict carries numbers.
2. **Pre-authorize the "no."** Write in that pushing back is the job, and that *pressure isn't evidence*. Otherwise you'll argue Claude out of every correct no — it's built to be agreeable, and you're the one it's agreeing with. Killing an idea is a deliverable, not a failure to deliver.
3. **Aim friction at economics, never at count.** This is the subtle one. A directive like "focus on shipping what you have" reads as discipline but fires on *shape* — so it kills good new bets too, and it'll fire on your own top priority if that priority isn't named in the file. Friction belongs on *which market* and *what unit economics*, never on *how many bets*.

**Note:** Corollary — anything not written in CLAUDE.md is invisible, and worse than invisible: it re-enters every session looking like an unvetted new idea and collects the friction meant for strangers. Keep the priority list current or the config will quietly argue against your real work.

---

### Run viral prompt packs through the analyst before you run them

"Faceless business," "AI side hustle," "$3K/month" prompt packs are execution playbooks with the demand question deleted — they're all content production and distribution, and they presume a buyer instead of proving one. Before spending a month making content, pipe the pack's output through the four-term bar (named buyer / ~$0 channel / evidence money changes hands / price) plus the CFO math. Most niches fail on *named buyer*; the useful prompts (content calendar, script builder, growth loops) are real — but only once a product and a buyer already exist to point them at.

`prompt pack → four-term bar + CFO math → verdict`

**Source:** @creatoraugustas on Threads (the 8-prompt "faceless business" pack)
**Note:** Worked example: [`ideas/faceless-business-gtm-cfo.md`](../ideas/faceless-business-gtm-cfo.md). Verdict — a content checklist dressed as a business; invert its order (sell to a proven buyer first, *then* use the content prompts as a ~$0 channel). The $3K/month "money map" pencils out to millions of monthly views feeding a specific product — not "post for 30 days."

---

## Focus & task-management prompts

Prompts for breaking work loose when juggling many parallel projects. (Note: these circulated under a "Claude ADHD Executive Function Mode" headline — that's clickbait, there's no such feature. They're just well-built prompts.)

### Executive Function Externalizer — brain dump to triage

> My brain is full of open loops. I'll dump everything I'm worried about below. Categorize these into "Now," "Later," and "Trash," then write a one-sentence actionable next step for only the "Now" items.

**Source:** @aicreatortyler on Threads
**Note:** Strongest of the set for a 6-project load. Clears the mental stack and forces a single next action.

### Time-Blindness Auditor — surface hidden sub-tasks

> I think [project] will take 20 minutes, but it usually takes 2 hours. Help me time-map this by identifying the 3 hidden sub-tasks I always forget to account for, so I can set a realistic deadline.

**Source:** @aicreatortyler on Threads
**Note:** Good for scoping before committing to a timeline.

### Task Paralysis Shatterer — ridiculously small first step

> I'm staring at [task] and can't start. Break this into "ridiculously small" steps that take less than 1 minute each. Give me the first step and tell me exactly where to put my hands to begin.

**Source:** @aicreatortyler on Threads
**Note:** For the cold-start problem on a dreaded task.
