# FlameLens Vercel Deployment Guide

This guide provides step-by-step instructions to deploy FlameLens to [Vercel](https://vercel.com) with high reliability and zero downtime.

---

## 1. Prerequisites
- A [GitHub](https://github.com), [GitLab](https://gitlab.com), or [Bitbucket](https://bitbucket.org) account.
- A free or Pro [Vercel](https://vercel.com) account.
- The `flamelens` repository pushed to your remote Git host.

---

## 2. Deploying via Vercel Web Dashboard (Recommended)

### Step 1: Import the Repository
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **"Add New..."** button in the top right and select **"Project"**.
3. Under **Import Git Repository**, locate your repository and click **Import**.

### Step 2: Configure Project Settings
- **Project Name**: `flamelens` (or your preferred project name).
- **Framework Preset**: **Next.js** (automatically detected).
- **Root Directory**: `./` (leave default).
- **Build Command**: `npm run build` (leave default).
- **Output Directory**: `.next` (leave default).
- **Install Command**: `npm install` (leave default).

### Step 3: Configure Environment Variables
Expand the **Environment Variables** section. While FlameLens runs with 100% functionality using its offline fallback data, you can add live API keys:

| Key | Value Example | Notes |
| :--- | :--- | :--- |
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | *(Optional)* Enables live Claude 3.5 Sonnet generation. If omitted, the app uses its built-in rule-based AI engine. |
| `ANTHROPIC_MODEL` | `claude-sonnet-4-6` | *(Optional)* Anthropic model override. |
| `NASA_API_KEY` | `your_nasa_api_key` | *(Optional)* Official NASA Open Data API key. Defaults to `"DEMO_KEY"`. |
| `SITE_URL` | `https://your-domain.vercel.app` | *(Optional)* Canonical URL for sitemap.xml and robots.txt. |

### Step 4: Deploy
1. Click **Deploy**.
2. Vercel will initiate the build pipeline:
   - Installing dependencies (`npm install`)
   - Compiling TypeScript & ESLint check
   - Pre-rendering all 54 static and dynamic routes
3. In approximately 60 seconds, your deployment will be marked **Ready** with a production `.vercel.app` URL.

---

## 3. Deploying via Vercel CLI (Alternative)

If you have the Vercel CLI installed globally:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Log in to your Vercel account
vercel login

# Link and deploy preview
vercel

# Deploy directly to production
vercel --prod
```

---

## 4. Post-Deployment Verification

Once deployed, visit your live URL and test the following key paths:
1. `https://<your-project>.vercel.app/` — Ensure 3D/CSS flame hero and APOD load.
2. `https://<your-project>.vercel.app/experiments` — Test instant filtering and CSV export.
3. `https://<your-project>.vercel.app/rankings` — Move weight sliders and observe live score recalculation.
4. `https://<your-project>.vercel.app/compare` — Compare two experiments side by side.
5. `https://<your-project>.vercel.app/insights` — Ask a question to verify AI/rule response in English and Hindi.
6. `https://<your-project>.vercel.app/safety-guide` — Test the 2D flame simulator under 0g, Moon, and Mars.
7. `https://<your-project>.vercel.app/manifest.webmanifest` — Confirm PWA manifest returns JSON.
8. `https://<your-project>.vercel.app/sitemap.xml` — Confirm dynamic sitemap lists all 54 routes.

---

## 5. Troubleshooting & FAQ

* **Q: Will the app crash if I don't provide an Anthropic API key?**
  * **A**: Absolutely not. FlameLens was built with fault-tolerant defensive programming. When `ANTHROPIC_API_KEY` is missing or the external API fails, `/api/explain` seamlessly generates a grounded, rule-based answer from the 22-experiment dataset.
* **Q: What if the NASA APOD API rate-limits?**
  * **A**: The app caches APOD responses and automatically serves high-resolution offline fallback imagery and descriptions from the NASA Physical Sciences archive.
