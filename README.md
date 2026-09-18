# Interiors by DeX — SEO Performance Portal

A clean, executive-level SEO performance dashboard for **Interiors by DeX**, built with Next.js 14 (App Router) and Tailwind CSS.

Designed to explain SEO growth, localized Chennai search rankings, and homeowner discovery trends in plain English.

---

## Features

- **Executive Plain-English Summary**: Translates impressions and ranking trends into clear, positive business narratives.
- **Key Visibility Metrics**: Google Search Impressions, Website Visits (Clicks), Click-Through Rate (CTR), and Average Google Rank.
- **Top Discovery Queries**: Real-world searches bringing Chennai homeowners to DeX (*modular kitchen chennai*, *interior designers in omr*, *3bhk interior design cost*).
- **Top Performing Landing Pages**: Tracks exposure across money hubs and micro-market pages.
- **Technical SEO & Google Maps Matrix**: Real-time status of Schema.org entity validation (synced to 90 five-star reviews), suburb footprint, and XML sitemaps.
- **Monthly Work Log**: Transparent changelog of optimization efforts and milestones.
- **Zero Cost Hosting**: Optimized for Vercel Hobby plan (100% free serverless execution, no database required).

---

## Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Cloud Service Account credentials:
   - `GSC_CLIENT_EMAIL`: Your service account email
   - `GSC_PRIVATE_KEY`: Your service account private key (with `\n` linebreaks)
   - `GSC_SITE_URL`: `sc-domain:interiorsbydex.com` (or `https://interiorsbydex.com/`)

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy to Vercel (1-Click)

1. Import this repository into [Vercel](https://vercel.com).
2. Under **Project Settings → Environment Variables**, add:
   - `GSC_CLIENT_EMAIL`
   - `GSC_PRIVATE_KEY`
   - `GSC_SITE_URL`
3. Click **Deploy**.

---

## Enabling Google Search Console API

If you see a notice to enable the API, ensure the **Google Search Console API** is enabled in your Google Cloud Project:
👉 [Enable Google Search Console API](https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview)
