# Launch & Handover Guide — Chatbot Widget

How to **run** the widget yourself and how to **give it to the company** so they can embed it on their site.

---

## 1. Launch it (you)

### Local development

```bash
cd /Users/peytonswipes/Downloads/widget
npm install
```

Create a `.env` in the project root with at least:

- **`OPENAI_API_KEY`** — Your OpenAI API key (required for chat).
- **`ALLOWED_ORIGINS`** — Comma-separated origins that may call your API, or leave empty to allow all (e.g. for local testing).
  - Example: `ALLOWED_ORIGINS=https://www.thecompany.com,https://thecompany.com`
- **`WEBSITE_URL`** — (Optional) Company website URL used for real-time fetching of hours/contact (defaults to `https://www.cccp.com`).

Optional (for DB-backed knowledge / memory):

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_ANON_KEY`
- `KNOWLEDGE_WITH_EMBEDDINGS=1` if you use embeddings

Then:

```bash
npm run dev
```

- App: **http://localhost:3000**
- Widget script: **http://localhost:3000/widget/widget.js**
- Test page: open **standalone-test/index.html** in a browser (update the script `data-api-url` to `http://localhost:3000` if testing locally).

### Deploy (e.g. Vercel)

The repo is set up for **Vercel** (`vercel.json` present).

1. Push the project to GitHub and connect the repo to Vercel, or run `vercel` in the project folder.
2. In Vercel → Project → **Settings → Environment Variables**, add:
   - `OPENAI_API_KEY`
   - `ALLOWED_ORIGINS` (e.g. `https://www.thecompany.com,https://thecompany.com`)
   - `WEBSITE_URL` (company site)
   - Any Supabase vars if you use them.
3. Deploy. Your widget and API will live at something like **https://your-project.vercel.app**.

---

## 2. Give it to the company

Once the backend is deployed (e.g. at `https://your-project.vercel.app`), the company only needs to add **one script tag** to their site.

### Embed code they add

They paste this before `</body>` on every page where the chat should appear (replace the URLs with your real ones):

```html
<script
  defer
  src="https://YOUR-DEPLOYED-URL/widget/widget.js"
  data-api-url="https://YOUR-DEPLOYED-URL"
  data-privacy-url="https://www.thecompany.com/privacy-policy"
></script>
```

Examples:

- If you deploy to **https://cameracorner.vercel.app**:
  - `src="https://cameracorner.vercel.app/widget/widget.js"`
  - `data-api-url="https://cameracorner.vercel.app"`
- **data-privacy-url** — Full URL to their privacy policy (used in the widget footer). Change to their real policy URL.

### What you must do on your side

- Set **`ALLOWED_ORIGINS`** on the server (Vercel env vars or `.env`) to include the company’s domains, e.g.:
  - `https://www.thecompany.com`
  - `https://thecompany.com`
  - Add every domain/subdomain where the script will run.
- If you don’t set `ALLOWED_ORIGINS`, the server allows all origins (ok for testing, not ideal for production).

### What the company does

1. Add the one `<script>` tag above to their site (all pages or just the ones they want).
2. Replace `YOUR-DEPLOYED-URL` with the URL you give them (e.g. your Vercel URL).
3. Replace `data-privacy-url` with their actual privacy policy URL.
4. No build step or npm on their side — it’s a single script include.

---

## 3. Quick reference

| You (launch) | Company (use) |
|--------------|----------------|
| Deploy backend (e.g. Vercel) | Add one script tag to their site |
| Set `OPENAI_API_KEY`, `ALLOWED_ORIGINS`, optional `WEBSITE_URL` | Set `data-api-url` and `data-privacy-url` to the URLs you provide |
| Optionally train knowledge / set up Supabase | No backend or server for them |

**Widget script URL:** `https://YOUR-DEPLOYED-URL/widget/widget.js`  
**API base:** `https://YOUR-DEPLOYED-URL` (used by the widget via `data-api-url`)
