# claude-code-wiki

Alessandro's personal knowledge wiki on getting the most out of Claude Code.

Topics covered: skills, context engineering, token efficiency, reasoning quality, subagents, hooks, and MCP.

## Structure

```
claude-code/
├── raw/          ← source material (immutable)
├── wiki/         ← authored pages
├── index.md      ← page index
├── log.md        ← append-only operation log
└── CLAUDE.md     ← wiki operating manual
```

## Contributing

1. Fork this repo
2. Add your source file to `raw/` and create wiki pages
3. Open a pull request — CI checks for duplicate source filenames automatically

## Setting up your own wiki

Use [vault-init](https://github.com/aleburrascano/vault-init):

```bash
npm install -g @aleburrascano/vault-init
vault-init my-wiki-name
```
