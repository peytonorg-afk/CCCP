# Website Chatbot (Lightweight Widget + OpenAI API)

## Quick Start
```bash
cp .env.example .env
# fill OPENAI_API_KEY
npm install
npm run dev
# open http://localhost:3000
```

## Env Vars

- OPENAI_API_KEY — OpenAI secret
- PORT — default 3000
- ALLOWED_ORIGINS — CSV list for CORS
- KNOWLEDGE_WITH_EMBEDDINGS — "1" to enable vector retrieval

## Knowledge Base

Drop `docs/knowledge.jsonl` here (from your teammate). Each line:

```json
{"id":"path#1","url":"https://client.com/page","title":"Page","content":"<chunk>","embedding":[...optional]}
```

### Build Knowledge (optional)
```bash
npm run build-kb
# or
npm run build-kb:embed
```

## Dev Scripts

- npm run dev — nodemon server
- npm start — production server

## Deploy (Vercel)

Import repo → set env vars → deploy.

Script loads widget at `/widget/widget.js`.

Use on any site:
```html
<script defer src="https://YOUR_DOMAIN/widget/widget.js"></script>
```

## Acceptance Criteria
- Starting `npm run dev` logs server URL and KB load count (or warning if missing).
- Opening `http://localhost:3000` shows a page and adds a floating **Chat** button.
- Asking a question hits `/api/chat` and returns an answer; if no KB, it asks for name/email (handoff).
- Pasting `knowledge.jsonl` and restarting leads to grounded, cited answers.
- Optional: set `KNOWLEDGE_WITH_EMBEDDINGS=1` and a KB with `embedding` fields → vector retrieval is used.

## Nice-to-haves (not required now)
- Swap `/api/lead` to SMTP/CRM.
- Add SSE streaming later.
- Add analytics counters.
