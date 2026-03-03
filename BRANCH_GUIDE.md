# Branch Organization

## Overview
This repo has been split into separate branches to keep mobile work isolated from production.

---

## 🚀 Production Branch (Use this for deployment to main)
**Branch:** `copilot/setup-vite-react-frontend`
- ✅ Backend validation flow
- ✅ Shared dev runner
- ✅ Environment configuration (.env support)
- ✅ Stripe integration (price IDs to be added)
- ✅ Health endpoints
- ❌ Mobile responsive UI (NOT included)

**Status:** Ready to merge to `main` PR #7

**Deploy with:**
```bash
git checkout copilot/setup-vite-react-frontend
npm run build
npm run start
```

---

## 📱 Mobile Branch (Experimental - separate feature)
**Branch:** `feature/mobile-ready-20260303-164412`
- ✅ Everything from production branch
- ✅ Responsive mobile layouts (Hero, Pricing, Navbar)
- ✅ Mobile-friendly breakpoints (sm:, lg:)
- ✅ Responsive text sizing & spacing
- ❌ Not yet merged to production

**Status:** Isolated feature branch for mobile enhancements

**Deploy with:**
```bash
git checkout feature/mobile-ready-20260303-164412
npm run build
npm run start
```

---

## 🔒 Backup Branch (Safety snapshot)
**Branch:** `backup/pre-mobile-work-20260303-164412`
- 📸 Snapshot of original work before mobile changes
- 🔐 Use only for recovery if needed

**Do not use for normal work.**

---

## Decision Guide

### I want to deploy production WITHOUT mobile changes:
```bash
git checkout copilot/setup-vite-react-frontend
npm run build
npm run start
```

### I want to deploy WITH mobile responsive features:
```bash
git checkout feature/mobile-ready-20260303-164412
npm run build
npm run start
```

### I want to merge production to main:
```bash
git checkout copilot/setup-vite-react-frontend
git pull origin copilot/setup-vite-react-frontend
# Create/update PR #7 with this branch
```

### I want to merge mobile later:
```bash
git checkout feature/mobile-ready-20260303-164412
git pull origin feature/mobile-ready-20260303-164412
# Create new PR from this branch when ready
```

---

## ✅ Testing Checklist

Before deploying either branch:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm test -- --run
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Test server locally:**
   ```bash
   npm run start
   # Visit http://localhost:10000
   # Check /api/health endpoint
   ```

---

## 🔑 Environment Variables
Both branches use the same `.env` file:
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PUBLISHABLE_KEY`
- `APP_BASE_URL`
- `PORT`

**Note:** Stripe price IDs intentionally left empty (to be configured later)

---

## 💾 All branches are backed up to remote
All three branches are pushed to GitHub for safety.
You cannot accidentally lose work—each branch is independent.
