# Saroj Baral — Personal Professional Website

A fast, static, mobile-first professional portfolio and consulting website for **Saroj Baral**, positioned around **MIS, Business Intelligence & Project Coordination**, with side offerings for **simple business websites** and **teaching/workshops**.

Live site URL: [https://sarojbaral.com.np](https://sarojbaral.com.np)

---

## 1. Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation / SSG, zero client-side JavaScript by default)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native `@theme` CSS tokens via `@tailwindcss/vite`
- **Content Collections**: Astro Content Collections with strict Zod schema validation
- **Format**: Markdown / MDX (`@astrojs/mdx`) for case studies and notes
- **Integrations**: `@astrojs/sitemap` (automated XML sitemap) and `@astrojs/rss` (automated RSS feed)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) (static hosting with custom `_headers` and `_redirects`)
- **Forms**: [Web3Forms](https://web3forms.com/) (serverless email delivery with honeypot spam protection)
- **Analytics**: Cloudflare Web Analytics (cookieless, privacy-preserving)

---

## 2. Getting Started (Local Development)

### Prerequisites
- Node.js 20+ (tested on Node 22/24)
- npm 9+

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (accessible at http://localhost:4321)
npm run dev

# 3. Build production static bundle (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 3. Managing Content & Data

All structured data lives in JSON files within `src/data/`:

| Data File | Description |
| :--- | :--- |
| `src/data/profile.json` | Name, headline, tagline, location, email, phone, LinkedIn, proof strip stats, and languages. |
| `src/data/experience.json` | Professional roles (Huawei, Consulting, GTL, Radio Nepal), dates, summaries, bullets, and awards. |
| `src/data/services.json` | Core services (MIS & Reporting, Document Control, Project Coordination) with pricing and scopes. |
| `src/data/website-packages.json` | SME website packages (Starter, Business, Custom) with pricing and feature lists. |
| `src/data/teaching.json` | Academic curriculum topics (Electronics, Management), engagement formats, and credentials. |
| `src/data/education.json` | Academic degrees (EMBA, BE) for the Curriculum Vitae. |

### How to Add a Case Study
1. Create a new `.mdx` file in `src/content/work/` (e.g., `src/content/work/new-tracker.mdx`).
2. Add frontmatter adhering to the Zod schema in `src/content/config.ts`:
   ```yaml
   ---
   title: "Title of Case Study"
   summary: "One or two sentence overview of the work."
   client_type: "Logistics & Fleet SME"
   year: 2024
   services: ["MIS & Reporting Support"]
   tools: ["Microsoft Excel", "Power Query"]
   result_metrics: ["Reporting cycle reduced from 3 days to 2 hours"]
   sample_file: "/samples/sample-mis-pack.txt"
   cover: "/og/default.png"
   confidential: true
   order: 5
   ---
   ```
3. Use the standardized sections:
   - `## Context`
   - `## Problem`
   - `## What I did`
   - `## Result`
   - `## What you can see`
4. End with `<CTA ... />` component linking to `/contact`.

### How to Add a Note
1. Create a `.md` or `.mdx` file in `src/content/notes/` (e.g., `src/content/notes/excel-validation-tips.md`).
2. Include the required frontmatter:
   ```yaml
   ---
   title: "Designing Excel Trackers That Survive Handover"
   description: "Why data validation rules and formula locking matter more than clever macros."
   pubDate: 2026-11-07
   tags: ["Excel", "MIS", "Operations"]
   draft: false
   ---
   ```
3. When `draft: false`, the note automatically populates `/notes`, `/notes/[slug]`, and `/rss.xml`.

### How to Update the CV PDF
Nothing to upload. Edit `src/data/*.json` (profile, experience, education, cv) and push.
GitHub Actions rebuilds all four PDFs (`dist/cv/`) on every deploy from the same data.
Locally: `npm run build && bash scripts/build-cv.sh dist` (needs Chrome). `/cv.pdf` redirects to the Modern Resume PDF.

---

## 4. Web3Forms Configuration

The contact form uses [Web3Forms](https://web3forms.com/) for zero-backend form submissions.
1. Visit [web3forms.com](https://web3forms.com/) and enter `sarojbaraal@gmail.com.np` to receive your free Access Key.
2. Open `src/components/ContactForm.astro`.
3. Replace `YOUR_WEB3FORMS_KEY` with your actual key:
   ```html
   <input type="hidden" name="access_key" value="your-actual-key-here" />
   ```

---

## 5. Cloudflare Pages Deployment

### Deploy Settings
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js Version**: `20` (or `22`) in Environment Variables (`NODE_VERSION = 20`)

The site includes pre-configured Cloudflare Pages files:
- `public/_headers`: Enforces strict security headers (CSP, HSTS, frame-ancestors, referrer policy).
- `public/_redirects`: Provides permanent 301/302 redirects for `/cv.pdf` and `/linkedin`.

---

## 6. Pre-Launch "Do Not Forget" Checklist

Before officially publishing to production, ensure these placeholders are updated:

- [ ] **Phone Number**: Confirm `+977-97010-83549` in `src/data/profile.json` and `src/pages/cv.astro`.
- [ ] **LinkedIn URL**: Replace `https://www.linkedin.com/in/sarojbaraal` in `src/data/profile.json` and `public/_redirects`.
- [ ] **Web3Forms Key**: Replace `YOUR_WEB3FORMS_KEY` in `src/components/http://192.sarojbaral.com.np/contact`.
- [ ] **Cal.com Meeting Link**: Replace `https://cal.com/sarojbaral` in `src/pages/contact.astro`.
- [ ] **Cloudflare Analytics Token**: Uncomment and insert your token in `src/layouts/BaseLayout.astro`.
- [ ] **Custom Domain**: Connect `sarojbaral.com.np` in the Cloudflare Pages custom domain manager.
