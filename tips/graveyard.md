# Graveyard — Killed Claims

Debunked tips and viral techniques that failed vetting. Recorded so a false claim is never re-answered as true, and so the same bullshit doesn't get re-litigated every time it recirculates. One row per kill.

The rule that fills this file: **viral syntax and "just shipped" claims are often fabricated or hype-compressed. A thread is a lead, not a source.**

| Claim | Source | Verdict / why | Vetted |
|---|---|---|---|
| `/loop every [x], [goal]` (and the `/loop every 5m` cheat-sheet family) is valid Claude Code loop syntax | viral "Loop Engineering" cheat-sheets | **FALSE.** Invented. Real syntax is `/loop <goal>` (self-paced) or `/loop 5m /cmd` (interval FIRST, then command); `/schedule` is the separate calendar-time command. Canonized correct in `claude-sync/loops.md`. | 2026-08 |
| "Fable 5.2 is free until Mon 16 Nov 2026, then runs on usage credits", so write a playbook before the deadline | Charlie Hills infographic "The Last Day of Fable 5.2" | **FALSE for Max plans.** The free week and its Nov 16 end apply to Pro and standard Team seats only. On Max, Fable stays inside the plan up to 50% of weekly limits; Max got 1-3 Fable limit resets instead (expire 2027-03-08). The playbook idea itself is sound and was built as `claude-sync/skills/fable-playbook`; the infographic's cost figures ($16.37 / $25.81 / $39.29) are unverified. | 2026-11-16 |
