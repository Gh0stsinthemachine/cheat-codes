# What's New in 2026

Features that shipped recently and are worth trying. Pulled from the community [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) reference and the [official docs](https://code.claude.com/docs). Many are beta — check the docs for current status.

---

## Platform / API

### Computer use, Skills API, and Files API hit GA (Aug 2026)

Anthropic moved three agent capabilities to general availability (production, not beta) on Aug 20, 2026: **computer use** (agents that see a screenshot and click/type/scroll, now multiple actions per turn, HIPAA-eligible under BAA, toolset `computer_toolset_20260801`), the **Skills API** (upload and version your own skills — folders of instructions/scripts/templates Claude loads on demand — no hosting), and the **Files API** (auto file expiration, 5x higher rate limits, 1 TB/org). Computer use also added a **browser use tool** that targets web elements by page structure, not pixels.

**Source:** [claude.com/blog/computer-use-skills-api-files-api](https://claude.com/blog/computer-use-skills-api-files-api)
**Vetted:** 2026-08-27 · VERIFIED · fetched the official announcement; cross-checked platform docs
**Note:** Viral framing (@nalucamanse thread) called "Browser Use" a fourth standalone product — it's a *tool inside* computer use, so it's three GA items, not four. Strategic angle for Black Cloud: the **Skills API** is the one to watch — programmatic upload/versioning of skills could change how the claude-sync skill library is managed and how the agentic-staff products ship skills. Not a workflow change today; a capability to evaluate.

---

## Permission & speed modes

### Auto Mode — eliminate permission prompts

Stop approving every step. Auto Mode lets Claude run approved categories of action without asking each time.

`claude --permission-mode auto`  ·  cycle with `Shift + Tab`

**Source:** @claudeai · [blog](https://claude.com/blog/auto-mode)
**Note:** The natural next step once `/permissions` is dialed in and you trust a workflow.

### Fast Mode — lower-latency responses

`/fast`  ·  or set `"fastMode": true` in settings

**Source:** Claude Code docs → fast-mode

### No Flicker / fullscreen mode

Smoother terminal rendering for long sessions.

`/tui fullscreen`  ·  or env var `CLAUDE_CODE_NO_FLICKER=1`

**Source:** @bcherny

---

## Bigger thinking

### `/ultraplan` — deeper planning pass

A heavier-weight planning mode for bigger features and specs, beyond standard Plan Mode.

`/ultraplan`

**Source:** Claude Code docs → ultraplan (beta)

### `/ultrareview` — thorough code review

Deeper review pass with task tracking for a running review.

`/ultrareview`  ·  `claude ultrareview [target]`

**Source:** Claude Code docs → ultrareview (beta)

### `/goal` — set a target condition Claude works toward

Give Claude an explicit goal/exit condition and let it work until met.

`/goal <condition>`  ·  `/goal clear`

**Source:** Claude Code docs → goal

---

## More agents, more parallelism

### Agent Teams — coordinated multi-agent work

Built-in (enabled via env var). Agents collaborate as a team rather than one-at-a-time.

**Source:** @bcherny (beta)

### Agent View / background agents

Kick off agents that run in the background and check on them later.

`claude agents`  ·  `--bg`  ·  `/bg`

**Source:** Claude Code docs → agent-view (beta)

### Ralph Wiggum Loop — self-evolving loop plugin

A viral community plugin for long-running self-correcting loops. Install as a plugin.

**Source:** [anthropics/claude-code ralph-wiggum plugin](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum)

---

## New surfaces & integrations

### Power-ups

`/powerup`  — see the best-practice list of available power-ups

**Source:** community best-practice repo

### Routines — scheduled work on the web

Recurring workflows on claude.ai/code and the Desktop app.

`claude.ai/code/routines`  ·  `/schedule`

**Source:** Claude Code docs → routines (beta)

### Tasks system

A first-class task list Claude maintains.

`/tasks`  ·  stored in `~/.claude/tasks/`

**Source:** community best-practice repo

### Claude Code on the web

Run Claude Code from the browser.

`claude.ai/code`

**Source:** Claude Code docs (beta)

### Slack integration

Mention `@Claude` in Slack to kick off work.

**Source:** Claude Code docs → slack

### Managed Code Review (GitHub App)

A managed GitHub App that reviews PRs automatically; local equivalent is `/code-review`.

**Source:** @claudeai · [blog](https://claude.com/blog/code-review)

### Deep links

Open Claude Code straight into a repo with a query.

`claude-cli://open?repo=…&q=…`

**Source:** Claude Code docs → deep-links

---

## Spec-driven workflow frameworks

Worth a look if you want more structure than ad-hoc prompting. All follow some flavor of **Research → Plan → Execute → Review → Ship**.

- **[Spec Kit](https://github.com/github/spec-kit)** (GitHub) — `/speckit.specify` → `.plan` → `.tasks` → `.implement`
- **[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)** — product brief → PRD → architecture → epics/stories → sprint
- **[Superpowers](https://github.com/obra/superpowers)** — brainstorm → worktrees → plans → subagent-driven → TDD → review → ship
- **[OpenSpec](https://github.com/Fission-AI/OpenSpec)** — `/opsx:propose` → `apply` → `archive`
- **[Get Shit Done](https://github.com/gsd-build/get-shit-done)** — new-project → discuss → plan → execute → verify → ship

**Note:** These are heavyweight. For solo work the built-in Plan Mode + Skills + Hooks usually covers it — reach for a framework when a project gets genuinely large.
