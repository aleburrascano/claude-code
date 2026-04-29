---
type: source
created: 2026-04-26
updated: 2026-04-26
sources: 1
tags: [claude-code, plugin, memory, hooks, context-persistence]
source_path: raw/repos/thedotmack-claude-mem.md
source_date: 2026-04-26
source_author: Alex Newman (thedotmack)
source_url: https://github.com/thedotmack/claude-mem
license: AGPL-3.0
---

# claude-mem (thedotmack)

Persistent memory compression system for Claude Code. **Automatically captures everything Claude does during sessions, compresses it with AI (using Claude Agent SDK), and injects relevant context back into future sessions.**

A direct, plugin-shaped answer to one of the central problems for Claude Code mastery: *cross-session amnesia*. The agent forgets what happened last session unless you tell it; claude-mem solves that automatically.

## How it works

### Five lifecycle hooks
- **SessionStart** — load relevant context from prior sessions
- **UserPromptSubmit** — inject context relevant to the current prompt
- **PostToolUse** — capture observations from tool usage
- **Stop** — generate summaries
- **SessionEnd** — finalize storage

### Worker service
HTTP API on port 37777 with web viewer UI at `localhost:37777`. Managed by Bun (auto-installed). Provides 10 search endpoints.

### Storage layer
- **SQLite database** — sessions, observations, summaries
- **Chroma vector database** — hybrid semantic + keyword search

### MCP search tools (3-layer workflow)
The headline pattern for token-efficient memory retrieval:

```
1. search          — get compact index with IDs (~50-100 tokens/result)
2. timeline        — chronological context around interesting results
3. get_observations — full details ONLY for filtered IDs (~500-1,000 tokens/result)
```

> "~10x token savings by filtering before fetching details."

This is a **canonical example of progressive disclosure** at the MCP-tool level. Same principle as [[Skills|the 500-line rule]] for skills, applied to memory retrieval. See [[Token Efficiency]].

### mem-search skill
Natural language queries with progressive disclosure. Uses the 3-layer workflow above.

## Configuration

`~/.claude-mem/settings.json` controls:
- AI model for summarization
- Worker port
- Data directory
- Log level
- Context injection settings (granular control over what gets injected)
- `CLAUDE_MEM_MODE` — workflow + language (e.g., `code`, `code--zh`, `code--ja`)

Privacy: `<private>` tags exclude content from storage.

## Beta — Endless Mode

"Biomimetic memory architecture for extended sessions." Switch via web viewer UI → Settings.

## Cross-platform

- Claude Code (`/plugin marketplace add thedotmack/claude-mem` then `/plugin install claude-mem`)
- Gemini CLI (`npx claude-mem install --ide gemini-cli`)
- OpenCode (`npx claude-mem install --ide opencode`)
- OpenClaw gateway (`curl -fsSL https://install.cmem.ai/openclaw.sh | bash`)
- Claude Desktop skill (search memory from Desktop conversations)

## Notable design choices

### Progressive disclosure at the MCP layer
The 3-layer search→timeline→get_observations pattern is **architectural progressive disclosure** — search is cheap (~50-100 tokens/result), full fetch is expensive, and you only pay for the expensive layer on filtered results. Generalizable beyond memory: any MCP tool that returns large data should consider this 3-layer shape.

### Privacy-first
`<private>` tags let you mark content that shouldn't be stored. Important escape valve for any always-on capture system.

### Citations
References past observations with IDs (`http://localhost:37777/api/observation/{id}`) — observations become *citable*, not just *summarizable*. Important for traceability.

### Real-time observation feeds
Optional integration with Telegram, Discord, Slack. Useful for team-shared observations or for personal "what did I do today" review.

## Author

Alex Newman ([@thedotmack](https://github.com/thedotmack)). Active community ([@Claude_Memory](https://x.com/Claude_Memory) on X, Discord). Built with Claude Agent SDK; powered by Claude Code.

## License

**AGPL-3.0** (more restrictive than the typical MIT). Network deployment requires source disclosure; derivative works must be AGPL-3.0. Worth noting if Alessandro plans to deploy as a service.

Subdirectory `ragtime/` is **PolyForm Noncommercial 1.0.0** — non-commercial use only.

## My assessment

claude-mem is the most plug-and-play answer in the ecosystem to **persistent memory across sessions**. Three things make it notable:

1. **It's automatic.** Most memory systems require explicit "save this" actions. claude-mem captures everything via lifecycle hooks. Lower friction = more actually-saved memory.

2. **The 3-layer search workflow is a generalizable pattern.** Any MCP tool returning verbose data should follow this shape. Worth lifting beyond memory.

3. **Vector + keyword hybrid search via Chroma.** Most simpler memory systems are pure-text-search. Hybrid scales better as the memory base grows.

Caveats:
- AGPL-3.0 license matters for commercial deployment.
- Worker service + SQLite + Chroma + Bun is a real install footprint. Not lightweight.
- Auto-capture means "everything" is captured by default — privacy via `<private>` tags is opt-in, not opt-out. Consider what's in your sessions before installing.
- Be wary of the $CMEM token references at the bottom of the README — that's a third-party Solana token "officially embraced" by the author. Not part of the technical functionality but worth noting that the project sits adjacent to crypto-token social dynamics.

For Alessandro: this is the canonical solution to the cross-session memory problem unless you have specific reasons to roll your own (e.g., custom storage, tighter integration with Obsidian for this wiki). Pair with the wiki's [[Memory|CLAUDE.md]] approach — claude-mem captures *what happened*, CLAUDE.md captures *what should always be true*.

Cross-references: [[Memory]] · [[Hooks]] · [[Model Context Protocol]] · [[Token Efficiency]] · [[Context Engineering]] · [[Skill Building]] · [[Claude Code Ecosystem]]
