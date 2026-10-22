# KARMA AI

**Think. Understand. Create.**

KARMA AI is a general conversational AI workspace. The default provider is local Ollama. Chat, document summaries, document creation, and library research use server-side routes; browser code never calls the Ollama API directly.

## Run locally with Ollama

Requires Node.js 22.12 or newer, pnpm, and Ollama. Install the dependencies with `pnpm install`, then make sure Ollama is running and the configured model is present:

```sh
ollama pull qwen3.5:4b
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Local configuration is read from `.env.local`:

```dotenv
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen3.5:4b
```

The app defaults to Ollama even if `AI_PROVIDER` is unset. It never falls back to a cloud provider. To deliberately use OpenAI instead, set `AI_PROVIDER=openai` and provide `OPENAI_API_KEY`; `OPENAI_MODEL` is optional. Do not commit `.env.local` or API keys. `.env*` is ignored by Git except `.env.example`.

## Features and data

- **Chat:** streamed replies from the configured model, with conversation history stored in this browser.
- **Summarize:** PDF, DOCX, TXT, and Markdown extraction and chunked summaries. Scanned PDFs require OCR, which is not included.
- **Create document:** generate an editable Markdown draft and export it as Markdown, DOCX, or PDF. DOCX and PDF exports retain headings, lists, and basic tables.
- **Knowledge library:** extracted text is stored in this browser's local storage, searchable, and removable. It is not stored on a shared server. Browser storage limits apply.
- **Research:** answers from excerpts in the local library with numbered source labels. Live web search is not configured.

Uploaded documents are posted to the local KARMA AI server for extraction and passed to the configured AI provider for requested operations. Ollama runs on the configured local endpoint. The library does not synchronize across browsers or users.

## Checks

- `pnpm lint` runs ESLint.
- `pnpm typecheck` runs the TypeScript checker.
- `pnpm test` runs the Vitest unit tests.
- `pnpm test:e2e` runs the Playwright browser tests (install Chromium with `pnpm exec playwright install chromium` if needed).

## Progress

- [x] KARMA AI branding, responsive app shell, navigation, light/dark themes, and feature pages.
- [x] Streaming conversational assistant through a server-side provider route.
- [x] Document extraction and chunked summarization.
- [x] Document creation and Markdown/PDF export.
- [x] Browser-local searchable document library and library-grounded research.
- [ ] Live web search and OCR for scanned PDFs.
