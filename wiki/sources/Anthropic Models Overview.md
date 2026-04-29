---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, models, opus, sonnet, haiku, model-selection]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/about-claude/models/overview
---

# Anthropic Models Overview

The canonical model-selection reference. As of April 2026: **Opus 4.7, Sonnet 4.6, Haiku 4.5** are current GA; **Mythos Preview** is research preview (Project Glasswing, invitation-only).

For our wiki, this is the operational reference for which model to pick for which workload — currency matters because deprecation timelines bite.

## Current GA models

| Feature | **Opus 4.7** | **Sonnet 4.6** | **Haiku 4.5** |
|---|---|---|---|
| Description | Most capable; step-change in agentic coding vs 4.6 | Best speed/intelligence combo | Fastest, near-frontier |
| API ID | `claude-opus-4-7` | `claude-sonnet-4-6` | `claude-haiku-4-5-20251001` |
| Pricing per MTok | $5 / $25 | $3 / $15 | $1 / $5 |
| Extended thinking | **No** (adaptive only) | Yes | Yes |
| Adaptive thinking | **Yes** (required) | Yes | No |
| Latency | Moderate | Fast | Fastest |
| Context window | **1M** | 1M | 200k |
| Max output | 128k | 64k | 64k |
| Reliable knowledge cutoff | Jan 2026 | Aug 2025 | Feb 2025 |
| Training data cutoff | Jan 2026 | Jan 2026 | Jul 2025 |

> **Default**: "If you're unsure which model to use, consider starting with Claude Opus 4.7 for the most complex tasks. It is our most capable generally available model, with a step-change improvement in agentic coding over Claude Opus 4.6."

The Opus 4.7 step-change is real and Anthropic-stated. For agentic coding specifically, this is the model the wiki's pages (e.g. [[Boris Cherny Tips Compendium]] Apr 6 tips) target.

## Mythos Preview (Project Glasswing)

Research preview model, invitation-only, focused on **defensive cybersecurity workflows**. Not self-serve. Mentioned across multiple Tier 3 docs (Compaction, Tool Search) as a supported model. Worth knowing it exists; not commonly accessible.

## Legacy models (still available)

| Model | API ID | Status |
|---|---|---|
| Opus 4.6 | `claude-opus-4-6` | GA (legacy; consider migrating to 4.7) |
| Sonnet 4.5 | `claude-sonnet-4-5-20250929` | GA (legacy) |
| Opus 4.5 | `claude-opus-4-5-20251101` | GA (legacy) |
| Opus 4.1 | `claude-opus-4-1-20250805` | GA (legacy; **$15/$75 — 3× current Opus pricing**) |
| **Sonnet 4** | `claude-sonnet-4-20250514` | **Deprecated; retires June 15, 2026** |
| **Opus 4** | `claude-opus-4-20250514` | **Deprecated; retires June 15, 2026** |

**Critical migration window**: Sonnet 4 + Opus 4 retire June 15, 2026. Migrate to 4.6 / 4.7 before then.

## Per-model context window summary

- **Opus 4.7**: 1M tokens (uses a *new tokenizer* — ~555k words / 2.5M unicode chars)
- **Sonnet 4.6**: 1M tokens (~750k words / 3.4M unicode chars)
- **Haiku 4.5**: 200k tokens (~150k words / 680k unicode chars)
- Legacy 4.x: mostly 200k except Opus 4.6 which is 1M

The Opus 4.7 *new tokenizer* is operationally relevant: the wiki's previous "300-400k context rot zone" claim from [[Thariq Anthropic Skills + Sessions|Thariq]] was based on the prior tokenizer. Worth re-checking on Opus 4.7.

## Endpoint variations (Bedrock / Vertex)

Starting with **Sonnet 4.5 and all subsequent models**:
- **AWS Bedrock**: global endpoints (dynamic routing, max availability) + regional endpoints (specific geographic regions)
- **Vertex AI**: global + multi-region + regional endpoints

Use case: regulatory / data residency constraints often force regional endpoints, which can affect cost and latency.

## Batch API extended output

Per the [[Anthropic Batch Processing|Batch API docs]]: Opus 4.7, Opus 4.6, and Sonnet 4.6 support **300k output tokens** via `output-300k-2026-03-24` beta header — substantially higher than synchronous max output. Useful for long-form analysis batches.

## Model selection guidance

The official "what to pick when" framing:

| Workload | Recommended |
|---|---|
| Most complex agentic coding | **Opus 4.7** (step-change vs 4.6) |
| Speed/intelligence balance | **Sonnet 4.6** |
| Latency-critical / throughput-critical | **Haiku 4.5** |
| Migration target from older 4.x | Sonnet → 4.6, Opus → 4.7 |
| Cost-conscious + still-capable | Sonnet 4.6 ($3/$15 vs Opus 4.7's $5/$25) |
| Defensive security research | Mythos Preview (invite-only) |

For [[Multi-Agent Orchestration]]: the wiki's canonical pattern is Opus main agent + Haiku Explore subagents (per [[Thariq - Prompt Caching Is Everything|Thariq]]) — preserves the Opus cache while running cheap research in subagents.

## Where this lands in the wiki

- **[[Extended Thinking]]** — Opus 4.7 requires adaptive (no manual)
- **[[Prompt Caching]]** — model-pricing context for the "switching mid-session is expensive" math
- **[[Cost Observability Playbook]]** — pricing baselines for cost analysis; the Opus 4.1 → 4.7 cost drop ($15/$75 → $5/$25) is worth flagging
- **[[Multi-Agent Orchestration]]** — Opus + Haiku-subagent pattern is grounded in the price/latency table
- **[[Subagents]]** — different-model-per-subagent decisions reference this table

## Cross-references

- [[Extended Thinking]] · [[Prompt Caching]] · [[Multi-Agent Orchestration]] · [[Subagents]]
- [[Cost Observability Playbook]] (pricing baselines)
- [[Anthropic Extended Thinking API]] (adaptive vs manual per model)
- [[Anthropic Batch Processing]] (300k output beta on Opus 4.7/4.6 + Sonnet 4.6)
- [[Boris Cherny Tips Compendium]] (Apr 6 Opus 4.7 tips)
