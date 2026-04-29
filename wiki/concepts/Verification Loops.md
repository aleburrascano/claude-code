---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 8
tags: [pattern, verification, hallucination-reduction, quality-gates]
---

# Verification Loops

A pattern where Claude (or a subagent / hook / human) **checks the output of work before declaring it done**. The single highest-leverage discipline in our wiki for reducing wasted work and catching hallucinations.

> Per [[Boris Cherny Tips Compendium|Boris Cherny]]: "This feedback mechanism amplifies quality by 2-3x."

> Per [Anthropic best-practices docs]: "Give Claude a way to verify its work — this is the single highest-leverage thing you can do."

When two independent authoritative sources name the same lever as highest-impact, treat it as load-bearing.

## What "verification" can mean

A spectrum, ordered roughly by reliability:

| Verification | Reliability | Use when |
|---|---|---|
| **Formal proof / type checking** | Strongest (when applicable) | Type systems, static analysis |
| **Tests passing** | Very strong | TDD-friendly tasks |
| **Build succeeding** | Strong | Compilation, dependency resolution |
| **Linter clean** | Strong | Style + simple correctness |
| **Diffing behavior** ("compare main vs branch") | Strong | Refactors, optimization |
| **Browser/UI screenshot match** | Medium-strong | UI changes — see [[Claude Code\|Chrome extension]] |
| **Pattern match against criteria** | Medium | Spec compliance |
| **Subagent review** | Medium | Cross-check by different reasoning path |
| **Human review** | Variable | Anything; required at boundaries |
| **"Looks right"** | Weakest | Last resort; high false-negative rate |

The principle: **prefer stronger verification when possible**. Claude can verify stronger forms autonomously; weaker forms require human judgment.

## Implementations across the wiki

### Per-task verification

| Pattern | Source |
|---|---|
| **Karpathy "Goal-Driven Execution"** | [[Karpathy Coding Principles]] — transform imperatives into verifiable criteria |
| **TDD red-green-refactor** | [[Test-Driven Development with Claude]] — failing test as criterion |
| **Spec-then-quality two-stage review** | [[Superpowers (obra)]] — spec compliance before code quality |
| **6-aspect parallel review** | [[claudekit (Carl Rannaberg)]] — 6 specialist reviewers |
| **`<verify>` XML field per task** | [[Get Shit Done (gsd-build)]] — explicit per-task verification command |

### Hook-driven verification

| Pattern | Source |
|---|---|
| **PostToolUse: typecheck/lint/test** | [[claudekit (Carl Rannaberg)]] — runs tsc/lint/tests on every file change |
| **Stop hook: self-review** | [[claudekit (Carl Rannaberg)]] — pre-finish quality check |
| **Stop hook: project-wide validation** | [[claudekit (Carl Rannaberg)]] — end-of-session sweep |
| **Stop hook: nudge-or-verify** | [[shanraisshan Claude Code Best Practice\|Boris's tip]] — Stop hook that prompts Claude to verify or keep going |

### Workflow-level verification

| Pattern | Source |
|---|---|
| **Verification-before-completion** skill | [[Superpowers (obra)]] |
| **`/code-review`** | Anthropic built-in (multi-agent PR review) |
| **`/ce-code-review`** | [[Compound Engineering Plugin]] |
| **`/verify-work`** | [[Get Shit Done (gsd-build)]] — UAT testing + automated failure diagnosis |
| **/qa skill** | [[gstack (Garry Tan)]] — browser tests + auto-fix |
| **Eval harness** | [[Everything Claude Code (affaan-m)]] — verification loop evaluation |
| **Continuous verification** | [[Everything Claude Code (affaan-m)]] |

### Cross-model verification

| Pattern | Source |
|---|---|
| **Use Codex for plan/implementation review** | [[Boris Cherny Tips Compendium\|Boris]] · [[shanraisshan Claude Code Best Practice]] |
| **`/codex` skill** | [[gstack (Garry Tan)]] — independent OpenAI review |
| **`oracle` subagent (gpt-5)** | [[claudekit (Carl Rannaberg)]] — different perspective |

Cross-model verification is a special case of [[Test Time Compute]] — different models give genuinely uncorrelated reasoning.

## Boris's specific recommendations

From [[Boris Cherny Tips Compendium|the tips compendium]]:

- **"Challenge Claude — grill me on these changes and don't make a PR until I pass your test"** — make verification a dialogue
- **"Prove to me this works"** — diff behavior between branches
- **`/go` skill** that (1) tests E2E (2) runs `/simplify` (3) puts up a PR — verification baked into completion ritual
- **For Opus 4.7**: "running backends for end-to-end testing, using the Chromium extension for frontend, or employing Computer Use for desktop apps" — verification is *more* important as model capability grows

## The "trust-then-verify gap" antipattern (per Anthropic best-practices)

> "Claude produces a plausible-looking implementation that doesn't handle edge cases."
>
> **Fix**: Always provide verification (tests, scripts, screenshots). If you can't verify it, don't ship it.

Claude is *good* at producing plausible-looking output. Without verification, plausibility is what you get — not correctness. Verification is the sieve between plausible and correct.

## What verification doesn't cover

- **Spec correctness** — verification ensures the implementation matches the spec, not that the spec is right. Use [[jeffallan claude-skills|`/common-ground`]], spec review, [[Spec-Driven Development|SDD methodologies]] for spec correctness.
- **Long-term consequences** — tests pass today; architecture may be wrong for tomorrow. Use [[Compound Engineering]] to capture lessons from "passed tests but caused problems later."
- **Prompt injection in test fixtures** — tests can be fooled. Per [[Adversarial Prompting]] / [[Prompt Engineering Techniques]], test setup is also an attack surface.

## When verification is overkill

- Trivial single-line changes (typo fixes, obvious one-liners) — Karpathy explicitly notes the principles bias toward caution; trivial work doesn't need full rigor
- Throwaway scripts (one-time use, deletion-friendly) — verification overhead exceeds value
- Pure exploration (no shipping intent) — verification can come at exploration's end, not per step

## Designing your verification stack

Layer verification:

1. **Hook-driven** — every file change triggers typecheck/lint/test ([[claudekit (Carl Rannaberg)|claudekit pattern]])
2. **Per-task** — each spec/plan task has a `<verify>` ([[Get Shit Done (gsd-build)|GSD pattern]])
3. **Pre-completion** — Stop hook reviews work ([[claudekit (Carl Rannaberg)|claudekit `self-review`]])
4. **Pre-merge** — `/code-review` or `/cso` security audit ([[gstack (Garry Tan)|gstack `/cso` for OWASP+STRIDE]])
5. **Post-deploy** — canary monitoring ([[gstack (Garry Tan)|`/canary`]])

Each layer catches a different class of error. None alone is sufficient.

## Cross-references

- [[Karpathy Coding Principles]] (Goal-Driven Execution is verification-first thinking)
- [[Test-Driven Development with Claude]] (TDD is verification-first by construction)
- [[Test Time Compute]] (multi-agent verification)
- [[Reducing Hallucinations]] (verification is the structural defense)
- [[Hooks]] (the operational layer for automated verification)
- [[Subagents]] (subagents as verifiers)
- [[Spec-Driven Development]] (spec is the verification target)
- Sources: most heavy frameworks in [[Claude Code Ecosystem]] implement verification loops in some form
