# Doug Portfolio v1 (Scaffold)

This repo is a clean **Next.js + Tailwind + Keystatic** scaffold.

It includes:

- Next.js **14.2.35** (pinned for stability)
- Tailwind (with `@tailwindcss/typography` for readable article pages)
- Keystatic Admin UI at **`/keystatic`** (local mode)
- Two content collections managed by Keystatic:
  - **Thought Leadership** (`content/articles/*`)
  - **Work** (`content/work/*`)
- A homepage **Ask Doug** module (preview/search modes)
- A real **Contact** form (no mailto)

---

## 0) Prereqs (do this first)

**Recommended:** Node **20 LTS**.

Check your Node version:

```bash
node -v
```

If you see `v20.x`, you're good.

If you see something else (ex: `v23.x`), you *may* still run dev, but you will avoid weirdness by switching to Node 20.

### Option A (recommended): Volta

```bash
# Install Volta (macOS/Linux)
curl https://get.volta.sh | bash

# Install Node 20
volta install node@20
node -v
```

### Option B: Homebrew

```bash
brew install node@20
node -v
```

---

## 1) Install dependencies

From the repo root:

```bash
npm install
```

**Do not run** `npm audit fix --force` (it will “upgrade” you into dependency mismatches).

---

## 2) Run the dev server

```bash
npm run dev
```

Open:

- Site: http://localhost:3000
- Keystatic Admin: http://localhost:3000/keystatic

---

## 3) Set env vars (site URL + Ask mode)

Create a local env file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your canonical domain:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Ask Doug modes:

- `preview` (default): UI is live but no fake AI
- `search`: keyword search across titles/summary/tags/topics
- `rag`: placeholder for later
- `off`: hide the module

```bash
ASK_DOUG_MODE=search
```

---

## 4) Add content (Keystatic)

1. Go to **`/keystatic`**
2. Create your first entry:
   - ThoughtLeadership → Thought Leadership → **New**
   - Work → Work → **New**
3. Save

Keystatic writes files into:

- `content/articles/<slug>/index.md`
- `content/work/<slug>/index.md`

Images upload into:

- `public/images/articles/…`
- `public/images/work/…`

---

## 5) Routes

- `/` → Home (Ask Doug)
- `/thought-leadership` → Featured + topic cards (canonical)
  - `/thought-leadership/<slug>` → Article detail
  - `/thought-leadership/topic/<topic>` → Topic index
- `/writing` → redirects to `/thought-leadership` (backward compatible)
- `/work` → Work index
  - `/work/<slug>` → Work detail
- `/about` → About
- `/contact` → Contact form

---

## 6) Contact form delivery (Resend)

The Contact form posts to `/api/contact`.

### Dev

If `RESEND_API_KEY` is not set, the API will **log** the message to the server console and return success.

### Production

Set these env vars:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=Doug@creativebygray.com
CONTACT_FROM_EMAIL="Doug Ruppert Portfolio <onboarding@resend.dev>"
```

For a real domain, verify your sending domain in Resend and change `CONTACT_FROM_EMAIL` to a verified sender.

---

## 7) Resume download

A placeholder PDF is included at:

- `public/resume.pdf`

Replace it with your real resume when ready.

---

## Project structure (important files)

- `keystatic.config.ts` → Keystatic schema + content paths
- `src/app/keystatic/*` → Admin UI route
- `src/app/api/keystatic/*` → Admin API route
- `src/app/thought-leadership/*` → Thought leadership list + detail + topics
- `src/app/work/*` → Work list + detail pages
- `src/components/AskDoug.tsx` → Ask UI
- `src/app/api/ask/route.ts` → Ask API
- `src/app/api/contact/route.ts` → Contact API
