# 09 — Deployment

## 9.1 Pre-Deploy Checklist

Complete every item before deploying.

### Content
- [ ] `src/data/config.ts` — real name, title, tagline, bio, skills, socials
- [ ] `src/data/projects.ts` — at least 2–3 real projects
- [ ] `src/data/education.ts` — your education filled in
- [ ] `src/data/experience.ts` — at least 1 experience entry (or remove section)
- [ ] `public/og-image.png` — exists and is 1200×630px
- [ ] `public/favicon.ico` and related icons — exists
- [ ] `public/resume.pdf` — your resume (if using resume link)

### Code
- [ ] `npm run build` passes with zero errors
- [ ] `npm run lint` passes with zero errors
- [ ] All TypeScript errors resolved (`npx tsc --noEmit`)
- [ ] No `console.log` left in production code
- [ ] `NEXT_PUBLIC_SITE_URL` placeholder updated in all files

---

## 9.2 Vercel Deployment

**Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit — bleach portfolio"
gh repo create bleach-portfolio --public --push
# or use GitHub Desktop / GitHub web UI
```

**Step 2: Import to Vercel**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework: Next.js (auto-detected)
4. Root directory: `.` (default)
5. Do not deploy yet — set environment variables first

**Step 3: Set Environment Variables in Vercel**

In the Vercel project settings → Environment Variables, add:

| Key | Value | Environment |
|---|---|---|
| `CODOLIO_USERNAME` | `dipesh4000` | Production, Preview, Development |
| `NEXT_PUBLIC_GITHUB_USERNAME` | `dipesh4000` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Production only |

For preview deployments, set `NEXT_PUBLIC_SITE_URL` to your Vercel preview URL or leave it as `https://your-project.vercel.app`.

**Step 4: Deploy**
Click Deploy. First deployment takes ~2 minutes.

---

## 9.3 Custom Domain (Optional)

1. In Vercel project → Settings → Domains
2. Add your domain (e.g. `dipesh.dev`)
3. Follow DNS instructions (add CNAME or A record at your registrar)
4. Once domain is live, update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to the real domain
5. Redeploy

---

## 9.4 Verify Codolio API in Production

After deploying, test the API route:

```
https://your-domain.vercel.app/api/codolio
```

Expected: JSON response with `githubHeatmap` and `dsaStats` arrays.

If you see `{ error: "Failed to fetch Codolio data" }`:
- Check Vercel function logs (Project → Functions → `/api/codolio`)
- Verify `CODOLIO_USERNAME` env var is set
- Check if Codolio API is reachable from Vercel's servers (it should be)

---

## 9.5 Post-Deploy SEO Steps

1. **Google Search Console**
   - Go to https://search.google.com/search-console
   - Add your domain as a property
   - Verify ownership (Vercel makes this easy — use DNS verification)
   - Submit your sitemap: `https://your-domain.com/sitemap.xml`

2. **Test OG tags**
   - https://opengraph.xyz → enter your URL
   - Check that og-image, title, description all appear correctly

3. **Lighthouse audit**
   - Open Chrome DevTools → Lighthouse tab
   - Run on your deployed URL (not localhost)
   - Run in incognito mode
   - Target: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO = 100

---

## 9.6 Automatic Redeploys

Every `git push` to your main branch triggers a Vercel redeploy automatically. No manual steps needed after initial setup.

For content updates (new project, change bio):
1. Edit the relevant file in `src/data/`
2. `git add . && git commit -m "update content" && git push`
3. Vercel deploys in ~90 seconds

---

## 9.7 Environment: Local vs Production

| Setting | Local (`.env.local`) | Vercel (env vars) |
|---|---|---|
| `CODOLIO_USERNAME` | `dipesh4000` | `dipesh4000` |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://your-domain.com` |
| `NEXT_PUBLIC_GITHUB_USERNAME` | `dipesh4000` | `dipesh4000` |

Never commit `.env.local` — it's in `.gitignore` by default with `create-next-app`.

---

## 9.8 Final Launch Checklist

- [ ] Site loads at your domain without errors
- [ ] All sections visible when scrolling
- [ ] Navbar scroll-spy works correctly
- [ ] GitHub heatmap loads (golden colour scale, not green)
- [ ] DSA activity shows real numbers from Codolio
- [ ] Project cards show correct data and links open
- [ ] OG image appears when sharing link on LinkedIn/WhatsApp
- [ ] Lighthouse Performance ≥ 90
- [ ] No broken links (all repo/live URLs valid)
- [ ] Mobile layout looks correct at 375px and 390px

---

You're done. The portfolio is live.
