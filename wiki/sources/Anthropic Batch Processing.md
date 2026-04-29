---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, batch-processing, cost-optimization, async]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/build-with-claude/batch-processing
---

# Anthropic Batch Processing

The Message Batches API — Anthropic's async-processing pattern. **50% cost reduction** for non-realtime work. **Not** ZDR-eligible.

For our wiki, this matters for: agent SDK builders running large evaluations, CI/CD pipelines, anywhere you trade latency for cost.

## What it does

> "The Message Batches API is a powerful, cost-effective way to asynchronously process large volumes of Messages requests... most batches finishing in less than 1 hour while reducing costs by 50% and increasing throughput."

Submit N requests in a batch; receive a `message_batch_id`; poll for status; retrieve results when all finished.

## When it's right

- **Large-scale evaluations** — thousands of test cases (per [[Foundational Papers|SWE-bench]] runs, model comparisons)
- **Content moderation** — high-volume async classification
- **Data analysis** — generating insights/summaries for large datasets
- **Anywhere immediate response isn't required**

## When to skip

- Real-time user interaction (latency unacceptable)
- Anything requiring streaming
- Single one-off requests (overhead not worth the discount)

## Cost framing

The 50% discount is the headline; what's less obvious is the throughput effect. Your effective rate limit goes up because batched requests bypass the per-second sync RPM cap. For agent harnesses doing large parallel evaluations (per [[Multi-Agent Orchestration|wave-based parallelization]]), batch is often the right primitive.

## Beta features available in Batch

The Models Overview docs note: Opus 4.7, Opus 4.6, and Sonnet 4.6 support **up to 300k output tokens** in batch via `output-300k-2026-03-24` beta header — significantly higher than the synchronous max output. Useful for long-form analysis batches.

## Where this lands in the wiki

- **[[Cost Observability Playbook]]** — the 50% async discount is one of the highest-leverage cost levers when applicable. Section: when total spend justifies async patterns.
- **[[Multi-Agent Orchestration]]** — wave-based parallelization across many agents on independent tasks fits the batch shape natively.
- **[[Agent SDK]]** (when written) — batch is the canonical primitive for offline evaluation harnesses.
- **[[Foundational Papers]]** (when written) — running SWE-bench / Terminal-Bench at scale uses batch.

## API contract overview

The full batch lifecycle (submit → poll → retrieve → delete) is documented at the source URL. Key shape: each batch contains a list of `requests`, each with a `custom_id` so you can correlate responses back. Anthropic's [batch API reference](https://platform.claude.com/docs/en/api/creating-message-batches) has the full schema.

## Cross-references

- [[Cost Observability Playbook]] (50% discount as cost lever)
- [[Multi-Agent Orchestration]] (batch as wave-based primitive)
- [[Anthropic Tool Use Overview]] (batch supports tool use)
- [[Anthropic Models Overview]] (batch-only 300k-token output beta)
