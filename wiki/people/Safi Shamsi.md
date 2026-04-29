---
type: person
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [people, practitioner, knowledge-graph, multimodal, skill-design, cross-platform]
---

# Safi Shamsi

Creator of [[graphify (safishamsi)|graphify]] — the multimodal knowledge-graph skill. One of the wiki's three foundational AST-graph contributors and the canonical reference for **15-platform-portable skill design**.

For our wiki, Safi matters because graphify is the existence proof that a single skill can install correctly on Claude Code, Codex, Gemini CLI, OpenCode, Cursor, Kiro, Antigravity, Aider, Trae, Hermes, OpenClaw, Copilot CLI, VS Code, and 2 more — without a separate codebase per platform.

## Key contributions

### Multimodal knowledge graphs (code + papers + images + video/audio)

Most knowledge-graph servers index only code. graphify indexes **mixed corpora** — code files, research papers, screenshots, video transcripts. The 7-stage pure-function pipeline (no embeddings; pure structural extraction) produces a single queryable graph across all media types. **71.5× token reduction** on a 52-file mixed corpus.

### EXTRACTED / INFERRED / AMBIGUOUS confidence tagging

Every edge in the graph is tagged at extraction time:
- **EXTRACTED** = found directly in source. Confidence 1.0.
- **INFERRED** = reasonable deduction. Confidence 0.0–1.0.
- **AMBIGUOUS** = flagged for human review.

The general pattern: **build calibration into the tool, not into the prompt.** Foundational for [[Reducing Hallucinations]] (defense #15).

### The 15-platform install matrix

graphify ships an install script that detects the host AI tool and configures platform-appropriate always-on plumbing:

- **Hook on**: Claude Code, Codex, Gemini CLI, OpenCode (these support hooks)
- **Rules file on**: Cursor (`.cursor/rules/*.mdc`), Kiro (`.kiro/steering/`), Antigravity (`.agents/rules/`), Aider, Trae, Hermes, OpenClaw, Antigravity for Web, Copilot CLI, VS Code

Same skill, 15 platforms, one install command. **Pattern**: `agentskills.io` skill format + platform-detection + platform-appropriate plumbing. See [[Skills]] for the framing.

### The Karpathy `/raw` folder as design target

graphify's README explicitly cites [[Andrej Karpathy|Karpathy's]] `/raw` folder workflow as the use case it serves: *"Andrej Karpathy keeps a `/raw` folder where he drops papers, tweets, screenshots, and notes. graphify is the answer to that problem."*

This wiki's `raw/` folder is a graphify-shaped corpus — could in principle be run on this very vault.

## Why this matters for our wiki

Safi's work demonstrates three patterns the wiki names elsewhere:

1. **Cross-platform skill portability** — the existence proof that `agentskills.io` skill format + platform-detection install scripts can target the entire AI-coding-tool landscape from one source. See [[Skill Building#15-platform skill-portability pattern]].
2. **Multimodal knowledge graphs** — distinct from code-only AST-graph servers. Adds papers/images/video as first-class graph nodes. See [[Agentic Search vs RAG]].
3. **Structural confidence tagging** — calibration as a *tool design* concern, not a prompt concern.

## Cross-references

- [[graphify (safishamsi)]] — the canonical source page
- [[Skills]] · [[Skill Building]] (15-platform portability)
- [[Reducing Hallucinations]] (calibrated-confidence defense layer)
- [[Agentic Search vs RAG]] (multimodal AST-graph)
- [[Andrej Karpathy]] (the `/raw` folder pattern as design target)
- [[Model Context Protocol]] (multimodal MCP)
- [[Token Efficiency]] (AST graphs as compression layer 2)
