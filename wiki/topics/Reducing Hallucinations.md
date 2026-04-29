---
type: topic
created: 2026-04-26
updated: 2026-04-27
sources: 12
tags: [topic, focus, hallucinations, reasoning, verification, calibrated-confidence]
---

# Reducing Hallucinations

Hallucination in Claude Code looks like: invented APIs, silently picked wrong interpretations, "fixes" that introduce new bugs, "completed" tasks that don't actually pass, plausible-sounding nonsense in unfamiliar territory.

**Hallucination isn't fixed by asking nicely.** It's reduced by *structural* defenses — discipline that catches errors mechanically rather than relying on the model to police itself.

---

## The structural defenses (in order of leverage)

### 1. [[Karpathy Coding Principles|Karpathy's four principles]] — the discipline layer
The cheapest, highest-leverage intervention. One [[Memory|CLAUDE.md]] file. Four principles:
1. **Think Before Coding** — surface assumptions, don't pick interpretations silently
2. **Simplicity First** — minimum code; no speculative abstractions
3. **Surgical Changes** — touch only what's needed
4. **Goal-Driven Execution** — verifiable success criteria, not imperatives

Install before doing anything else.

### 2. [[Test-Driven Development with Claude|TDD]] — the verification layer
The single most reliable structural defense in the wiki's coverage. A failing test is **objective ground truth**; the agent can iterate against it without human intermediation. Karpathy's "Goal-Driven Execution" principle is operationalized here.

Implementations: [[Matt Pocock Skills|`mattpocock/skills/tdd`]], [[Superpowers (obra)|test-driven-development]], [[Awesome Claude Code (hesreallyhim)|TDD Guard]] (hook-enforced), [[claudekit (Carl Rannaberg)|test-changed hook]].

### 3. [[Spec-Driven Development]] — the alignment layer
Wrong implementation of right intent vs. right implementation of wrong intent — both are hallucination at different layers. SDD addresses the second. The spec is the testable artifact; the implementation is judged against it.

Implementations: [[Context Engineering Kit (NeoLabHQ)|SDD]], [[Compound Engineering Plugin|`/ce-brainstorm → /ce-plan → /ce-work`]], [[Superpowers (obra)|writing-plans → executing-plans]].

### 4. [[Hooks]] — the guardrail layer
Hallucinations that *can't reach the codebase* don't matter. Examples:
- [[claudekit (Carl Rannaberg)|check-any-changed]] — blocks TypeScript `any` (a common hallucination shortcut)
- [[claudekit (Carl Rannaberg)|file-guard]] — blocks sensitive file access
- [[Matt Pocock Skills|git-guardrails]] — blocks dangerous git commands
- [[Awesome Claude Code (hesreallyhim)|TDD Guard]] — blocks file writes that violate TDD order

The pattern: don't *hope* Claude won't do X; *prevent* Claude from doing X.

### 5. Two-stage subagent review ([[Superpowers (obra)|Superpowers SDD]])
Spec compliance review *before* code quality review. Catches "beautiful implementation of the wrong thing" — pure-execution hallucination. See [[Subagents]].

### 6. 6-aspect parallel review ([[claudekit (Carl Rannaberg)]])
Six subagents on the same diff, each with one concern (architecture, security, performance, testing, quality, docs). Prevents one agent from trading off concerns. Catches the hallucinations a single reviewer would normalize away.

### 7. Surfacing hidden assumptions
- **`/common-ground`** ([[Awesome Claude Code (hesreallyhim)|Fullstack Dev Skills]]) — explicitly surfaces Claude's assumptions about your project.
- **[[TACHES Claude Code Resources|TÂCHES `/consider:first-principles`]]** — request a specific reasoning lens.
- **Ask Claude to play back the spec in its own words before implementing.** Misalignment surfaces immediately.

### 8. [[Compound Engineering]] — the institutional learning layer
When a hallucination *does* slip through, capture the pattern (`/ce-compound`) so future sessions don't repeat. Without this, every fresh Claude makes the same mistakes.

### 9. [[Extended Thinking]] + [[Planning Mode]] for hard problems
On novel/complex problems, the model is more likely to confabulate. Extended thinking gives reasoning space; planning mode forces explicit decision-making. Pair on anything non-trivial.

### 10. [[Test Time Compute]] — multiple uncorrelated agents
Per [[Boris Cherny Tips Compendium|Boris]]: separate context windows beat single agents even with same model. Errors decorrelate across independent contexts. This is the structural reason 6-aspect parallel review ([[claudekit (Carl Rannaberg)]]) and two-stage subagent review ([[Superpowers (obra)]]) work.

### 11. [[12 Factor Agents (HumanLayer)|12 Factor Agent principles]]
Foundational principles that, applied at design time, structurally reduce hallucination opportunities:
- **Factor 3 (Own Your Context Window)** — engineer what reaches the model
- **Factor 7 (Contact Humans with Tool Calls)** — explicit human gates at decision points
- **Factor 9 (Compact Errors into Context)** — distill error info, don't dump raw stack traces
- **Factor 10 (Small, Focused Agents)** — narrow scopes catch errors broad scopes miss
- **Factor 12 (Stateless Reducer)** — pure function transformations are testable

### 12. [[Auto Mode]] classifier as a hallucination boundary
Auto Mode classifier blocks actions that escalate beyond what was asked, target unrecognized infrastructure, or appear hostile-content-driven. Even when Claude is hallucinating, the classifier catches scope escalation. Treat as a structural sieve.

### 13. [[Sandboxing]] limits damage of hallucinated commands
84% reduction in permission prompts internally at Anthropic. Even when Claude hallucinates a command, sandboxing limits what it can affect.

### 14. [[Verification Loops]] — the umbrella discipline
Per Anthropic best-practices: "Give Claude a way to verify its work — this is the single highest-leverage thing you can do." Per [[Boris Cherny Tips Compendium|Boris]]: "amplifies quality by 2-3x." Worth treating as the single most important defense layer. Full coverage: [[Verification Loops]].

### 15. Calibrated-confidence tagging on extracted information

Tools that extract or infer information should **expose their confidence**, not silently smooth it. When the agent or its tools refuse to bluff, downstream errors caught early. Two reference implementations:

- **EXTRACTED / INFERRED / AMBIGUOUS** ([[graphify (safishamsi)]]) — every edge in the knowledge graph is tagged at extraction time:
  - **EXTRACTED** = found directly in source (import, direct call, citation). Confidence 1.0.
  - **INFERRED** = reasonable deduction (call-graph traversal, semantic similarity). Confidence 0.0–1.0.
  - **AMBIGUOUS** = flagged for human review.
- **Confidence-scored impact analysis** ([[GitNexus (abhigyanpatwari)]]) — every edge in the impact graph carries a `confidence` score; `query` and `impact` MCP tools accept a `minConfidence` parameter; `rename` separates `graph_edits` (high confidence) from `text_search_edits` ("review carefully").

The general rule: **build calibration into the tool, not into the prompt.** Asking the model "are you confident?" is a fragile workaround; tagging confidence at extraction time is structural. Pattern applies anywhere the agent fetches information from a corpus, AST, or knowledge graph — the wiki should propagate this discipline outward to MCP server design.

### 16. One-shot rate as a measurable quality metric ([[CodeBurn (AgentSeal)]])

CodeBurn's per-task-category one-shot rate detects edit/test/fix retry cycles (`Edit → Bash → Edit` patterns) and reports the percentage of edit turns that succeeded **without retries**.

Why this is a hallucination defense:
- Retries indicate the first edit was wrong — a *measurable proxy for the model getting it right first try*.
- Per-category breakdown (Coding 90%, Debugging 60%, etc.) tells you *where* hallucinations cluster on your workload.
- Compared between models in `codeburn compare`, evidence-based: "Sonnet better at refactoring, Opus better at debugging" *on your code*, not on a benchmark.

Use it as the **post-hoc feedback loop** for layers 1–14. If you adopted TDD + Karpathy + claudekit and your one-shot rate didn't improve, the defenses aren't actually catching what you thought they were.

---

## Patterns from the deep-dives

### MAKER pattern ([[Context Engineering Kit (NeoLabHQ)]])
Clean-state launches + filesystem memory + multi-agent voting. Multiple agents on the same problem; consensus filters out individual hallucinations.

### Chain-of-Verification ([[Context Engineering Kit (NeoLabHQ)]])
Step-by-step validation. Each step's output verified before the next.

### FPF reasoning ([[Context Engineering Kit (NeoLabHQ)]])
Abduction-Deduction-Induction cycles with hypothesis competition and evidence-based trust scoring. Makes reasoning explicit and inspectable.

### Tree of Thoughts with pruning
Generate multiple candidate paths; prune unpromising branches. Reduces premature commitment to wrong directions.

---

## Specific Karpathy-named failure modes (with antidotes)

| Failure mode | Antidote |
|---|---|
| Wrong assumptions made silently | "Think Before Coding" + ask Claude to play back the spec |
| Doesn't manage confusion | "Stop when confused" rule in CLAUDE.md |
| Doesn't seek clarifications | Explicit prompt: "if unclear, ask before guessing" |
| Doesn't surface inconsistencies | TDD (test catches inconsistency) |
| Doesn't push back when should | "Push back when warranted" in CLAUDE.md |
| Overcomplicated code | "Simplicity First" + post-implementation review |
| Bloated abstractions | Same |
| Touching unrelated code | "Surgical Changes" + hook to block (claudekit's check-comment-replacement) |

---

## Anti-patterns (your own)

- **Trusting "I tested it" without seeing the test output** — the agent might be wrong about whether the test ran.
- **Skipping review on "trivial" changes** — trivial-looking changes are exactly where surgical-violation hallucinations slip in.
- **No verification step in your skills** — every skill that produces code should end with verification (run tests, check types, compile).
- **Fresh sessions for related work** — without context handoff, the new session may make different (and possibly conflicting) assumptions.
- **No `/common-ground` early in long sessions** — assumptions Claude formed at turn 1 propagate; surface them before building on them.

---

## A "stack of defenses" reading

If you only adopt three things, in order:
1. Install [[Andrej Karpathy Skills (forrestchang)|Karpathy's principles CLAUDE.md]] (5 minutes; lifelong value).
2. Adopt TDD as default for non-trivial work — install [[Superpowers (obra)|Superpowers]] or [[Matt Pocock Skills|Matt Pocock's `tdd`]] skill.
3. Install [[claudekit (Carl Rannaberg)|claudekit]] for the hook-enforced quality gates.

These three layer well. Karpathy gives discipline; TDD gives verification; claudekit gives hooks that catch what discipline + verification miss.

---

## Cross-references

- [[Karpathy Coding Principles]] · [[Test-Driven Development with Claude]] · [[Spec-Driven Development]] · [[Compound Engineering]]
- [[Hooks]] · [[Subagents]] · [[Extended Thinking]] · [[Planning Mode]]
- [[Context Engineering]] (related but distinct — context vs verification)
- Sources: [[Andrej Karpathy Skills (forrestchang)]] · [[Superpowers (obra)]] · [[claudekit (Carl Rannaberg)]] · [[Compound Engineering Plugin]] · [[Context Engineering Kit (NeoLabHQ)]] · [[Encyclopedia of Agentic Coding Patterns]] · [[Awesome Claude Code (hesreallyhim)]] (TDD Guard, /common-ground) · [[graphify (safishamsi)]] (calibrated-confidence tagging) · [[GitNexus (abhigyanpatwari)]] (confidence-scored impact + LLM-on-its-own-codebase guardrails) · [[CodeBurn (AgentSeal)]] (one-shot-rate metric)
