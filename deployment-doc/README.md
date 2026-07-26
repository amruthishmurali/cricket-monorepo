# 🚀 CricPulse – Deployment Guide

This document explains **exactly** how to deploy the three services of CricPulse to free hosting platforms using GitHub.

| Service              | Platform   | URL Pattern                          |
|----------------------|------------|--------------------------------------|
| Frontend (React)     | Vercel     | `https://<project>.vercel.app`       |
| Backend (NestJS)     | Render     | `https://cricpulse-backend-xxxx.onrender.com` |
| Analytics (FastAPI)  | Render     | `https://cricpulse-analytics.onrender.com`    |
| Database             | Supabase   | Already hosted                       |

> **Important:** Never commit real API keys, service role keys, or secrets. Use environment variables only.

---

## 📁 Required Files in the Repository

```
cricket-monorepo/
├── frontend/
├── backend/
├── analytics/
├── render.yaml                 ← Used by Render Blueprint
├── DEPLOYMENT.md               ← This file
└── README.md
```

---

## 1. Render Deployment (Backend + Analytics)

### 1.1 Final Working `render.yaml`

Place this file in the **root** of the repository:

```yaml
services:
  # ======================
  # FastAPI Analytics
  # ======================
  - type: web
    name: cricpulse-analytics
    runtime: python
    plan: free
    rootDir: analytics
    buildCommand: pip install -r requirements.txt
    startCommand: python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: "3.12.0"
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false

  # ======================
  # NestJS Backend
  # ======================
  - type: web
    name: cricpulse-backend
    runtime: node
    plan: free
    rootDir: backend
    buildCommand: npm install --include=dev && npm run build
    startCommand: npm run start:prod
    envVars:
      - key: NODE_ENV
        value: production
      - key: NODE_VERSION
        value: "22.14.0"
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_SERVICE_ROLE_KEY
        sync: false
      - key: ANALYTICS_URL
        sync: false
```

### 1.2 Required Scripts in `backend/package.json`

```json
"scripts": {
  "build": "nest build",
  "start:prod": "node dist/main"
}
```

### 1.3 Required Packages in `analytics/requirements.txt`

```txt
fastapi
uvicorn
supabase
python-dotenv
```

### 1.4 Deploy Steps on Render

1. Go to [https://render.com](https://render.com) and sign in with GitHub.
2. Click **New → Blueprint**.
3. Select the `cricket-monorepo` repository.
4. Render will detect `render.yaml`.
5. Click **Apply**.
6. After the services are created, open each service → **Environment** tab and manually add:

   | Key                          | Description                          |
   |------------------------------|--------------------------------------|
   | `SUPABASE_URL`               | Your Supabase project URL            |
   | `SUPABASE_SERVICE_ROLE_KEY`  | Your Supabase service_role key       |
   | `ANALYTICS_URL` (backend only) | Full URL of analytics service (see below) |

7. For `ANALYTICS_URL`, use the **full URL** of the analytics service, for example:

   ```
   https://cricpulse-analytics.onrender.com
   ```

   > Do **not** use only the hostname. Always include `https://`.

8. Save the environment variables and trigger a **Manual Deploy** if needed.

---

## 2. Common Render Errors & Fixes (Debugging History)

### Error 1: `uvicorn: command not found`

**Cause:** `uvicorn` binary not found in PATH.

**Fix:**
- Ensure `uvicorn` is listed in `analytics/requirements.txt`.
- Use this start command:
  ```yaml
  startCommand: python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT
  ```

---

### Error 2: `nest: not found` / `could not determine executable to run`

**Cause:** `@nestjs/cli` is in `devDependencies` and not available during build.

**Fix:**
```yaml
buildCommand: npm install --include=dev && npm run build
```

Also make sure `backend/package.json` has:
```json
"build": "nest build",
"start:prod": "node dist/main"
```

---

### Error 3: `Supabase URL or Service Role Key is missing in .env`

**Cause:** Environment variables were not set (or not saved) in the Render dashboard.

**Fix:**
1. Open the service → **Environment**.
2. Manually add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Save → Manual Deploy.

---

### Error 4: Only one service redeploys on git push

**Cause:** Render only rebuilds a service when files inside its `rootDir` change.

| Service               | Redeploys when files change in |
|-----------------------|--------------------------------|
| `cricpulse-backend`   | `backend/`                     |
| `cricpulse-analytics` | `analytics/`                   |

**How to force both services to redeploy:**
- Make a small change inside both folders, **or**
- Use **Manual Deploy** on the service that did not update.

---

### Error 5: `Failed to get prediction from Analytics service`

**Cause:** `ANALYTICS_URL` is missing the `https://` protocol or points to the wrong host.

**Fix:**
Set the full URL in the backend environment variables:
```
https://cricpulse-analytics.onrender.com
```

---

### Error 6: Node version warning from `@supabase/supabase-js`

**Cause:** Node 20 is deprecated for newer versions of the Supabase client.

**Fix:**
```yaml
- key: NODE_VERSION
  value: "22.14.0"
```

---

## 3. Vercel Deployment (Frontend)

### 3.1 Recommended Method – Vercel Dashboard (Easiest)

1. Go to [https://vercel.com](https://vercel.com) and login with GitHub.
2. Click **Add New… → Project**.
3. Import the `cricket-monorepo` repository.
4. Configure:

   | Setting              | Value                |
   |----------------------|----------------------|
   | Framework Preset     | Vite                 |
   | Root Directory       | `frontend`           |
   | Build Command        | `npm run build`      |
   | Output Directory     | `dist`               |
   | Install Command      | `npm install`        |

5. Add Environment Variable:

   | Key             | Value                                      |
   |-----------------|--------------------------------------------|
   | `VITE_API_URL`  | `https://cricpulse-backend-xxxx.onrender.com` |

   (Use the real URL of your Render backend service)

6. Click **Deploy**.

---

### 3.2 Frontend Code Change Required

In `frontend/src/api/services.ts`:

```ts
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

This allows the same code to work locally and in production.

---

### 3.3 Update CORS in NestJS

After you get the Vercel URL, update `backend/src/main.ts`:

```ts
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app',   // ← replace with real Vercel URL
  ],
  credentials: true,
});
```

Then commit and push so the backend redeploys with the new CORS rule.

---

### 3.4 Optional – Deploy Frontend with GitHub Actions

If you prefer GitHub Actions instead of the Vercel UI:

1. Create a Vercel token at [https://vercel.com/account/tokens](https://vercel.com/account/tokens).
2. In the Vercel project → Settings → General, copy **Project ID** and **Org ID**.
3. In GitHub repo → Settings → Secrets and variables → Actions, add:

   | Secret Name         | Description        |
   |---------------------|--------------------|
   | `VERCEL_TOKEN`      | Vercel token       |
   | `VERCEL_ORG_ID`     | Organization ID    |
   | `VERCEL_PROJECT_ID` | Project ID         |

4. Create the file `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
      - '.github/workflows/deploy-frontend.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
```

> Most teams prefer the Vercel Dashboard method (Section 3.1) because it is simpler and more reliable.

---

## 4. Final Checklist After Deployment

| Check                                      | How to verify                                      |
|--------------------------------------------|----------------------------------------------------|
| Analytics is live                          | Open `https://cricpulse-analytics.onrender.com/docs` |
| Backend is live                            | Open `https://cricpulse-backend-xxxx.onrender.com/players` |
| Frontend is live                           | Open your Vercel URL                               |
| Players list loads                         | Frontend shows players from Supabase               |
| Search works                               | Search for a player name                           |
| Match Prediction works                     | Select two teams → Predict Winner                  |
| CORS is correct                            | No CORS errors in browser console                  |
| `VITE_API_URL` is set                      | Vercel → Settings → Environment Variables          |
| `ANALYTICS_URL` is full URL                | Backend Environment tab on Render                  |

---

## 5. Important Free Tier Notes

- **Render free services sleep after ~15 minutes** of inactivity. The first request after sleep can take 30–60 seconds.
- **Vercel** free tier is very generous for frontend.
- **Supabase** free tier has limits on database size, bandwidth, and monthly active users. Monitor usage under **Settings → Usage**.

---

## 6. How to Redeploy After Code Changes

| What you changed              | What happens                                      |
|-------------------------------|---------------------------------------------------|
| Files inside `frontend/`      | Vercel auto-deploys (if connected)                |
| Files inside `backend/`       | Only `cricpulse-backend` redeploys on Render      |
| Files inside `analytics/`     | Only `cricpulse-analytics` redeploys on Render    |
| `render.yaml`                 | Both Render services may sync                     |
| Environment variables only    | Use **Manual Deploy** on the affected service     |

---

## 7. Quick Debug Flow When Something Breaks

1. **Frontend shows “Failed to load…”**
   - Check browser console for CORS or network errors.
   - Verify `VITE_API_URL` in Vercel.
   - Open the backend URL directly in the browser.

2. **Backend returns 500 on prediction**
   - Check `ANALYTICS_URL` (must include `https://`).
   - Open the analytics service `/docs` page to confirm it is awake.
   - Check backend logs on Render.

3. **Service fails to build on Render**
   - Read the full build logs.
   - Common fixes are listed in Section 2.

4. **Service is Live but responds slowly**
   - Free tier cold start. Wait 30–60 seconds and retry.

---

## 8. Summary of Working Configuration

| Item                        | Value / Setting                                      |
|-----------------------------|------------------------------------------------------|
| Analytics start command     | `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Backend build command       | `npm install --include=dev && npm run build`         |
| Backend start command       | `npm run start:prod`                                 |
| Node version on Render      | `22.14.0`                                            |
| Python version on Render    | `3.12.0`                                             |
| Frontend framework          | Vite                                                 |
| Frontend root directory     | `frontend`                                           |
| Frontend env variable       | `VITE_API_URL`                                       |

---

**Maintainer note:**  
Environment variable values (Supabase keys, service URLs, etc.) must be obtained from the project owner and never committed to the repository.
```
