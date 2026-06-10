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
