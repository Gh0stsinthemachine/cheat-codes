# Local LLM Server (M2 + Ollama)

Runbook for the home local-LLM setup: M2 MacBook Pro as a dedicated Ollama server, MacBook Air as client. Set up Aug 2026. **Server address (the whole system):** `http://MacBook-Pro-M2.local:11434`

---

### The model routing rule

**Transform → local. Think → Claude.**
- **Local** (qwen2.5-coder:7b default, gemma4:12b premium): commit messages, reformatting, summaries, boilerplate, regex, renames, first drafts, CSV cleanup.
- **Claude**: architecture, multi-file debugging, ambiguous specs, strategy, long-context work.
- **Gray zone:** try local once; second failed re-prompt → escalate to Claude (paste local's attempt in, don't start cold).

**Note:** the M2 is the dedicated always-on box. The Air also has a redundant local copy — that's the deliberate travel fallback, not a mistake.

---

### Claude Code ↔ local offload bridge (the token-saver)

Claude Code can't route its own reasoning to Ollama, so offload is script-based delegation — scripts call the M2 and hand Claude a distilled result. Lives in `~/.claude/scripts/ollama-offload/` (from claude-sync), surfaced by the `local-offload` skill.

```bash
# distill a long log instead of reading raw
npm test 2>&1 | bash ~/.claude/scripts/ollama-offload/triage-logs.sh
# commit message from a staged diff
git diff --staged | bash ~/.claude/scripts/ollama-offload/draft-summary.sh --mode commit
# mechanical data transform
bash ~/.claude/scripts/ollama-offload/format-convert.sh "CSV to markdown table" data.csv
```

**Note:** the bridge config lives in `scripts/lib/ollama-env.sh` and does NOT touch `~/.zshrc` — Raycast/Enchanted/Aider are unaffected.

---

### Three-tier endpoint fallback (works away from home)

The offload scripts resolve an endpoint in order, so they never hard-fail:
1. **M2 over LAN** — `http://MacBook-Pro-M2.local:11434` (home Wi-Fi)
2. **M2 over Tailscale** — set `OLLAMA_TAILSCALE_HOST` in `ollama-env.sh` after Tailscale setup (travel)
3. **Local copy** — `http://localhost:11434` on the Air (always works, loses the gemma4:12b premium rung)

Off the home network with no Tailscale, offload silently falls to the Air's local qwen. The tier that answered prints to stderr as `[ollama: <model> via <tier>]`.

---

### Remote + mobile access (Tailscale)

`.local` (mDNS) only works on the same Wi-Fi. For anywhere-access:
- `brew install tailscale` (or the app) on **both** Macs + the iPhone (Tailscale iOS app); sign in to the same tailnet.
- Reach the M2 from anywhere via its tailnet hostname (e.g. `http://macbook-pro-m2:11434`) — encrypted P2P, no port-forwarding.
- **Mobile:** Enchanted for iOS pointed at the tailnet hostname = local models on the phone off Wi-Fi.

**Note:** Ollama has **no authentication** — the tailnet IS the security. **Never** port-forward :11434 on the router (175k+ exposed instances found in early 2026).

---

### Aider (edits real repos with the local model)

```bash
cd ~/repos/PROJECT              # git repo
aider --model ollama_chat/qwen2.5-coder:7b
/add src/path/to/file.ts        # scope to 1-3 files
<describe the change>
/diff                           # review
/undo                           # revert its last commit (safe)
/exit
```
File-scoped concrete asks only. Multi-file or design decisions → that's a Claude task. Everything aider does is auto-committed → `/undo` is fully reversible.

---

### Server maintenance (M2)

- Runs as `brew services` (auto-restart on crash). Keep-awake: plugged in + `sudo pmset -c disablesleep 1`. Auto-login ON so it survives reboots.
- Network exposure: `launchctl setenv OLLAMA_HOST "0.0.0.0:11434"` then `brew services restart ollama`.
- Update models: `ollama pull qwen2.5-coder:7b` / `gemma4:12b` (on the M2 or over SSH). SSH in: `ssh tomsikler@MacBook-Pro-M2.local`.
- Weekly check from the Air: `curl http://MacBook-Pro-M2.local:11434/api/tags`.

---

### Lessons from live testing (2026-08-21)

- **qwen2.5-coder is a code model** — coherent but generic on open knowledge questions (pet care, health, research). For those use `ask-local.sh` (routes to gemma4:12b) or just ask Claude — that class of question is cheap there.
- **Cold model-swap is the hidden latency killer.** 16GB can't hold both models; switching qwen→gemma4 pays a fresh load ON TOP of gemma4's 20-60s generation. A single long prompt blew a 180s curl timeout this way. Fix shipped in `ollama-env.sh`: premium calls auto-get 300s, requests send `keep_alive: 30m` so the last-used model stays resident, and timeouts report as timeouts (`timeout_300s` in the offload log) instead of a generic error.
- **The seesaw is inherent:** keeping gemma4 warm evicts qwen and vice versa. Consecutive same-model calls are cheap; alternating models pays the load tax each swap. Batch same-model work together.

### Troubleshooting

| Symptom | Fix |
|---|---|
| "no such host" | `.local` mDNS flaking. On M2: `ipconfig getifaddr en0`, use `http://IP:11434`. Reserve the IP in the router. |
| Connects but hangs | M2 asleep or Ollama down. Check pmset / `brew services list \| grep ollama`. |
| Enchanted dropdown empty | Wrong Wi-Fi (guest SSID?), M2 asleep, or exposure toggle off. Re-save URI, reopen Settings. |
| Air `ollama` acts local | No `OLLAMA_HOST` set → hits the Air's own copy. That's fine for the offload scripts (they set the endpoint themselves); for the CLI, export `OLLAMA_HOST` or just accept local. |
| gemma4:12b slow | Normal — 12B + thinking trace on 16GB M2 bandwidth. Use qwen2.5-coder:7b for speed. |

**Full technical reference + teardown:** `iCloud/Claude/claude-sync/M2 Ollama Spec/local-llm-setup-complete.md`.
