---
type: concept
created: 2026-04-26
updated: 2026-04-26
sources: 4
tags: [claude-code, planning-mode, primitive, reasoning, plan-first]
---

# Planning Mode

A Claude Code mode that **forces a plan-first workflow**: Claude produces a complete plan and presents it for approval before any code is written or modified. Approved plans then execute; rejected ones get revised.

The right tool for non-trivial implementations where the *approach* matters as much as the result.

## Design choice: state-as-tools, not state-as-config

Per [[Thariq - Prompt Caching Is Everything|Thariq's "Prompt Caching Is Everything"]]:

The intuitive (wrong) approach would be: when user enters plan mode, swap out tool set to read-only.

> "But that would break the cache."

The actual design:
- **Keep all tools in the request at all times**
- Use `EnterPlanMode` and `ExitPlanMode` **as tools themselves**
- When user toggles, agent gets system message ("you're in plan mode; explore but don't edit; call ExitPlanMode when done")
- **Tool definitions never change**

Bonus: because EnterPlanMode is a callable tool, **the model can autonomously enter plan mode** when it detects a hard problem — without breaking cache.

This is the canonical example in the wiki of **state-as-tools** rather than state-as-config-changes. Pattern generalizes: model state transitions should be tools, not tool-set modifications. See [[Token Efficiency|cache stability]] for why.

## Activation

- **Manual**: enter via the `EnterPlanMode` tool (Claude triggers when appropriate) or via the `plan` permission mode at session start.
- **Automatic**: Claude can decide to enter planning mode for complex tasks. Per [[Claude Code System Prompts (Piebald)]], the Plan agent has its own enhanced system prompt.
- **Forced**: set permission mode to `plan` so Claude *must* present a plan before modifying anything.

## What planning mode produces

A structured plan typically including:
- Goal and success criteria
- Approach (architectural choices, tradeoffs)
- File-level changes (which files, what changes)
- Order of operations
- Verification steps

The user approves, rejects, or asks for revisions. Approved plans are then executed step-by-step.

## When to use

- **Multi-file changes** where order matters
- **Refactors** with cross-cutting impact
- **New features** with architectural choices to settle
- **Anything where the *approach* is the harder problem than the *implementation***

When *not* to use:
- Trivial edits, typo fixes, single-line changes
- Exploratory work where the goal isn't clear yet (use a [[Slash Commands|prime command]] or general conversation first)

## Patterns from the deep-dives

### "80% planning, 20% execution" ([[Compound Engineering Plugin]])
EveryInc's claim. Pair planning mode with their `/ce-plan` skill for structured planning that feeds into execution. The principle: invest heavily in planning, then execute mechanically.

### Bite-sized tasks per plan step ([[Superpowers (obra)|writing-plans]])
Plan steps should be 2–5 minutes of work each, with explicit file paths and verification steps. Smaller steps = lower risk per step + better recovery on failure.

### Spec-Driven Development ([[Context Engineering Kit (NeoLabHQ)|SDD]] and [[Spec-Driven Development]])
Planning mode is the right execution surface for spec-driven workflows. The plan is the spec; execution must conform.

### Two-stage review of plans ([[Superpowers (obra)|Superpowers]])
Validate the *spec* before validating the *implementation*. Planning mode + a "review the plan" subagent gives you this naturally.

## Planning mode and reasoning

Planning mode often pairs with [[Extended Thinking]] — the planning step is exactly when deeper reasoning pays off. Per [[claudekit (Carl Rannaberg)|claudekit's thinking-level hook]], you can have hooks adjust reasoning depth specifically for planning steps.

## Anti-patterns

- **Skipping the plan and asking Claude to "just do it"** — for non-trivial work, this drops the most valuable safeguard.
- **Approving a plan you didn't read** — planning mode is only useful if the plan is reviewed. Speed-approval defeats the purpose.
- **Too-coarse plan steps** — "implement the feature" is not a plan. Steps should be 2–5 minutes each per [[Superpowers (obra)|Superpowers]].
- **Planning mode for trivial work** — adds friction without value. Reserve for the cases where it pays off.

## What planning mode is *not*

- Not [[Extended Thinking]] (which is a reasoning *depth* control; planning mode is a *workflow* mode)
- Not [[Checkpoints]] (which let you rewind execution; planning mode prevents the wrong execution)
- Not [[Hooks]] (which run on events; planning mode is a major mode of operation)

## Cross-references

- [[Extended Thinking]] · [[Slash Commands]] · [[Subagents]]
- [[Spec-Driven Development]] · [[Reducing Hallucinations]] · [[Compound Engineering]]
- Sources: [[Claude HowTo (luongnv89)]] (mechanics) · [[Compound Engineering Plugin]] (`/ce-plan`) · [[Superpowers (obra)]] (writing-plans skill) · [[Claude Code System Prompts (Piebald)]] (Plan agent's prompt)
