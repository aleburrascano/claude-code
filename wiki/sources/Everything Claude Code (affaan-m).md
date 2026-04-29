---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, framework, performance-optimization, instinct-learning, security]
source_path: raw/repos/affaan-m-everything-claude-code.md
source_date: 2026-04-26
source_author: Affaan Mustafa
source_url: https://github.com/affaan-m/everything-claude-code
---

# Everything Claude Code (affaan-m)

The "agent harness performance optimization system" by [[Affaan Mustafa]] (Anthropic Hackathon Winner). 140k+ stars, 21k+ forks, 170+ contributors. Cross-platform (Claude Code, Codex, Cursor, OpenCode, Gemini, Antigravity).

ECC (Everything Claude Code) ships **48 agents, 156 skills, 72 legacy command shims, hooks, multi-language rules, MCP configs, dashboards, and a security auditor**. It's framed explicitly as a *harness performance system*, not just a config pack.

## What's distinctive (vs other heavy frameworks)

### 1. Continuous Learning v2 (instinct-based) — the headline feature
Auto-extracts patterns from sessions into reusable skills with **confidence scoring**. Workflow:

- `/instinct-status` — view learned instincts with confidence scores
- `/instinct-import <file>` — import instincts from others
- `/instinct-export` — export your instincts for sharing
- `/evolve` — cluster related instincts into skills
- `/prune` — delete expired pending instincts
- `/skill-create` — analyze git history to generate SKILL.md files

This is the most mature implementation of [[Continuous Learning]] in the ecosystem. Conceptually adjacent to [[Compound Engineering|`/ce-compound`]] and [[TACHES Claude Code Resources|`/heal-skill`]] but operates at a different layer (sessions → instincts → skills).

### 2. Memory persistence + strategic compaction
- `memory-persistence/` hooks — SessionStart/SessionEnd/PreCompact for state save/load
- `strategic-compact/` skill — manual compaction suggestions with directional hints (matches [[Token Efficiency|the wiki's compact-with-hint principle]])
- `iterative-retrieval/` skill — progressive context refinement for [[Subagents]] (the canonical [[Iterative Retrieval]] pattern)

### 3. AgentShield security auditor
1282 tests, 102 static-analysis rules, 5 categories: secrets detection (14 patterns), permission auditing, hook injection analysis, MCP server risk profiling, agent config review.

`--opus` flag runs three Claude Opus 4.6 agents in **red-team / blue-team / auditor** pipeline. Adversarial reasoning, not just pattern matching. Output: terminal (A-F graded), JSON for CI, Markdown, HTML. Exit code 2 on critical findings for build gates.

```
npx ecc-agentshield scan          # quick scan
npx ecc-agentshield scan --fix    # auto-fix safe issues
npx ecc-agentshield scan --opus   # deep adversarial analysis
```

### 4. Multi-language rules architecture
Rules organized as `rules/common/` + `rules/<language>/` (TypeScript, Python, Go, Swift, PHP, Java, Rust, Kotlin, C++, Perl). Install only the languages you need. **Multi-language rules architecture is novel** — most frameworks lump rules together.

### 5. Hook runtime controls
Without editing files: `ECC_HOOK_PROFILE=minimal|standard|strict` and `ECC_DISABLED_HOOKS=...`. Per-session hook tuning.

### 6. Harness audit
`/harness-audit`, `/loop-start`, `/loop-status`, `/quality-gate`, `/model-route` — measure your harness performance and tune.

### 7. NanoClaw v2
Model routing, skill hot-load, session branch/search/export/compact/metrics. The runtime control plane.

### 8. ECC 2.0 alpha (Rust control plane)
In `ecc2/`. Builds locally; commands: dashboard, start, sessions, status, stop, resume, daemon. Direction of travel: standalone runtime.

## Skill catalog (highlights for our focus)

ECC ships ~156 skills. The ones most directly relevant to our wiki's focus:

- **continuous-learning-v2/** — the instinct system
- **iterative-retrieval/** — progressive context refinement for subagents
- **strategic-compact/** — manual compaction with hints
- **search-first/** — research-before-coding workflow
- **skill-stocktake/** — audit skills/commands for quality (parallel to [[TACHES Claude Code Resources|TÂCHES skill-auditor]])
- **eval-harness/** — verification loop evaluation
- **verification-loop/** — continuous verification
- **autonomous-loops/** — sequential pipelines, PR loops, DAG orchestration ([[Ralph Wiggum Technique]] variants)
- **plankton-code-quality/** — write-time code quality enforcement with hooks
- **cost-aware-llm-pipeline/** — LLM cost optimization, model routing, budget tracking ([[Token Efficiency]])
- **regex-vs-llm-structured-text/** — decision framework: regex vs LLM for text parsing
- **content-hash-cache-pattern/** — SHA-256 content hash caching for file processing

Plus ~140 framework-specific skills (Django, Laravel, Spring Boot, NestJS, NextJS, etc.).

## Operational patterns from the README

### MCP discipline
> "Too many MCP servers eat your context. Each MCP tool description consumes tokens from your 200k window, potentially reducing it to ~70k."

> "Keep under 10 MCPs enabled and under 80 tools active."

This matches [[Token Efficiency]] guidance and the [[Claude Code Tips (ykdojo)|ykdojo lazy-load principle]] — strong consensus.

### Plugin install vs manual install
ECC has different install paths and **explicitly warns** against running both (duplicate skills + duplicate runtime behavior). Plugin install path: `/plugin install everything-claude-code@everything-claude-code` and **manually copy only `rules/`** (Claude Code plugins can't distribute rules per upstream limitation).

### Multi-platform packaging
First-class support for Claude Code, Cursor, OpenCode, Codex (app + CLI), Antigravity, Gemini CLI. The `.cursor/hooks/adapter.js` pattern is notable: transforms Cursor's stdin JSON to Claude Code's format, allowing shared `scripts/hooks/*.js` across platforms. **DRY pattern for cross-harness hook portability.**

## Naming caveat

ECC has three identifiers, intentionally not interchangeable:
- GitHub source: `affaan-m/everything-claude-code`
- Marketplace plugin: `everything-claude-code@everything-claude-code`
- npm package: `ecc-universal`

## My assessment

ECC is the most **production-mature** framework in the wiki's coverage. Three things stand out:

1. **The instinct system is the most concrete answer** to "how does my Claude Code setup get smarter over time?" Pair with [[Compound Engineering]] (cycle-level) — both layers contribute.

2. **AgentShield's red-team/blue-team/auditor** pipeline is genuinely novel for security tooling — adversarial reasoning, not pattern matching. Worth understanding even if you don't use it.

3. **The multi-language rules architecture** is a small idea with big consequences. "Install only the languages you need" should be the default; most projects hit ~3 languages and pay for irrelevant rules in the rest.

Caveats:
- Heavy. 48 agents + 156 skills is a *lot*. Selective install matters; the manifest-driven `install-plan.js` / `install-apply.js` is there for that reason.
- Plugin/manual install confusion is a recurring issue (see #29, #52, #103). Read setup carefully.

Pair with: [[Superpowers (obra)]] (skill design discipline) · [[Compound Engineering Plugin]] (institutional learning at cycle level) · [[claudekit (Carl Rannaberg)]] (subagent guardrails).

Cross-references: [[Affaan Mustafa]] · [[Continuous Learning]] · [[Iterative Retrieval]] · [[Token Efficiency]] · [[Subagents]] · [[Hooks]] · [[Memory]] · [[Claude Code Ecosystem]]
