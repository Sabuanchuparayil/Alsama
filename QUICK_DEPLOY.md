# Quick Railway Deployment Commands

## Prerequisites
✅ Railway project created: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
✅ PostgreSQL installed
✅ Code pushed to GitHub

## Step-by-Step Commands

### 1. Link Railway Project (Run this first - it's interactive)
```bash
cd "/Users/sabuj/Desktop/Alsama New"
railway link
# Select: "Sabu J's Projects" → "alsama" (or your project name)
```

### 2. Get Database URL
```bash
# Option A: From Railway Dashboard
# Go to PostgreSQL service → Variables → Copy DATABASE_URL

# Option B: Via CLI (after linking)
railway variables --service <postgres-service-name>
```

### 3. Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
# Copy the output
```

### 4. Set Environment Variables

**Via Railway Dashboard (Easiest):**
1. Go to your Next.js service in Railway
2. Variables tab → Add:
   - `DATABASE_URL` = (from PostgreSQL service)
   - `NEXTAUTH_SECRET` = (from step 3)
   - `NEXTAUTH_URL` = (will set after domain generation)

**Via CLI:**
```bash
railway variables set DATABASE_URL="postgresql://..."
railway variables set NEXTAUTH_SECRET="your-generated-secret"
```

### 5. Generate Domain & Set NEXTAUTH_URL

**Via Railway Dashboard:**
1. Next.js service → Settings → Domains
2. Click "Generate Domain"
3. Copy the domain (e.g., `alsama-production.up.railway.app`)
4. Set variable: `NEXTAUTH_URL=https://alsama-production.up.railway.app`

**Via CLI:**
```bash
railway domain
railway variables set NEXTAUTH_URL="https://your-domain.railway.app"
```

### 6. Run Database Migrations
```bash
railway run npx prisma migrate deploy
```

### 7. Create Admin User
```bash
export ADMIN_EMAIL="admin@alsama.ae"
export ADMIN_PASSWORD="YourSecurePassword123!"
railway run npx tsx scripts/create-admin.ts
```

### 8. Deploy
```bash
railway up
```

### 9. Verify
- Visit your Railway app URL
- Test: `https://your-app.railway.app`
- Admin: `https://your-app.railway.app/admin/login`

---

## All-in-One Script (After Linking)

After you've linked the project (`railway link`), you can run:

```bash
./scripts/deploy-railway.sh
```

This will automate steps 2-8.

---

## Quick Checklist

- [ ] `railway link` (interactive - select your project)
- [ ] Get DATABASE_URL from PostgreSQL service
- [ ] Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Set variables in Railway dashboard
- [ ] Generate domain in Railway dashboard
- [ ] Set NEXTAUTH_URL with domain
- [ ] Run: `railway run npx prisma migrate deploy`
- [ ] Run: `railway run npx tsx scripts/create-admin.ts`
- [ ] Deploy: `railway up`
- [ ] Test your app!
