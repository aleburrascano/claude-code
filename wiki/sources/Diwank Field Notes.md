---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, production, claude-md, anchor-comments, sacred-tests]
source_url: https://diwank.space/field-notes-from-shipping-real-code-with-claude
source_author: Diwank Tomer (founder, Julep)
---

# Diwank Field Notes

A practitioner's blog post on **shipping production code with Claude at scale**. By Diwank Tomer, founder of [Julep](https://julep.ai) (AI workflow orchestration platform). Significant for being a documented production perspective from someone running a real backend at meaningful scale.

For our wiki, Diwank's contributions are the **AIDEV-* anchor comment pattern**, the **sacred-tests rule**, and the **three-mode framing** for AI-assisted coding postures.

## The three modes

Distinct vibe-coding postures suited to different contexts:

| Mode | Code scale | AI involvement | Discipline |
|---|---|---|---|
| **Playground** | Personal scripts, POCs | 80-90% AI | Minimal oversight |
| **Pair Programming** | <~5,000 lines | Active human-AI collab | Careful documentation |
| **Production / Monorepo Scale** | Large systems | Sophisticated guardrails | Explicit boundaries |

> "Vibe coding at this scale does NOT scale very well, yet."

Large systems need deliberate sectioning into services and submodules **before** AI assistance becomes reliable. Implication: "vibe coding" is mode-appropriate, not a universal good. The wiki's [[Reducing Hallucinations|structural defenses]] apply mainly in production mode.

## The CLAUDE.md framework

Diwank's framing: CLAUDE.md is a **"constitution for the codebase"**. Encodes:

- Architecture decisions and their rationale
- Code style guidelines
- Critical patterns to follow (or avoid)
- Domain-specific glossary
- Explicit boundaries ("never do this")

Aligns with [[Memory|the wiki's CLAUDE.md design discipline]] and [[Spec Kit (github)|Spec Kit's constitution-first pattern]].

## AIDEV-* anchor comments — novel pattern

Inline notes prefixed with structured tags that serve as **breadcrumbs for both AI and humans**:

- `AIDEV-NOTE:` — context that would otherwise be lost (why a thing is the way it is)
- `AIDEV-TODO:` — remaining work, scoped specifically
- `AIDEV-QUESTION:` — open questions for human review

> "These aren't casual comments; they're maintained infrastructure documenting complexity, performance considerations, or business logic that shouldn't change."

This is a **novel infrastructure pattern**. Most projects have inline comments; few have *typed* inline comments designed for both human and AI consumption. Worth lifting wholesale.

For our wiki: this is canonical reference for "comments-as-infrastructure" — pair with [[Karpathy Coding Principles|Surgical Changes]] (don't modify comments without understanding) and [[Memory|CLAUDE.md as constitution]].

## Sacred Rule: humans write tests

Diwank's most strongly-emphasized rule:

> "If an AI tool touches a test file, the PR gets rejected. No exceptions."

The reasoning:
- Tests encode **executable specifications**
- Tests represent **accumulated domain knowledge**
- When AI writes tests, it verifies code does what the code does — not what it *should* do
- AI-generated tests miss critical production concerns (his rate-limiter example: AI tests miss the memory leak from users who never return)

This is more aggressive than typical TDD discipline. Most ecosystem frameworks (e.g., [[Test-Driven Development with Claude|TDD with Claude]]) accept AI test generation when scoped tightly. Diwank's stricter rule reflects a specific failure mode he's seen at scale.

For our wiki: worth citing as a **production-tested discipline**. Whether to adopt depends on: (a) how complex your domain is, (b) how independently AI can derive correct test cases. For complex domains with hidden invariants, Diwank's rule may be right.

## Sacred list of "never-touch"

| Category | Why |
|---|---|
| **Test files** | Encode domain knowledge AI cannot possess |
| **Database migrations** | Irreversible in production; require deployment timing expertise |
| **Security-critical code** | Demands human review per change |
| **API contracts** | Breaking these fails every dependent client |
| **Configuration and secrets** | Should never be hardcoded |

This is essentially a **"Read-only for AI" policy** at the file/path level — implementable as [[Hooks|PreToolUse hooks]] with file-pattern blocks. See [[claudekit (Carl Rannaberg)|claudekit's file-guard hook]] for a generic implementation.

## Mistake hierarchy

| Level | Severity | Examples |
|---|---|---|
| **Level 1** | Annoying but harmless | Formatting issues linters catch |
| **Level 2** (implied) | Costly but recoverable | (not specified) |
| **Level 3** | Career-limiting | Modified tests, broken contracts, leaked credentials |

Implications: **Level 1 should be auto-fixed by hooks** (linters, formatters). **Level 3 requires structural prevention** (file-guard hooks, sandboxing, sacred-list discipline). Maps to the wiki's [[Reducing Hallucinations|stack of defenses]].

## Practical infrastructure patterns

- **Git worktrees for isolated AI experimentation** — prevents polluted main-branch history
- **Commit message tagging** — `[AI]` for >50% generated, `[AI-minor]` for <50%, `[AI-review]` for review-only. Helps reviewers focus appropriately.
- **Fresh Claude sessions for distinct tasks** — don't mix DB migration discussion with frontend styling in one conversation. (See [[Token Efficiency|the wiki's session management discipline]].)

## My assessment

Diwank's contributions for our wiki:

1. **The AIDEV-* anchor comment pattern** — the canonical novel contribution. Worth adopting whether or not you adopt the rest. Especially valuable for codebases where AI will keep returning.

2. **The mode framing (Playground / Pair / Production)** — disciplines should match context. The wiki's heavy frameworks ([[Superpowers (obra)|Superpowers]], [[Everything Claude Code (affaan-m)|ECC]], etc.) are Production-mode tools; the [[Karpathy Coding Principles|Karpathy CLAUDE.md]] is universal.

3. **The sacred-tests rule** — production-tested aggressive discipline. Whether to adopt depends on domain complexity. Worth knowing as an option.

4. **The mistake hierarchy** — practical tool for thinking about defense layers. Level-appropriate defenses, not uniform paranoia.

5. **The commit-message tagging** — small process change, big reviewer-helpfulness gain.

For Alessandro's focus areas, the AIDEV-* pattern is the highest-leverage immediate adoption. Pair with [[Memory|CLAUDE.md as constitution]] for the meta-document layer.

Cross-references: [[Karpathy Coding Principles]] · [[Memory]] · [[Test-Driven Development with Claude]] · [[Hooks]] · [[Reducing Hallucinations]] · [[Token Efficiency]] · [[Spec Kit (github)|constitution-first]] · [[Claude Code Ecosystem]]
