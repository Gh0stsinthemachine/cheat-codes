# usage-band

A Claude Code mod that draws one dim row right above the prompt:

```
5-hour 42% (resets 14:00)  ·  Weekly 18%  ·  Context 31%  ·  Session $1.20
```

5-hour and Weekly are the plan's rate-limit windows (only shown on a subscription, after the first reply of the session). Context is how full the conversation window is. Session is what this session has cost so far. A toast pops when any limit passes 90%.

Shows in terminal sessions and local sessions in the Claude desktop app. Cloud sessions (claude.ai/code) do not draw this band.

## Install

In a local Claude Code session, type into the text bar:

```
/plugin install usage-band --marketplace Gh0stsinthemachine/cheat-codes
```

Answer `y` to add the marketplace, then pick user scope. Or from a terminal:

```
claude plugin marketplace add Gh0stsinthemachine/cheat-codes
claude plugin install usage-band@cheat-codes
```

Update: `claude plugin update usage-band@cheat-codes`, then `/reload-plugins`.

## Check

```
claude plugin validate mods/usage-band
claude plugin test mods/usage-band
```
