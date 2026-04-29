---
type: source
created: 2026-04-27
updated: 2026-04-27
sources: 1
tags: [skill, skill-collection, scientific-computing, biology, chemistry, medicine, multi-platform, agent-skills-spec]
source_path: (no raw — discovered via hyperlink in raw/repos/davila7-claude-code-templates.md)
source_date: 2026-04-27
source_author: K-Dense Inc. (k-dense.ai)
source_url: https://github.com/K-Dense-AI/claude-scientific-skills
license: MIT
---

# claude-scientific-skills (K-Dense-AI)

Discovered via the attribution section of [[Claude Code Templates (Daniel Avila)]] (cited as "139 scientific skills"; **actual current count: 133 ready-to-use skills**). Created and maintained by K-Dense Inc. — **not Anthropic-affiliated** despite the "Claude" in the original name.

## Why it matters for the wiki

This is the wiki's first **non-developer-domain skill collection at scale**. Skills span biology, chemistry, medicine, physics, materials science, geospatial analysis, clinical research, and engineering. Demonstrates that the [[Skills|Anthropic Agent Skills primitive]] generalizes well beyond software engineering — the bet implicit in `agentskills.io` (an open Agent Skills standard, not Claude-exclusive).

## Distinctive design patterns for scientific work

The wiki should note these as a design vocabulary applicable to any domain-deep skill collection:

- **Reproducibility-first** — security scanning via Cisco AI Defense Skill Scanner; documented workflows. Reproducibility is to science what determinism is to software — and the collection bakes it into install-time review.
- **Database integrations** — 100+ scientific databases pre-wired (PubChem, ChEMBL, UniProt, ClinicalTrials.gov, etc.). The skill is the *integration boilerplate*, not just the prompt.
- **Lab platform integrations** — Benchling, DNAnexus, LatchBio, OMERO, protocol platforms.
- **Multi-omics support** — explicit skills for integrated RNA-seq + proteomics + metabolomics analysis.
- **Citations** — every output ships in BibTeX / APA / MLA formats for academic attribution.

The general lesson for [[Skill Building]]: **a domain-deep skill is the integration boilerplate plus the citation discipline**, not the prompt alone.

## Install

```
npx skills add K-Dense-AI/scientific-agent-skills
```

Or via GitHub CLI for version pinning + provenance:

```
gh skill install K-Dense-AI/scientific-agent-skills
```

The "works with any AI agent supporting the open Agent Skills standard" framing — not Claude-exclusive — is structurally similar to [[graphify (safishamsi)|graphify's]] 15-platform install matrix and [[Trail of Bits Security Skills]]'s portability claim.

## Position in the ecosystem

Compared to other skill collections in the wiki:

| Collection | Skills | Domain | Stance |
|---|---|---|---|
| [[Matt Pocock Skills]] | 18 | TS/eng | "Real engineering, not vibe coding" |
| [[Superpowers (obra)]] | ~14 | Workflow | Composable methodology |
| [[Trail of Bits Security Skills]] | 40+ | Security | Professional assurance |
| [[Andrej Karpathy Skills (forrestchang)]] | 1 (CLAUDE.md drop-in) | Discipline | The four principles |
| [[jeffallan claude-skills]] | 65 | Eng + meta | Includes `/common-ground` |
| [[claude-skills (alirezarezvani)]] | 235+ | Eng + business | Persona-driven |
| [[agents (wshobson)]] | 184 agents + 150 skills | Eng-broad | Three-tier model routing |
| **claude-scientific-skills** | **133** | **Scientific R&D** | **Reproducibility + citations + lab platforms** |
| [[gstack (Garry Tan)]] | 41+ | Role-based | Multi-vendor coordination |

Scientific skills extend the X-axis of "what skills are for" further than any other collection.

## Cross-references

- [[Skills]] — domain-portability via the open Agent Skills standard (`agentskills.io`)
- [[Skill Building]] — domain-deep skills = integration boilerplate + citation discipline
- [[Claude Code Templates (Daniel Avila)]] — attribution source
- [[Claude Code Ecosystem]] — non-developer skill collections subsection
