---
type: concept
created: 2026-04-26
updated: 2026-04-27
sources: 6
tags: [claude-code, mcp, primitive, external-tools, integration]
aliases: [MCP]
---

# Model Context Protocol

An open protocol (developed by Anthropic) for connecting LLMs to external tools and data sources. In Claude Code, **MCP servers** expose capabilities to the Claude agent — file systems, databases, GitHub, custom services — as tools the model can call.

The role: MCP is how Claude Code grows beyond its built-in tools without modifying the host.

## Mental model

| Claude Code primitive | What it is |
|---|---|
| Built-in tools | Read, Write, Edit, Bash, Grep, etc. — shipped with Claude Code |
| **MCP servers** | **External processes that expose more tools** |
| [[Subagents]] | Isolated agent contexts that may use tools |
| [[Skills]] | Capabilities that may invoke tools |

MCP servers run as separate processes. Claude Code talks to them via JSON-RPC over stdio (or HTTP for remote servers). Each server registers a set of tools; Claude can call those tools like any built-in.

## Configuration

Two paths:

### CLI (recommended for one-offs)
```
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

Stores in user MCP config.

### Project `.mcp.json`
Manual config file checked into the repo for team-shared MCP servers.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "..." }
    }
  }
}
```

## Common MCP servers

From [[Claude HowTo (luongnv89)]] examples:
- **github-mcp** — repo, issue, PR operations via the GitHub API
- **database-mcp** — SQL queries (Postgres, etc.)
- **filesystem-mcp** — file operations beyond the workspace
- **multi-mcp** — pattern for combining several

From [[Awesome Claude Code (hesreallyhim)|the awesome list]]:
- **VoiceMode MCP** — push-to-talk speech transcription
- **stt-mcp-server-linux** — local STT via Whisper, no external API
- **claude-code-mcp-enhanced** (grahama1970) — extends Claude with MCP-side detailed instructions, testing, compliance checks

From the wiki's deep-dives:
- **[[claude-mem (thedotmack)|claude-mem]]** — 4 MCP search tools (3-layer search/timeline/get_observations workflow) for persistent memory
- **[[code-review-graph (tirth8205)]]** — 28 MCP tools exposing AST-based codebase graph (blast-radius, semantic search, traversal). Notable for `--tools` filtering and 5 workflow prompt templates.
- **[[GitNexus (abhigyanpatwari)]]** — **the wiki's most exhaustive single MCP server**: 16 tools (11 per-repo: `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher` + 5 group/multi-repo) + 7 resources (`gitnexus://repos`, `.../context`, `.../clusters`, etc.) + 2 prompts (`detect_impact`, `generate_map`). Demonstrates all four MCP primitives (Tools + Resources + Prompts; Sampling not used) in production. Multi-repo via global registry — one MCP server serves any number of indexed codebases. **Reference implementation worth studying when you build your own MCP server.**
- **[[graphify (safishamsi)]]** — `python -m graphify.serve` exposes a multimodal knowledge-graph MCP: `query_graph`, `get_node`, `get_neighbors`, `shortest_path`. Distinct from code-only AST-graph servers because the indexed corpus includes papers, images, and video transcripts.

## Security and permission model

MCP tools are **just tools** — they go through the same Claude Code permission flow as built-in tools. Configure trusted ones to skip prompts; review unfamiliar ones before granting access.

[[Claude Code Tips (ykdojo)|Tip 33's cc-safe]] is also relevant: audit which MCP-exposed commands have been approved across your settings, looking for risky patterns.

## When to use MCP vs alternatives

| Need | Choice |
|---|---|
| Access to a third-party API (GitHub, Slack, Jira) | MCP (look for an existing server first) |
| Custom in-house data source | MCP (write your own server) |
| Quick local script | [[Hooks]] or [[Slash Commands]] |
| One-off shell command | Bash tool directly |
| Long-running data fetch | MCP (it's the right abstraction) |

## Protocol details

The MCP spec (modelcontextprotocol.io) defines:
- **Tools** — functions the server exposes
- **Resources** — data the server can provide on request
- **Prompts** — reusable prompt templates the server can offer
- **Sampling** (newer) — server can request the LLM to generate text

Most Claude Code uses focus on Tools.

## Token efficiency consideration

Each connected MCP server's tool descriptions are part of the system prompt. Many MCP servers = many tool descriptions = bigger context overhead per turn.

[[Claude Code Tips (ykdojo)|Tip about lazy-loading MCP tools]] addresses this — only enable MCP servers when you need them, rather than connecting everything globally.

[[CodeBurn (AgentSeal)|CodeBurn]]'s `optimize` adds the feedback half: it detects **unused MCP servers** ("still paying their tool-schema overhead every session") and quantifies the cost. Without measurement, MCP-server install-and-forget is the default.

## Cross-references

- [[Claude Code]] · [[Hooks]] · [[Skills]] · [[Plugins]]
- [[Token Efficiency]] · [[Context Engineering]]
- Sources: [[Claude HowTo (luongnv89)]] (config examples) · [[Claude Code System Prompts (Piebald)]] (Claude's MCP-related instructions) · [[Awesome Claude Code (hesreallyhim)]] (MCP server catalog) · [[GitNexus (abhigyanpatwari)]] (16 tools + 7 resources + 2 prompts reference) · [[graphify (safishamsi)]] (multimodal MCP) · [[CodeBurn (AgentSeal)]] (unused-MCP detection)
- External: [Model Context Protocol Specification](https://modelcontextprotocol.io)
