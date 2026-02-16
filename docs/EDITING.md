# Editing guide (quick)

This repo is set up so you can edit most “marketing” content in **one place**.

## 1) Update the home page (identity, focus/industries/roles, CTAs)

Edit:

- `src/lib/site.ts`

Look for:

- `site.profile` — name/role lines + the three columns (Focus / Industries / Roles)
- `site.ctas` — URLs used by the home page buttons

Common edits:

- **Status line** (e.g. “Open to relocation”, add city/state later)
  - `site.profile.statusLine`
  - `site.profile.locationLine`
- **Headline/subheadline** under “Ask Doug”
  - `site.profile.headline`
  - `site.profile.subheadline`
- **Buttons**
  - `site.ctas.linkedin`
  - `site.ctas.resume` (expects `public/resume.pdf`)
  - `site.ctas.work`
  - `site.ctas.thoughtLeadership`
  - `site.ctas.contact`

## 2) Update the Ask Doug UI

Edit:

- `src/components/AskDoug.tsx`

Things you’ll likely tweak:

- Textarea placeholder
- Example prompt chips
- Card title + description

### Ask Doug “mode”

`ASK_DOUG_MODE` controls how the widget behaves.

In `.env.local`:

- `ASK_DOUG_MODE=preview` (default)
- `ASK_DOUG_MODE=search` (local grounded keyword search)
- `ASK_DOUG_MODE=rag` (reserved for later)
- `ASK_DOUG_MODE=off` (hides the component)

## 3) Update navigation

Edit:

- `src/app/layout.tsx`

That’s where the top nav links live.

## 4) Resume / CV

Put your PDF here:

- `public/resume.pdf`

The “Download CV” button opens it in a new tab.

## 5) Writing structure

Routes:

- `/thought-leadership` — landing page (featured article + topic cards)
- `/thought-leadership/topic/[topic]` — topic page (lists articles for that topic)
- `/thought-leadership/[slug]` — article page

Legacy:

- `/writing` redirects to `/thought-leadership`

Topics live in:

- `src/lib/topics.ts`

## 6) Content editing

### Local editor (Keystatic)

When running locally, open:

- `/keystatic`

Create/edit:

- Articles
- Work items

### File-based content

Content is stored under:

- `content/articles/*`
- `content/work/*`

(Exact file structure depends on Keystatic field definitions.)

## 7) Contact form

The contact form is at:

- `/contact`

Handler:

- `src/app/api/contact/route.ts`

You can wire this to an email service (Resend is stubbed in) by adding environment variables.

## 8) Styling (global CSS)

Primary styling lives here:

- `src/app/globals.css`

This project uses **semantic class names** + Tailwind `@apply`, so you can change the look in one place.

Common classes:

- Buttons: `.btn`, `.btn-light`, `.btn-ghost`, `.btn-outline`, `.btn-primary`
- Header/nav: `.site-header`, `.site-nav`, `.nav-link`, `.site-brand`
- Page containers: `.container`, `.container-narrow`, `.container-form`, `.page`, `.page-stack`
- Topic cards: `.topic-grid`, `.topic-card`, `.topic-card--indigo|emerald|amber|rose|sky`
- Work cards: `.work-grid`, `.work-card`, `.work-card--featured`
- Detail pages (articles + case studies): `.detail-layout`, `.detail-aside`, `.detail-content`

Tip: If you want *one* element to look different (without affecting similar elements), create a new semantic class in
`globals.css` (under `@layer components`) and apply it in the JSX.
