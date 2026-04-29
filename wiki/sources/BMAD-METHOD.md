---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, agile, methodology, framework, scale-adaptive]
source_url: https://github.com/bmad-code-org/BMAD-METHOD
source_author: BMad Code, LLC
license: MIT
---

# BMAD-METHOD

Open-source agile-AI-driven-development framework with **scale-domain-adaptive intelligence** — automatically adjusts planning depth based on project complexity. 46k stars per [[shanraisshan Claude Code Best Practice|shanraisshan]]. Anti-paywall ethos.

The pitch: AI shouldn't "do the thinking for you." BMAD provides facilitated workflows grounded in agile best practices, with AI as expert collaborator.

## Distinctive contributions

### Scale-adaptive planning
Project complexity automatically determines planning depth. Avoids over-engineering simple tasks while ensuring rigor for complex ones. Most frameworks apply uniform depth; BMAD adapts.

### 12+ specialized agent personas
Project Manager, Architect, Developer, UX, etc. Each functions as a "domain expert." **Party Mode** runs multiple agents simultaneously for cross-discipline review.

### 34+ core workflows
Cover analysis, planning, architecture, implementation across the full SDLC.

### Specialized modules
- **Test Architect** — risk-based testing
- **Game Dev Studio** — game-specific workflows
- **Creative Intelligence Suite** — creative project workflows

## Key commands

- `bmad-help` — workflow guidance ("what should I do next?")
- `bmad-create-prd` — Product Requirements Document creation
- (plus the 34+ workflow commands)

## Installation

```bash
npx bmad-method install   # interactive
# CI/CD: non-interactive flag available
```

Requires Node.js v20+, Python 3.10+, UV package manager. Integrates with Claude Code, Cursor, others.

## License

MIT, no paywalls or gated content. Author explicitly rejects monetized gatekeeping: "We believe in empowering everyone, not just those who can pay for a gated community or courses."

## Why this matters for our wiki

BMAD's distinctive idea is **scale-adaptive planning** — a meta-level adjustment that other frameworks lack. Most SDD frameworks apply the same multi-phase structure regardless of task size; BMAD scales the rigor up or down based on detected complexity. Worth folding into [[Spec-Driven Development]] as a refinement: SDD shouldn't be uniform; calibrate by complexity.

The **Party Mode** (multiple agents collaborating in real-time, surfacing architectural contradictions) is the BMAD analog of [[claudekit (Carl Rannaberg)|claudekit's 6-aspect parallel review]] and [[Boris Cherny Tips Compendium|Boris's test time compute]] insight — same principle, different operationalization.

The 34+ workflows make BMAD heavyweight for small projects. Best for teams adopting structured agile-AI processes at scale.

Cross-references: [[Spec-Driven Development]] · [[Subagents]] · [[Compound Engineering]] · [[Test Time Compute]] · [[Claude Code Ecosystem]]
