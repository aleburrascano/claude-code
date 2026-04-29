---
type: person
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [people, practitioner, production, claude-code, julep, claude-md, tdd]
---

# Diwank Tomer

Co-founder of **Julep** (production agent runtime). Production practitioner whose [[Diwank Field Notes|field notes]] are one of the wiki's strongest "this is what worked at scale" sources — distinct from the more frequent ecosystem-tooling voices because Diwank writes from inside a real running product.

For our wiki, Diwank matters because **his patterns survived production**. Most wiki sources are tools and frameworks; Diwank documents the discipline of using Claude Code on a long-running, paying-customers system.

## Three load-bearing contributions

### 1. AIDEV-* anchor comments

Strategically placed comments (`// AIDEV-NOTE: ...`, `// AIDEV-DECISION: ...`, `// AIDEV-WARNING: ...`) that survive editing and act as durable in-code context Claude reads on every relevant edit. Hallucinations about "why does this line exist?" are pre-empted by the line *explaining itself*.

The pattern generalizes: anywhere Claude might need context to make a non-trivial edit, the comment is the cheapest place to put it. CLAUDE.md grows; AIDEV-* anchors stay in the code where the relevant decision was made.

### 2. The sacred-tests rule

Designate certain tests as un-rewriteable. Claude is instructed to make the *implementation* match the test, never the reverse. Catches the most insidious hallucination: "this test was wrong, I fixed it" (where the test was actually correct and the fix is the bug).

Foundational for [[Reducing Hallucinations]] — a structural defense complementary to TDD itself: TDD ensures tests exist; sacred-tests ensures they aren't quietly rewritten.

### 3. The three-mode framing (playground / pair-programming / production)

Distinct delegation discipline for three operational modes:

| Mode | Description | Posture |
|---|---|---|
| **Playground** | Exploratory, throwaway, fast | Minimum overhead; restart often |
| **Pair-programming** | Active collaboration, user reviewing each turn | Subagents only for verbose-output isolation |
| **Production** | Long autonomous runs, lower oversight | Subagents essential — context isolation, parallel review, specialist routing |

Mode-aware delegation prevents *overhead in playground* (where speed matters) and *under-delegation in production* (where verification matters). See [[When to Delegate to Subagents#The three-mode framing]].

## Why Diwank's voice carries weight

Most wiki contributors are tooling authors (`build a thing for the ecosystem`); Diwank is a production builder (`use Claude Code to build the actual product`). The patterns survive production load because they were forced to. When Diwank says "treat CLAUDE.md as a constitution," that's the framing of a team that's been bitten by treating it as a tip jar.

Field notes published periodically; check Julep's blog for updates.

## Cross-references

- [[Diwank Field Notes]] — the canonical source page
- [[Memory]] (CLAUDE.md as constitution; AIDEV-* anchor comments)
- [[Reducing Hallucinations]] (defense #18 — AIDEV + sacred-tests)
- [[When to Delegate to Subagents]] (three-mode framing)
- [[Test-Driven Development with Claude]] (sacred-tests is a TDD complement)
