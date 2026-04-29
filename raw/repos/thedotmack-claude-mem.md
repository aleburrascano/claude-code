---
title: "thedotmack/claude-mem: A Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it with AI (using Claude's agent-sdk), and injects relevant context back into future sessions."
source: "https://github.com/thedotmack/claude-mem"
author:
published:
created: 2026-04-26
description: "A Claude Code plugin that automatically captures everything Claude does during your coding sessions, compresses it with AI (using Claude's agent-sdk), and injects relevant context back into future sessions. - thedotmack/claude-mem"
tags:
  - "clippings"
---
[🇨🇳 中文](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.zh.md) • [🇹🇼 繁體中文](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.zh-tw.md) • [🇯🇵 日本語](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.ja.md) • [🇵🇹 Português](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.pt.md) • [🇧🇷 Português](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.pt-br.md) • [🇰🇷 한국어](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.ko.md) • [🇪🇸 Español](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.es.md) • [🇩🇪 Deutsch](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.de.md) • [🇫🇷 Français](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.fr.md) • [🇮🇱 עברית](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.he.md) • [🇸🇦 العربية](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.ar.md) • [🇷🇺 Русский](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.ru.md) • [🇵🇱 Polski](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.pl.md) • [🇨🇿 Čeština](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.cs.md) • [🇳🇱 Nederlands](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.nl.md) • [🇹🇷 Türkçe](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.tr.md) • [🇺🇦 Українська](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.uk.md) • [🇻🇳 Tiếng Việt](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.vi.md) • [🇵🇭 Tagalog](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.tl.md) • [🇮🇩 Indonesia](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.id.md) • [🇹🇭 ไทย](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.th.md) • [🇮🇳 हिन्दी](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.hi.md) • [🇧🇩 বাংলা](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.bn.md) • [🇵🇰 اردو](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.ur.md) • [🇷🇴 Română](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.ro.md) • [🇸🇪 Svenska](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.sv.md) • [🇮🇹 Italiano](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.it.md) • [🇬🇷 Ελληνικά](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.el.md) • [🇭🇺 Magyar](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.hu.md) • [🇫🇮 Suomi](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.fi.md) • [🇩🇰 Dansk](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.da.md) • [🇳🇴 Norsk](https://github.com/thedotmack/claude-mem/blob/main/docs/i18n/README.no.md)

#### Persistent memory compression system built for Claude Code.[![thedotmack/claude-mem | Trendshift](https://raw.githubusercontent.com/thedotmack/claude-mem/main/docs/public/trendshift-badge.svg)](https://trendshift.io/repositories/15496)| [  ![Claude-Mem Preview](https://raw.githubusercontent.com/thedotmack/claude-mem/main/docs/public/cm-preview.gif)  ](https://github.com/thedotmack/claude-mem) | [  ![Star History Chart](https://camo.githubusercontent.com/e6f8bac0bec2c5db9780ba6f89d86180dc06e728592f73fd5d8d9164bb79779b/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f696d6167653f7265706f733d746865646f746d61636b2f636c617564652d6d656d26747970653d64617465266c6567656e643d746f702d6c656674)  ](https://www.star-history.com/#thedotmack/claude-mem&Date) |
| --- | --- |

[Quick Start](#quick-start) • [How It Works](#how-it-works) • [Search Tools](#mcp-search-tools) • [Documentation](#documentation) • [Configuration](#configuration) • [Troubleshooting](#troubleshooting) • [License](#license)

Claude-Mem seamlessly preserves context across sessions by automatically capturing tool usage observations, generating semantic summaries, and making them available to future sessions. This enables Claude to maintain continuity of knowledge about projects even after sessions end or reconnect.

---

## Quick Start

Install with a single command:

```
npx claude-mem install
```

Or install for Gemini CLI (auto-detects `~/.gemini`):

```
npx claude-mem install --ide gemini-cli
```

Or install for OpenCode:

```
npx claude-mem install --ide opencode
```

Or install from the plugin marketplace inside Claude Code:

```
/plugin marketplace add thedotmack/claude-mem

/plugin install claude-mem
```

Restart Claude Code or Gemini CLI. Context from previous sessions will automatically appear in new sessions.

> **Note:** Claude-Mem is also published on npm, but `npm install -g claude-mem` installs the **SDK/library only** — it does not register the plugin hooks or set up the worker service. Always install via `npx claude-mem install` or the `/plugin` commands above.

### 🦞 OpenClaw Gateway

Install claude-mem as a persistent memory plugin on [OpenClaw](https://openclaw.ai/) gateways with a single command:

```
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

The installer handles dependencies, plugin setup, AI provider configuration, worker startup, and optional real-time observation feeds to Telegram, Discord, Slack, and more. See the [OpenClaw Integration Guide](https://docs.claude-mem.ai/openclaw-integration) for details.

**Key Features:**

- 🧠 **Persistent Memory** - Context survives across sessions
- 📊 **Progressive Disclosure** - Layered memory retrieval with token cost visibility
- 🔍 **Skill-Based Search** - Query your project history with mem-search skill
- 🖥️ **Web Viewer UI** - Real-time memory stream at [http://localhost:37777](http://localhost:37777/)
- 💻 **Claude Desktop Skill** - Search memory from Claude Desktop conversations
- 🔒 **Privacy Control** - Use `<private>` tags to exclude sensitive content from storage
- ⚙️ **Context Configuration** - Fine-grained control over what context gets injected
- 🤖 **Automatic Operation** - No manual intervention required
- 🔗 **Citations** - Reference past observations with IDs (access via [http://localhost:37777/api/observation/{id}](http://localhost:37777/api/observation/%7Bid%7D) or view all in the web viewer at [http://localhost:37777](http://localhost:37777/))
- 🧪 **Beta Channel** - Try experimental features like Endless Mode via version switching

---

## Documentation

📚 **[View Full Documentation](https://docs.claude-mem.ai/)** - Browse on official website

### Getting Started

- **[Installation Guide](https://docs.claude-mem.ai/installation)** - Quick start & advanced installation
- **[Gemini CLI Setup](https://docs.claude-mem.ai/gemini-cli/setup)** - Dedicated guide for Google's Gemini CLI integration
- **[Usage Guide](https://docs.claude-mem.ai/usage/getting-started)** - How Claude-Mem works automatically
- **[Search Tools](https://docs.claude-mem.ai/usage/search-tools)** - Query your project history with natural language
- **[Beta Features](https://docs.claude-mem.ai/beta-features)** - Try experimental features like Endless Mode

### Best Practices

- **[Context Engineering](https://docs.claude-mem.ai/context-engineering)** - AI agent context optimization principles
- **[Progressive Disclosure](https://docs.claude-mem.ai/progressive-disclosure)** - Philosophy behind Claude-Mem's context priming strategy

### Architecture

- **[Overview](https://docs.claude-mem.ai/architecture/overview)** - System components & data flow
- **[Architecture Evolution](https://docs.claude-mem.ai/architecture-evolution)** - The journey from v3 to v5
- **[Hooks Architecture](https://docs.claude-mem.ai/hooks-architecture)** - How Claude-Mem uses lifecycle hooks
- **[Hooks Reference](https://docs.claude-mem.ai/architecture/hooks)** - 7 hook scripts explained
- **[Worker Service](https://docs.claude-mem.ai/architecture/worker-service)** - HTTP API & Bun management
- **[Database](https://docs.claude-mem.ai/architecture/database)** - SQLite schema & FTS5 search
- **[Search Architecture](https://docs.claude-mem.ai/architecture/search-architecture)** - Hybrid search with Chroma vector database

### Configuration & Development

- **[Configuration](https://docs.claude-mem.ai/configuration)** - Environment variables & settings
- **[Development](https://docs.claude-mem.ai/development)** - Building, testing, contributing
- **[Troubleshooting](https://docs.claude-mem.ai/troubleshooting)** - Common issues & solutions

---

## How It Works

**Core Components:**

1. **5 Lifecycle Hooks** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 hook scripts)
2. **Smart Install** - Cached dependency checker (pre-hook script, not a lifecycle hook)
3. **Worker Service** - HTTP API on port 37777 with web viewer UI and 10 search endpoints, managed by Bun
4. **SQLite Database** - Stores sessions, observations, summaries
5. **mem-search Skill** - Natural language queries with progressive disclosure
6. **Chroma Vector Database** - Hybrid semantic + keyword search for intelligent context retrieval

See [Architecture Overview](https://docs.claude-mem.ai/architecture/overview) for details.

---

## MCP Search Tools

Claude-Mem provides intelligent memory search through **4 MCP tools** following a token-efficient **3-layer workflow pattern**:

**The 3-Layer Workflow:**

1. **`search`** - Get compact index with IDs (~50-100 tokens/result)
2. **`timeline`** - Get chronological context around interesting results
3. **`get_observations`** - Fetch full details ONLY for filtered IDs (~500-1,000 tokens/result)

**How It Works:**

- Claude uses MCP tools to search your memory
- Start with `search` to get an index of results
- Use `timeline` to see what was happening around specific observations
- Use `get_observations` to fetch full details for relevant IDs
- **~10x token savings** by filtering before fetching details

**Available MCP Tools:**

1. **`search`** - Search memory index with full-text queries, filters by type/date/project
2. **`timeline`** - Get chronological context around a specific observation or query
3. **`get_observations`** - Fetch full observation details by IDs (always batch multiple IDs)

**Example Usage:**

```
// Step 1: Search for index
search(query="authentication bug", type="bugfix", limit=10)

// Step 2: Review index, identify relevant IDs (e.g., #123, #456)

// Step 3: Fetch full details
get_observations(ids=[123, 456])
```

See [Search Tools Guide](https://docs.claude-mem.ai/usage/search-tools) for detailed examples.

---

## Beta Features

Claude-Mem offers a **beta channel** with experimental features like **Endless Mode** (biomimetic memory architecture for extended sessions). Switch between stable and beta versions from the web viewer UI at [http://localhost:37777](http://localhost:37777/) → Settings.

See **[Beta Features Documentation](https://docs.claude-mem.ai/beta-features)** for details on Endless Mode and how to try it.

---

## System Requirements

- **Node.js**: 18.0.0 or higher
- **Claude Code**: Latest version with plugin support
- **Bun**: JavaScript runtime and process manager (auto-installed if missing)
- **uv**: Python package manager for vector search (auto-installed if missing)
- **SQLite 3**: For persistent storage (bundled)

---

### Windows Setup Notes

If you see an error like:

```
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Make sure Node.js and npm are installed and added to your PATH. Download the latest Node.js installer from [https://nodejs.org](https://nodejs.org/) and restart your terminal after installation.

---

## Configuration

Settings are managed in `~/.claude-mem/settings.json` (auto-created with defaults on first run). Configure AI model, worker port, data directory, log level, and context injection settings.

See the **[Configuration Guide](https://docs.claude-mem.ai/configuration)** for all available settings and examples.

### Mode & Language Configuration

Claude-Mem supports multiple workflow modes and languages via the `CLAUDE_MEM_MODE` setting.

This option controls both:

- The workflow behavior (e.g. code, chill, investigation)
- The language used in generated observations

#### How to Configure

Edit your settings file at `~/.claude-mem/settings.json`:

```
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Modes are defined in `plugin/modes/`. To see all available modes locally:

```
ls ~/.claude/plugins/marketplaces/thedotmack/plugin/modes/
```

#### Available Modes

| Mode | Description |
| --- | --- |
| `code` | Default English mode |
| `code--zh` | Simplified Chinese mode |
| `code--ja` | Japanese mode |

Language-specific modes follow the pattern `code--[lang]` where `[lang]` is the ISO 639-1 language code (e.g., `zh` for Chinese, `ja` for Japanese, `es` for Spanish).

> Note: `code--zh` (Simplified Chinese) is already built-in — no additional installation or plugin update is required.

#### After Changing Mode

## Restart Claude Code to apply the new mode configuration.

## Development

See the **[Development Guide](https://docs.claude-mem.ai/development)** for build instructions, testing, and contribution workflow.

---

## Troubleshooting

If experiencing issues, describe the problem to Claude and the troubleshoot skill will automatically diagnose and provide fixes.

See the **[Troubleshooting Guide](https://docs.claude-mem.ai/troubleshooting)** for common issues and solutions.

---

## Bug Reports

Create comprehensive bug reports with the automated generator:

```
cd ~/.claude/plugins/marketplaces/thedotmack
npm run bug-report
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Update documentation
5. Submit a Pull Request

See [Development Guide](https://docs.claude-mem.ai/development) for contribution workflow.

---

## License

This project is licensed under the **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). All rights reserved.

See the [LICENSE](https://github.com/thedotmack/claude-mem/blob/main/LICENSE) file for full details.

**What This Means:**

- You can use, modify, and distribute this software freely
- If you modify and deploy on a network server, you must make your source code available
- Derivative works must also be licensed under AGPL-3.0
- There is NO WARRANTY for this software

**Note on Ragtime**: The `ragtime/` directory is licensed separately under the **PolyForm Noncommercial License 1.0.0**. See [ragtime/LICENSE](https://github.com/thedotmack/claude-mem/blob/main/ragtime/LICENSE) for details.

---

## Support

- **Documentation**: [docs/](https://github.com/thedotmack/claude-mem/blob/main/docs)
- **Issues**: [GitHub Issues](https://github.com/thedotmack/claude-mem/issues)
- **Repository**: [github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
- **Official X Account**: [@Claude\_Memory](https://x.com/Claude_Memory)
- **Official Discord**: [Join Discord](https://discord.com/invite/J4wttp9vDu)
- **Author**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Built with Claude Agent SDK** | **Powered by Claude Code** | **Made with TypeScript**

---

### What About $CMEM?

$CMEM is a solana token created by a 3rd party without Claude-Mem's prior consent, but officially embraced by the creator of Claude-Mem (Alex Newman, @thedotmack). The token acts as a community catalyst for growth and a vehicle for bringing real-time agent data to the developers and knowledge workers that need it most. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS