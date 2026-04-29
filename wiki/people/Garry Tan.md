---
type: person
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [people, claude-code, framework-author, yc, institutional]
---

# Garry Tan

President + CEO of Y Combinator. Ex-Palantir engineer; co-founder of Posterous (acquired by Twitter). Built [[gstack (Garry Tan)|gstack]] — a 41+ skill framework — while running YC full-time.

For our wiki, Garry matters as **institutionally-credentialed framework author**. The methodology claims about productivity gains have unusual weight given his track record and YC perch.

## Distinctive contributions

### Role-based skill model
gstack assigns distinct roles — CEO, designer, engineer, QA lead, security officer — each with specific responsibilities and decision authority. Most frameworks have skill-per-task; gstack has skill-per-role-per-phase. More legible to humans; produces named perspectives.

### Multi-vendor agent coordination (`/pair-agent`)
Different AI vendors (OpenClaw, Hermes, Codex) share a browser with **tab isolation, scoped tokens, activity attribution**. Most frameworks are Claude-only; gstack treats AI as multi-vendor by default. Genuinely novel.

### 7-stage sprint cycle
Think → Plan → Build → Review & Test → Ship → Reflect → Cross-cutting. Each stage feeds outputs into subsequent stages. Sequential structure prevents gaps.

### Layered prompt-injection defense
22MB ML classifier + Claude Haiku transcript verification + random canary tokens + optional DeBERTa ensemble voting. The most aggressive adversarial-content protection in the wiki's coverage.

### Productivity claim
> "2026 logical-line pace represents approximately 810× my 2013 pace" (normalized for AI expansion).

Big claim. Author has the institutional position to make it credibly. Worth taking as evidence that AI-assisted developers who structure their work systematically can ship at order-of-magnitude higher rates.

This claim sits alongside [[Boris Cherny Tips Compendium|Boris's "141 PRs in a day"]] and [[Daniel Rosehill]]'s "75+ repos sustained over months" — three independent practitioners reporting OOM productivity gains via different methodologies.

### GBrain (persistent knowledge base)
Optional Supabase or local PGLite. **Per-repository trust policies** (read-write, read-only, deny). Important when memory ages and may not still be accurate.

### Taste Memory Learning (`/design-shotgun`)
Generates 4-6 design variants. Learns user preferences across iteration rounds. Pre-cursor pattern to [[Continuous Learning]]; specifically applied to design.

## Public presence

- X: [@garrytan](https://x.com/garrytan)
- President + CEO of Y Combinator
- gstack repo: [github.com/garrytan/gstack](https://github.com/garrytan/gstack)

## My assessment

Garry's framework matters more for what it signals than what it implements. Three signals:

1. **Y Combinator's leadership uses Claude Code at depth.** Bias for the rest of YC's portfolio companies to follow.
2. **Multi-vendor AI coordination is a viable design.** Most ecosystem assumes single-vendor; gstack proves the multi-vendor approach is workable. As more AI tools mature, this pattern likely becomes default.
3. **Productivity claims at the OOM scale are plausible** when the discipline is systematic.

For Alessandro's focus areas:
- The **role-based skill model** is worth borrowing whether or not you adopt the rest. It produces clearer responsibility boundaries than the more common "one skill per task."
- The **layered prompt-injection defense** is the strongest in the wiki's coverage; pair with [[Everything Claude Code (affaan-m)|AgentShield]] for defense in depth.
- The **`/pair-agent` multi-vendor pattern** is forward-looking. Even if you don't need it now, the design is worth understanding.

## Cross-references

- [[gstack (Garry Tan)]] (the framework)
- [[Skills]] · [[Subagents]] · [[Memory]] (GBrain)
- [[Reducing Hallucinations]] (layered defense pattern)
- [[Test Time Compute]] (`/pair-agent` is a multi-vendor TTC implementation)
- [[Claude Code Ecosystem]]
