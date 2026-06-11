# Claude Code

The CLI / agentic coding tool. This is the bulk of the collection. Grouped by what you're trying to do.

---

## Setup & Context

### CLAUDE.md — give Claude persistent memory about your project

Claude starts every session knowing nothing about your project. A `CLAUDE.md` file in your project root fixes that: it defines coding preferences, structure rules, and constants, and Claude reads it automatically every session.

`/init`  — generates a CLAUDE.md for your current project in seconds

**Source:** @realamrutpatil on Threads
**Note:** Use `/init` on every new project. The auto-generation is the part people miss.

### Use `--add-dir` to give Claude access to multiple repos

Start Claude in one repo and pull another into scope. Grants both visibility *and* edit permissions in the second repo.

`claude --add-dir ../other-repo`  (or `/add-dir` mid-session)

Or add `"additionalDirectories"` to `settings.json` to always load extra folders on startup.

**Source:** @boris_cherny on Threads

### Use `--bare` to speed up SDK startup by up to 10x

By default `claude -p` (and the SDKs) search for local CLAUDE.md files, settings, and MCPs — even for non-interactive runs. `--bare` skips all that; then pass exactly what you need explicitly.

`claude -p "summarize this" --bare --system-prompt "..." --mcp-config ...`

**Source:** @boris_cherny on Threads
**Note:** Will become the SDK default in a future version.

---

## Safety nets

### Use `/permissions` to preapprove safe actions and block risky ones

Claude can edit files and run bash — useful and dangerous. Permissions let you preapprove safe actions (running tests, committing) and block risky ones (deleting files).

`/permissions`  — opens the interactive menu

**Source:** @realamrutpatil on Threads
**Note:** Start conservative, loosen as you build confidence. Set this up before doing anything destructive.

### Use `/restore` to roll back to a checkpoint after bad edits

Claude automatically snapshots your files before each edit. If a refactor goes wrong 20 edits deep, you don't undo manually.

`/restore`  — lists checkpoints with timestamps; pick one to return to that exact state

**Source:** @realamrutpatil on Threads
**Note:** Know this exists *before* any large refactor.

### Use Plan Mode before complex tasks (Shift + Tab)

Jumping straight into code on complex tasks wastes tokens and edits the wrong files. Plan Mode separates thinking from doing — Claude reads files, asks questions, and proposes a step-by-step plan with no edits. Review, approve, switch back, execute.

`Shift + Tab`  — toggle Plan Mode

**Source:** @realamrutpatil on Threads
**Note:** Use before any multi-file or architectural change.

---

## Parallelism & scale

### Use git worktrees for parallel Claude sessions

Deep built-in worktree support. Essential for running many Claudes in the same repo at once without them stepping on each other.

`claude -w`  — start a session in a new worktree

Or check the "worktree" box in Claude Desktop. Non-git users: the `WorktreeCreate` hook adds custom logic.

**Source:** @boris_cherny on Threads

### Use `/batch` to fan out massive parallel changesets

`/batch` interviews you, then fans the work out to as many worktree agents as it takes — dozens, hundreds, thousands. Built for large migrations and parallelizable work.

`/batch`  ·  `/simplify` (improve code quality after the fact)

**Source:** @boris_cherny on Threads

### Use `--agent` for a custom system prompt and toolset

Custom agents are a powerful, overlooked primitive. Define one in `.claude/agents/<name>.md`, then run it. Example: a ReadOnly agent that can't edit files or run bash — ideal for audits and review.

`claude --agent=ReadOnly`

**Source:** @boris_cherny on Threads
**Note:** Could build a dedicated review agent per project.

---

## Automation

### Schedule recurring tasks with `/loop` and `/schedule`

Run Claude on an interval, up to a week at a time. Turn workflows into skills + loops.

```
/loop 5m /babysit          # auto-address review + rebase PRs every 5 min
/loop 30m /slack-feedback  # auto-create PRs from Slack feedback every 30 min
/schedule 9am daily /standup
```

**Source:** @boris_cherny on Threads
**Note:** Relevant for CI automation and job-search automation loops.

### Use hooks to inject logic into the agent lifecycle

Hooks run scripts deterministically at lifecycle points: `SessionStart` (load context), `PreToolUse` (log bash commands), `PermissionRequest` (route approvals to WhatsApp), `Stop` (poke Claude to keep going). Use them for formatting, security checks, logging — the things that must happen *every* time.

See `code.claude.com/docs` → Hooks reference.

**Source:** @boris_cherny + @realamrutpatil on Threads

---

## Extending Claude

### Build Skills (SKILL.md) for repeated workflows

Skills are predefined instruction files — each a `SKILL.md` with a name, description, and instructions. Claude auto-invokes the right one when needed. Build once, reuse forever, no memorizing long prompts.

`.claude/skills/<name>/SKILL.md`

**Source:** @realamrutpatil on Threads
**Note:** Build skills for deploy flow, component patterns, test conventions.

### Install the frontend-design skill for bold UI

Anthropic's official skill for production-grade interfaces. Forces bold design choices instead of generic AI aesthetics. Covers design systems, responsive layouts, accessibility, scalable components.

`npx skills add anthropics/skills@frontend-design`

**Source:** Skills for Claude Code 2026 (13doots)
**Note:** Run before any UI work.

### Use MCP servers to reach beyond files and bash

Claude reads files and runs bash — but Figma, Slack, databases, and internal tools sit outside that. MCP (Model Context Protocol) is an open standard that exposes tools to agents. Add a server, Claude gets everything it exposes. Thousands are public today.

`.mcp.json`  /  `settings.json`

**Source:** @realamrutpatil on Threads
**Note:** Already connected: Stripe, Vercel, Gmail, Google Calendar, Monday.com, Supabase. More at mcp.so.

### Use the Chrome extension so Claude can verify its own frontend

The single most important Claude Code tip: give Claude a way to *verify* its output and it will iterate until the result is great. A dev without a browser builds bad UI; give them one and they fix it until it looks right. Same for Claude.

Download via `code.claude.com/docs`.

**Source:** @boris_cherny on Threads
**Note:** Critical for all frontend work.

---

## Working across devices

### Claude Code has a mobile app

Full Claude Code on iOS and Android. Review PRs, fix bugs, push commits from your phone. Download the Claude app → Code tab.

**Source:** @boris_cherny on Threads

### Move sessions between devices with `/teleport`

Sessions are portable units, not device-bound processes. Start on desktop, continue on mobile — full context travels.

`claude --teleport`  or  `/teleport`  — continue a cloud session locally
`/remote-control`  — control a local session from phone/web

Set "Enable Remote Control for all sessions" in `/config` to make it permanent.

**Source:** @boris_cherny on Threads

### Cowork Dispatch — remote-control Claude Desktop from your phone

Dispatch is a secure remote control for the Desktop app. Uses your MCPs, browser, and computer with permission. "When I'm not coding, I'm dispatching."

**Source:** @boris_cherny on Threads

### Claude Desktop auto-starts and tests web servers

The Desktop app can run your web server and test it in a built-in browser automatically. Replicate in CLI/VSCode via the Chrome extension, or just use Desktop.

**Source:** @boris_cherny on Threads

---

## Small but mighty

### Fork a session with `/branch` or `--fork-session`

`/branch`  — fork from within a session
`claude --resume <session-id> --fork-session`  — fork from the CLI

Explore alternate approaches without losing the main thread.

**Source:** @boris_cherny on Threads

### Use `/btw` for quick side queries while the agent works

Ask a quick question without interrupting the running agent.

`/btw how do I spell dachshund?`

**Source:** @boris_cherny on Threads

### Use `/voice` to code by talking

Most of Boris's coding is spoken, not typed. CLI: `/voice` then hold spacebar. Desktop: voice button. iOS: enable dictation.

**Source:** @boris_cherny on Threads

---

## Context systems (the real unlock)

> The builders moving fastest aren't writing better prompts — they're building better context systems. Every large codebase eventually becomes a documentation system; the code is rarely the bottleneck, context is.

### Split context into purpose-built markdown files, not one giant CLAUDE.md

Instead of cramming everything into `CLAUDE.md`, give each kind of context its own file and reference them. The pattern:

- **`CLAUDE.md`** — *decisions*, not documentation. Stack, architecture, conventions, auth patterns, API standards, and an explicit "what not to touch" list.
- **`design.md`** — the design system: spacing scale, typography scale, color system, layout rules, breakpoints, component guidelines. *If your UI keeps drifting, your design system lives in your head instead of a file.*
- **`components.md`** — every shared component, its props (with types), variants, states, usage rules, and do's/don'ts. *Otherwise Claude invents ButtonV2, CardNew, ModalImproved.*
- **`slices.md`** — feature-to-file map with status (shipped / in progress / planned). *So Claude stops guessing what state the project is in.*
- **`rules.md`** — recurring instructions, recurring bugs & fixes, edge cases, performance notes, security considerations, lessons learned. *If Claude keeps making the same mistake, stop repeating yourself and write the rule down.*

**Source:** "I wish someone had explained this when I started using Claude" infographic (Threads)
**Note:** `design.md` is the highest-leverage one for me — it's where the Steel Mist system (#2F2F2F / #B8C4CC / #EDEAE3 / #E04540), sans-serif rule, and Bricolage/Unbounded type belong, so Claude stops defaulting to generic UI. Set this up per project.

### Governing principles for context files

- Every **instruction** repeated more than twice belongs in documentation.
- Every **bug** repeated more than twice belongs in documentation.
- Document *decisions*, not technologies. "Use React Query for server state" is useful; "React Query fetches data" is not.
- When a feature is finished, update the docs immediately. **Stale context is almost worse than missing context.**

**Source:** same infographic

### Session hygiene

- Don't let chats run for weeks. Start fresh sessions and reload context.
- Make Claude explain its plan before writing code on larger features.
- Fixing *understanding* is cheaper than fixing *code*.
- Screenshots belong in the context too — a screenshot of a competitor's UI is often more useful than paragraphs of explanation.

**Source:** same infographic

### Starter checklist for a well-contexted project

- [ ] `CLAUDE.md` exists and is up to date
- [ ] Design system documented in `design.md`
- [ ] Shared components in `components.md`
- [ ] Feature map in `slices.md`
- [ ] Recurring rules in `rules.md`
- [ ] Screenshots added to context
- [ ] Plan explained before coding

---

## Tools worth installing

### repomix — pack a whole repo into one LLM-friendly file

Flattens an entire repository into a single structured file you can hand to Claude for whole-project context. Useful when you want the model to see everything at once instead of file-by-file.

`npx repomix`

**Source:** avatarist.ai (Threads) · ~13k stars
**Note:** Good for onboarding Claude to an existing project fast, or for one-shot architecture reviews.

### agent-browser MCP — token-efficient web automation

A web-automation MCP server built to use far fewer tokens than driving a full browser. Worth it when Claude needs to navigate or scrape as part of a task.

**Source:** avatarist.ai (Threads) · ~22k stars
**Note:** Relevant given past browser-automation work. Token efficiency matters on a lean budget — worth comparing against the built-in Chrome extension.

### caveman skill — cut ~65% of tokens

A skill that compresses Claude's output to bare keywords ("talks like a caveman") to slash token use on long sessions.

**Source:** avatarist.ai (Threads)
**Note:** Cost lever for long runs. Output isn't always presentation-ready — use for internal/iterative work, not final copy.

### humanizer skill — strip AI writing tics

Removes the tells of AI-generated prose (overused em-dashes, "thrilled/passionate," parallel-construction tics).

**Source:** avatarist.ai (Threads) · ~7k stars
**Note:** Codifies my cover-letter rules. Could fork it into a personal skill that bakes in my specific scrub-list.
