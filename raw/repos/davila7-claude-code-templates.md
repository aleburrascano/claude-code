---
title: "davila7/claude-code-templates: CLI tool for configuring and monitoring Claude Code"
source: "https://github.com/davila7/claude-code-templates"
author:
published:
created: 2026-04-27
description: "CLI tool for configuring and monitoring Claude Code - davila7/claude-code-templates"
tags:
  - "clippings"
---
[![davila7%2Fclaude-code-templates | Trendshift](https://camo.githubusercontent.com/1568745f75c4eff96e67b1e8e57855ff877519bdbfc44728de5fd9cd57add4c7/68747470733a2f2f7472656e6473686966742e696f2f6170692f62616467652f7265706f7369746f726965732f3135313133)](https://trendshift.io/repositories/15113)  
  
[![Claude for Open Source](https://github.com/davila7/claude-code-templates/raw/main/docs/claude-oss-badge.svg)](https://claude.com/contact-sales/claude-for-oss)

---

> **🧪 NEW: Dashboard** — Explore components, manage collections, and track installations at **[www.aitmpl.com](https://www.aitmpl.com/)**. Currently in beta — feedback welcome!

## Claude Code Templates (aitmpl.com)

**Ready-to-use configurations for Anthropic's Claude Code.** A comprehensive collection of AI agents, custom commands, settings, hooks, external integrations (MCPs), and project templates to enhance your development workflow.

## Browse & Install Components and Templates

**[Browse All Templates](https://aitmpl.com/)** - Interactive web interface to explore and install 100+ agents, commands, settings, hooks, and MCPs.

[![Screenshot 2025-08-19 at 08 09 24](https://private-user-images.githubusercontent.com/6216945/479499740-e3617410-9b1c-4731-87b7-a3858800b737.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzczMzE4NTIsIm5iZiI6MTc3NzMzMTU1MiwicGF0aCI6Ii82MjE2OTQ1LzQ3OTQ5OTc0MC1lMzYxNzQxMC05YjFjLTQ3MzEtODdiNy1hMzg1ODgwMGI3MzcucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDQyNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA0MjdUMjMxMjMyWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YzgwN2JkMjJlNmI1ZDEzZDhkY2M2YTA1ODRjOWI4MmNiYTNiMjJlYWQwNDk0OWMxMjRkMzc5M2EzMzM2YzM2MyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGcG5nIn0.HXzdsZ9ZO0zSxUT-le_Wwy23JvOC2qdE1kmGEhAv2fY)](https://private-user-images.githubusercontent.com/6216945/479499740-e3617410-9b1c-4731-87b7-a3858800b737.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzczMzE4NTIsIm5iZiI6MTc3NzMzMTU1MiwicGF0aCI6Ii82MjE2OTQ1LzQ3OTQ5OTc0MC1lMzYxNzQxMC05YjFjLTQ3MzEtODdiNy1hMzg1ODgwMGI3MzcucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI2MDQyNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNjA0MjdUMjMxMjMyWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YzgwN2JkMjJlNmI1ZDEzZDhkY2M2YTA1ODRjOWI4MmNiYTNiMjJlYWQwNDk0OWMxMjRkMzc5M2EzMzM2YzM2MyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmcmVzcG9uc2UtY29udGVudC10eXBlPWltYWdlJTJGcG5nIn0.HXzdsZ9ZO0zSxUT-le_Wwy23JvOC2qdE1kmGEhAv2fY)

## 🚀 Quick Installation

```
# Install a complete development stack
npx claude-code-templates@latest --agent development-team/frontend-developer --command testing/generate-tests --mcp development/github-integration --yes

# Browse and install interactively
npx claude-code-templates@latest

# Install specific components
npx claude-code-templates@latest --agent development-tools/code-reviewer --yes
npx claude-code-templates@latest --command performance/optimize-bundle --yes
npx claude-code-templates@latest --setting performance/mcp-timeouts --yes
npx claude-code-templates@latest --hook git/pre-commit-validation --yes
npx claude-code-templates@latest --mcp database/postgresql-integration --yes
```

## What You Get

| Component | Description | Examples |
| --- | --- | --- |
| **🤖 Agents** | AI specialists for specific domains | Security auditor, React performance optimizer, database architect |
| **⚡ Commands** | Custom slash commands | `/generate-tests`, `/optimize-bundle`, `/check-security` |
| **🔌 MCPs** | External service integrations | GitHub, PostgreSQL, Stripe, AWS, OpenAI |
| **⚙️ Settings** | Claude Code configurations | Timeouts, memory settings, output styles |
| **🪝 Hooks** | Automation triggers | Pre-commit validation, post-completion actions |
| **🎨 Skills** | Reusable capabilities with progressive disclosure | PDF processing, Excel automation, custom workflows |

## 🛠️ Additional Tools

Beyond the template catalog, Claude Code Templates includes powerful development tools:

### 📊 Claude Code Analytics

Monitor your AI-powered development sessions in real-time with live state detection and performance metrics.

```
npx claude-code-templates@latest --analytics
```

### 💬 Conversation Monitor

Mobile-optimized interface to view Claude responses in real-time with secure remote access.

```
# Local access
npx claude-code-templates@latest --chats

# Secure remote access via Cloudflare Tunnel
npx claude-code-templates@latest --chats --tunnel
```

### 🔍 Health Check

Comprehensive diagnostics to ensure your Claude Code installation is optimized.

```
npx claude-code-templates@latest --health-check
```

### 🔌 Plugin Dashboard

View marketplaces, installed plugins, and manage permissions from a unified interface.

```
npx claude-code-templates@latest --plugins
```

## 📖 Documentation

**[📚 docs.aitmpl.com](https://docs.aitmpl.com/)** - Complete guides, examples, and API reference for all components and tools.

## Contributing

We welcome contributions! **[Browse existing templates](https://aitmpl.com/)** to see what's available, then check our [contributing guidelines](https://github.com/davila7/claude-code-templates/blob/main/CONTRIBUTING.md) to add your own agents, commands, MCPs, settings, or hooks.

**Please read our [Code of Conduct](https://github.com/davila7/claude-code-templates/blob/main/CODE_OF_CONDUCT.md) before contributing.**

## Attribution

This collection includes components from multiple sources:

**Scientific Skills:**

- **[K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills)** by K-Dense Inc. - MIT License (139 scientific skills for biology, chemistry, medicine, and computational research)

**Official Anthropic:**

- **[anthropics/skills](https://github.com/anthropics/skills)** - Official Anthropic skills (21 skills)
- **[anthropics/claude-code](https://github.com/anthropics/claude-code)** - Development guides and examples (10 skills)

**Community Skills & Agents:**

- **[obra/superpowers](https://github.com/obra/superpowers)** by Jesse Obra - MIT License (14 workflow skills)
- **[alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)** by Alireza Rezvani - MIT License (36 professional role skills)
- **[wshobson/agents](https://github.com/wshobson/agents)** by wshobson - MIT License (48 agents)
- **NerdyChefsAI Skills** - Community contribution - MIT License (specialized enterprise skills)

**Commands & Tools:**

- **[awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)** by hesreallyhim - CC0 1.0 Universal (21 commands)
- **[awesome-claude-skills](https://github.com/mehdi-lamrani/awesome-claude-skills)** - Apache 2.0 (community skills)
- **move-code-quality-skill** - MIT License
- **cocoindex-claude** - Apache 2.0

Each of these resources retains its **original license and attribution**, as defined by their respective authors. We respect and credit all original creators for their work and contributions to the Claude ecosystem.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/davila7/claude-code-templates/blob/main/LICENSE) file for details.

## 🔗 Links

- **🌐 Browse Templates**: [aitmpl.com](https://aitmpl.com/)
- **📚 Documentation**: [docs.aitmpl.com](https://docs.aitmpl.com/)
- **💬 Community**: [GitHub Discussions](https://github.com/davila7/claude-code-templates/discussions)
- **🐛 Issues**: [GitHub Issues](https://github.com/davila7/claude-code-templates/issues)

## Stargazers over time

[![Stargazers over time](https://camo.githubusercontent.com/609b03e457a058c0e78213f583f658ea58afcb789f42d3a13920ff94fcd2650d/68747470733a2f2f7374617263686172742e63632f646176696c61372f636c617564652d636f64652d74656d706c617465732e7376673f76617269616e743d6164617074697665)](https://starchart.cc/davila7/claude-code-templates)

---

**⭐ Found this useful? Give us a star to support the project!**

[![Buy Me A Coffee](https://camo.githubusercontent.com/0fc0705004ac0b674c90f8ef4b20b0d671f6950ec3f6a40c689a6f79f3d2878a/68747470733a2f2f696d672e6275796d6561636f666665652e636f6d2f627574746f6e2d6170692f3f746578743d4275792532306d6525323061253230636f6666656526736c75673d64616e696176696c6126627574746f6e5f636f6c6f75723d46464444303026666f6e745f636f6c6f75723d30303030303026666f6e745f66616d696c793d436f6f6b6965266f75746c696e655f636f6c6f75723d30303030303026636f666665655f636f6c6f75723d666666666666)](https://buymeacoffee.com/daniavila)