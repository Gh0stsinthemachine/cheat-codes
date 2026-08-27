# Cheat Codes

A living field guide to building things — Claude, Claude Code, frontend, backend, and the tools in between. Captured from threads, docs, and hard-won practice, organized so I (and Claude Code) can actually use it.

> **Tagline:** Everything is a canvas.

---

## How to use this

This repo is plain markdown by design. No build step, no deploy, nothing to break. Two ways to get value from it:

1. **Read it on GitHub** — every file renders cleanly. Browse by topic below.
2. **Point Claude Code at it** — clone it, and Claude Code can read these tips and apply them. See [`CLAUDE.md`](./CLAUDE.md) for how that works. Ask things like *"what's the fastest way to run a recurring task in Claude Code?"* and it'll pull the answer from [`tips/claude-code.md`](./tips/claude-code.md).

---

## Index

| Topic | What's in it |
|---|---|
| [Claude Code](./tips/claude-code.md) | The CLI / agentic tool. Slash commands, flags, hooks, worktrees, agents, automation. The bulk of this repo. |
| [Claude (chat / Cowork / Projects)](./tips/claude-ai.md) | Using claude.ai well — which surface to pick, Extended Thinking, Cowork vs Projects. |
| [What's New in 2026](./tips/whats-new.md) | Features that shipped recently and are worth trying — Auto Mode, Fast Mode, `/ultrareview`, Agent Teams, Routines, and more. |
| [The Stack](./tips/stack.md) | Frontend, backend, infra, payments. What to use, what to avoid, libraries worth knowing. |
| [Workflow & Security](./tips/workflow.md) | Spec-driven workflows, API security prompts, general patterns. |
| [Python](./tips/python.md) | Notes on getting useful with Python. |
| [Local LLM Server](./tips/local-llm-server.md) | The M2 Ollama runbook: server, offload bridge, fallback, mobile. |
| [Graveyard](./tips/graveyard.md) | Killed claims — debunked viral tips, kept so they're never re-answered as true. |

---

## Adding a new tip

This repo is the **intake/vetting tier** of the claude-sync "brain." Tips arrive from the internet, get vetted (bullshit vs value) via the `cheat-codes` skill, and the highest-value verified ones are promoted — with Tom's approval — into claude-sync where they govern real work. Keep the format consistent so it stays scannable and Claude-readable.

```markdown
### Short, specific title

One or two sentences on what it does and why it matters.

`the command --or-flag`

**Source:** @handle on Threads / docs link
**Vetted:** YYYY-MM-DD · VERIFIED|PLAUSIBLE · how it was tested
**Note:** (optional) how it applies to my work.
**Status:** (only if promoted) promoted → claude-sync/<path>
```

The `Vetted:` line records that it cleared vetting and how (VERIFIED = tested/documented, PLAUSIBLE = credible but untested). Older tips without it stay valid. Debunked claims go in [`tips/graveyard.md`](./tips/graveyard.md), not here. The repo *is* the database. (Vetted tips auto-commit under a standing grant; you don't need to remind me to push.)

---

## Sources

Tips are paraphrased and attributed to their original authors — Boris Cherny (@bcherny), the Claude Code team, and various practitioners on Threads/X. The single best ongoing reference is the community-maintained [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) repo and the [official docs](https://code.claude.com/docs).
