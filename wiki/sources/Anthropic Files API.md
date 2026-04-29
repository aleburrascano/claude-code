---
type: source
created: 2026-04-29
updated: 2026-04-29
sources: 1
tags: [anthropic-official, api-docs, files-api, token-efficiency, beta]
source_path: (no raw)
source_date: 2026-04-29
source_author: Anthropic
source_url: https://platform.claude.com/docs/en/build-with-claude/files
beta_header: files-api-2025-04-14
---

# Anthropic Files API

A "create-once, use-many-times" file storage layer for the Claude API. Beta as of `files-api-2025-04-14`. **Not** ZDR-eligible.

For our wiki, this matters as a [[Token Efficiency]] mechanism: stop re-uploading the same document every API call.

## What it does

Upload files once, get a `file_id`, reference that `file_id` across many `Messages` requests. Eliminates re-upload cost and latency. Two use cases:

1. **Frequently-used documents/images** referenced across multiple API calls (the common case)
2. **Code execution tool I/O** — provide datasets/inputs, download charts/results

## Supported content shapes

| File Type | MIME Type | Block Type |
|---|---|---|
| PDF | `application/pdf` | `document` |
| Plain text | `text/plain` | `document` |
| Images | `image/jpeg`, `png`, `gif`, `webp` | `image` |
| Datasets, others | varies | `container_upload` (code execution) |

For unsupported types (.csv, .docx, .xlsx, .md): convert to plain text and inline in the message. For .docx with images: convert to PDF first to use [PDF support's](https://platform.claude.com/docs/en/build-with-claude/pdf-support) image-parsing.

## Limits & lifecycle

| Constraint | Value |
|---|---|
| Max file size | 500 MB |
| Total storage | 500 GB per organization |
| File operations rate limit (beta) | ~100/min |
| Files API on Bedrock/Vertex | **Not supported** |
| Persistence | Until explicit delete |
| ZDR | **Not eligible** |

Files are scoped to the API key's workspace. Other API keys in the same workspace can use them.

## Usage and billing

| Operation | Cost |
|---|---|
| Upload, list, retrieve metadata, delete | **Free** |
| Reference in `Messages` request | Priced as input tokens (the file content) |
| Download (only files created by skills/code execution) | Free |

The interesting line: **upload is free; usage is just normal input-token billing.** That makes it strictly better than re-upload for repeated reference.

## API contract (Python)

```python
# Upload
uploaded = client.beta.files.upload(
    file=("document.pdf", open("/path/to/document.pdf", "rb"), "application/pdf"),
)
file_id = uploaded.id

# Reference in messages
response = client.beta.messages.create(
    model="claude-opus-4-7",
    max_tokens=1024,
    betas=["files-api-2025-04-14"],
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "Summarize this."},
            {"type": "document", "source": {"type": "file", "file_id": file_id}},
        ],
    }],
)

# Manage
files = client.beta.files.list()
metadata = client.beta.files.retrieve_metadata(file_id)
client.beta.files.delete(file_id)
```

## Where this lands in the wiki

- **[[Token Efficiency]]** — uploads are free; you pay only for the input tokens when used. Strictly cheaper than re-upload patterns when a doc is referenced 2+ times.
- **[[Memory]]** — natural pairing with the file-based memory tool ([[Anthropic Effective Context Engineering|Memory tool]]). Together: file-as-context-pointer + memory-as-pointer-store.
- **[[Skills]]** — skills that operate on documents can store reference PDFs as `file_id` rather than baking content into the SKILL.md.
- **[[Cost Observability Playbook]]** — re-uploads are a "patterns to look for" signal CodeBurn could detect. Files API is the fix.

## Common errors (from the docs)

- **404 file not found** — `file_id` doesn't exist or wrong workspace
- **400 invalid file type** — using image file in document block, or vice versa
- **400 exceeds context window** — file too large for the request (e.g., 500MB plaintext doesn't fit a 1M context)
- **400 invalid filename** — filenames must be 1-255 chars; no `<>:"|?*\/` or unicode 0-31
- **413 file too large** — exceeds 500 MB
- **403 storage limit exceeded** — organization hit 500 GB

## Cross-references

- [[Token Efficiency]] · [[Memory]] · [[Skills]] · [[Cost Observability Playbook]]
- [[Anthropic Tool Use Overview]] (Files API integrates with code_execution and skills tools)
- [[Anthropic Effective Context Engineering]] (the Memory tool framing)
