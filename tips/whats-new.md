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

## Customizing Claude's own UI

### Mods — draw your own widgets above the prompt, in a side pane, or in the status line

A mod is a plugin with a TypeScript "hooks module" that hooks into Claude Code itself. The spot right above the text bar is called `AbovePrompt`; a `ui.render` hook on it returns a small tree (`Box`, `Text`, `Button`) and that row appears there. The same API opens side panes (`$.ui.open`), toasts (`$.ui.toast`), status-line text (`$.ui.status`), slash commands, and tool-call guards. `$.session.usage()` and the `session.measure` event give the 5-hour and weekly plan limits, context fill, and session cost.

```text
Ask Claude: "make a mod that shows my usage above the prompt"   # loads the plugin-authoring skill
claude plugin validate <mod folder>                              # check it before it loads
claude plugin test <mod folder>                                  # runs its tests/*.test.tsx against the engine
```

Working example in this repo: [`mods/usage-band/`](../mods/usage-band/) — draws a row like (example numbers) `5-hour 42% (resets 14:00) · Weekly 18% · Context 31% · Session $1.20`, and toasts at 90%.

**Where it shows:** terminal sessions and *local* sessions in the Claude desktop app only. Cloud sessions (claude.ai/code) don't draw the `AbovePrompt` band, and their text bar refuses `/plugin` commands, so a mod can't change that UI.

**Install once, for every local session on the Mac:** in a local session, type into the text bar:

```text
/plugin install usage-band --marketplace Gh0stsinthemachine/cheat-codes
```

`y` to add the marketplace, then **user** scope. Same thing from Terminal:

```text
claude plugin marketplace add Gh0stsinthemachine/cheat-codes
claude plugin install usage-band@cheat-codes
```

If Terminal answers `no such file or directory` for `claude`, the command points at an install that's gone. Reinstall with `curl -fsSL https://claude.ai/install.sh | bash`, open a new Terminal window, and retry. Update later: `claude plugin update usage-band@cheat-codes`, then `/reload-plugins`.

**Source:** Claude Code bundled `plugin-authoring` skill (v2.1.308) → `examples/band.tsx`, `reference.md`, `types/claude-code.d.ts` (`AbovePrompt`: "Raised on the terminal and desktop surfaces only")
**Vetted:** 2026-10-22 · VERIFIED · built `usage-band`; `claude plugin validate` passed; `tsc` type-check passed; `claude plugin test` 3/3 pass on terminal and desktop surfaces; install from the GitHub marketplace tested on a cloud machine (user scope, enabled). The text-bar `/plugin install` form and the Terminal reinstall are the documented routes; not run on a Mac from here.
**Note:** Early access — the API "may change between releases without notice." Rate-limit figures only appear on a subscription plan, after the first reply of the session. A mod Claude writes in a cloud session lives in that container and disappears with it; keep the copy in `mods/`. Reset times print in the machine's clock.

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
