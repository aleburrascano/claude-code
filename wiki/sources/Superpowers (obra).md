---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, skills, methodology, sdlc, subagents]
source_url: https://github.com/obra/superpowers
source_author: Jesse Vincent (obra)
license: MIT
---

# Superpowers (obra)

A composable skills framework + software development methodology by [[Jesse Vincent]]. Designed to guide coding agents through structured workflows for autonomous, hours-long development sessions. Exemplary study material for skill design and SDLC workflow scaffolding.

## Skills, organized by SDLC phase

### Design & Planning
- **brainstorming** — Socratic refinement of rough ideas via targeted questions; presents design in digestible sections for validation.
- **writing-plans** — Decomposes approved designs into bite-sized tasks (2–5 minutes each) with explicit file paths and verification steps.

### Implementation
- **test-driven-development** — Enforces RED-GREEN-REFACTOR with anti-patterns reference. See [[Test-Driven Development with Claude]].
- **subagent-driven-development** — Dispatches fresh subagents per task with two-stage review (spec compliance, then code quality). The flagship pattern of this framework.
- **executing-plans** — Batch execution with human checkpoints between task groups.
- **using-git-worktrees** — Creates isolated workspaces on feature branches with clean test baselines.

### Quality & Collaboration
- **systematic-debugging** — Four-phase root-cause analysis with defense-in-depth and condition-based waiting techniques.
- **requesting-code-review** — Pre-review checklist against implementation plan.
- **receiving-code-review** — Framework for responding to feedback.
- **verification-before-completion** — Ensures fixes are validated before declaring success.
- **finishing-a-development-branch** — Decision workflow for merge/PR/cleanup.

### Meta
- **writing-skills** — Best-practices guide for creating new skills with testing methodology. (Pair with `mattpocock/skills/write-a-skill` and TACHES's create-skills meta-skill.)
- **using-superpowers** — Introduction to the skills system itself.

## Notable techniques

### Subagent-driven development
Independent subagents handle individual tasks with **automated peer review**, replacing monolithic context continuity. Two-stage review separates **spec validation** from **code quality** — critical because validating against the spec first prevents implementing flawed designs cleanly. Without that separation, a beautiful implementation of the wrong thing passes review.

### "Mandatory workflows, not suggestions"
Skills are designed to **trigger automatically based on context**, not require explicit invocation. The activation logic lives in the skill itself, not in user discipline. See also [[Claude Code Infrastructure Showcase (diet103)]] for an implementation of the same idea via [[Hooks]].

### Bite-sized tasks
Plans get decomposed into units small enough that *judgment is removed from execution*. The author's framing: tasks should be "clear enough for an enthusiastic junior engineer with poor taste, no judgement" to follow. This intentionally pushes judgment back to the planning phase, where the human can intervene.

### Disciplined complexity reduction
- **Explicit rejection of YAGNI** — counterintuitively, the framework wants you to think ahead, not skip ahead. Combined with bite-sized tasks, the result is *plan thoroughly, execute mechanically*.
- **Strict RED-GREEN-REFACTOR** — no TDD shortcuts.
- **Systematic debugging over guessing** — four-phase process rather than flailing.

## Design philosophy

The "Superpowers" framing reflects empowering agents through scaffolding: providing systematic processes, review mechanisms, and verification checkpoints that transform raw capability into reliable output. The author's bet is that **judgment-free task execution + judgment-rich planning** outperforms judgment-mixed execution.

This dovetails with [[Karpathy Coding Principles|Karpathy's "Goal-Driven Execution"]] — strong success criteria let the model loop independently. Superpowers is the operationalization of that idea at framework scale.

## Installation

Multiple platforms supported:
- **Claude Code official marketplace**: `/plugin install superpowers@claude-plugins-official`
- **Cursor**: `/add-plugin superpowers`
- **OpenAI Codex CLI/App**, **OpenCode**, **GitHub Copilot CLI**, **Gemini CLI** — all marketplace-based.

## Author

[[Jesse Vincent]] (obra), founder of Prime Radiant. Active open-source sponsorship program; community engagement via Discord and GitHub.

## My assessment

The most valuable thing in this repo is the **subagent-driven-development pattern with two-stage review**. Spec-then-quality separation is non-obvious and almost always missing in DIY subagent setups. Worth extracting that pattern even if you don't adopt the rest of the framework.

The "writing-skills" meta-skill is also high-value as a study artifact — read it alongside Matt Pocock's `write-a-skill` and TACHES's create-agent-skills to triangulate what the community considers good skill design.

Caveat on the explicit YAGNI rejection: it's right *in this framework*, where planning is heavy and execution is mechanical. It would be wrong in a quick-prototype context. Apply judgment based on session type.

Cross-references: [[Jesse Vincent]] · [[Skills]] · [[Subagents]] · [[Skill Building]] · [[When to Delegate to Subagents]] · [[Test-Driven Development with Claude]] · [[Claude Code Ecosystem]]
