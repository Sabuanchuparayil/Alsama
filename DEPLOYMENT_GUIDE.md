# AL SAMA - Deployment Guide

Complete guide for deploying the AL SAMA Luxury Tourism & Chauffeur application to Railway.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Railway Deployment](#railway-deployment)
3. [Database Setup](#database-setup)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)
7. [Alternative Deployment Options](#alternative-deployment-options)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account (for connecting to Railway)
- ✅ Railway account (sign up at [railway.app](https://railway.app))
- ✅ Node.js 18+ installed locally (for running migrations)
- ✅ Git installed and repository pushed to GitHub

---

## Railway Deployment

### Step 1: Prepare Your Repository

1. **Ensure your code is committed and pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify your repository structure:**
   - `package.json` exists
   - `prisma/schema.prisma` exists
   - `next.config.js` exists
   - `.gitignore` includes `.env*` files

### Step 2: Create Railway Project

1. **Login to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your AL SAMA repository
   - Railway will automatically detect Next.js

3. **Configure Build Settings:**
   Railway should auto-detect, but verify:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `/` (root)

### Step 3: Add PostgreSQL Database

1. **Add PostgreSQL Service:**
   - In your Railway project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will create a PostgreSQL instance

2. **Note the Database URL:**
   - Click on the PostgreSQL service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` (you'll need this)

---

## Database Setup

### Step 1: Run Database Migrations

You have two options:

#### Option A: Run Migrations Locally (Recommended)

1. **Set up local environment:**
   ```bash
   # Create .env.local file
   echo "DATABASE_URL=\"your-railway-postgres-url\"" > .env.local
   ```

2. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

   Or for development:
   ```bash
   npx prisma migrate dev --name init
   ```

#### Option B: Run Migrations via Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Link your project:**
   ```bash
   railway link
   ```

3. **Run migrations:**
   ```bash
   railway run npx prisma migrate deploy
   ```

### Step 2: Create Admin User

Create a script to add an admin user:

**Create `scripts/create-admin.ts`:**
```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@alsama.ae';
  const password = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: 'admin',
      },
    });
    
    console.log('✅ Admin user created successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
```

**Run the script:**
```bash
# Set environment variables
export ADMIN_EMAIL="admin@alsama.ae"
export ADMIN_PASSWORD="YourSecurePassword123!"

# Run with ts-node or tsx
npx tsx scripts/create-admin.ts

# Or via Railway CLI
railway run npx tsx scripts/create-admin.ts
```

---

## Environment Variables

### Required Variables

Set these in Railway Dashboard → Your Service → Variables:

#### Database
```
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
```
*(Automatically set by Railway PostgreSQL service)*

#### NextAuth
```
NEXTAUTH_SECRET=your-random-secret-key-here-min-32-chars
NEXTAUTH_URL=https://your-app-name.railway.app
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### Optional: Supabase Storage (for image uploads)
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_STORAGE_BUCKET=alsama-images
```

#### Optional: Email Service (Resend)
```
RESEND_API_KEY=re_your_api_key_here
```

### Setting Variables in Railway

1. Go to your Railway project
2. Click on your Next.js service
3. Go to "Variables" tab
4. Click "New Variable"
5. Add each variable name and value
6. Click "Add"

**Important:** After adding variables, Railway will automatically redeploy your application.

---

## Post-Deployment

### Step 1: Verify Deployment

1. **Check Railway Dashboard:**
   - Go to your service
   - Check "Deployments" tab for successful build
   - Note your app URL (e.g., `https://alsama-production.up.railway.app`)

2. **Test the Application:**
   - Visit your app URL
   - Check homepage loads
   - Test navigation
   - Verify API endpoints

### Step 2: Set Up Custom Domain (Optional)

1. **In Railway Dashboard:**
   - Go to your service → "Settings"
   - Scroll to "Domains"
   - Click "Generate Domain" or "Add Custom Domain"
   - Follow DNS configuration instructions

2. **Update NEXTAUTH_URL:**
   - Update `NEXTAUTH_URL` variable to your custom domain
   - Railway will redeploy automatically

### Step 3: Initial Content Setup

1. **Access Admin Panel:**
   - Go to `https://your-domain.com/admin/login`
   - Login with admin credentials

2. **Add Initial Content:**
   - Add vehicles via `/admin/content/vehicles`
   - Add services via `/admin/content/services`
   - Configure pages via `/admin/content/pages`

### Step 4: Configure Supabase Storage (Optional)

If using Supabase for image storage:

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note your project URL and anon key

2. **Create Storage Bucket:**
   - Go to Storage in Supabase dashboard
   - Create bucket named `alsama-images`
   - Set to public

3. **Add to Railway Variables:**
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_STORAGE_BUCKET=alsama-images`

---

## Troubleshooting

### Build Fails

**Error: Prisma Client not generated**
```bash
# Solution: Add postinstall script (already in package.json)
# Railway will run: npm install → prisma generate → npm run build
```

**Error: TypeScript errors**
```bash
# Check locally first:
npm run build
# Fix any TypeScript errors before deploying
```

### Database Connection Issues

**Error: Can't reach database**
- Verify `DATABASE_URL` is set correctly
- Check PostgreSQL service is running in Railway
- Ensure database is in same region as your app

**Error: Migration failed**
```bash
# Run migrations manually:
railway run npx prisma migrate deploy
```

### Application Not Loading

**404 Errors:**
- Check Railway deployment logs
- Verify build completed successfully
- Check `NEXTAUTH_URL` matches your domain

**500 Errors:**
- Check Railway logs: Service → "Deployments" → Click deployment → "View Logs"
- Verify all environment variables are set
- Check database connection

### Admin Login Not Working

**Can't login:**
- Verify admin user exists in database
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Check Railway logs for authentication errors

**Create admin user:**
```bash
railway run npx tsx scripts/create-admin.ts
```

---

## Railway-Specific Configuration

### railway.json (Already Created)

The `railway.json` file is already configured:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Build Optimization

Railway will automatically:
1. Install dependencies (`npm install`)
2. Generate Prisma Client (`prisma generate` via postinstall)
3. Build Next.js app (`npm run build`)
4. Start production server (`npm start`)

---

## Alternative Deployment Options

### Vercel Deployment

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

2. **Configure:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables:**
   - Add all variables from Railway section
   - Use Vercel's PostgreSQL or external database

4. **Deploy:**
   - Vercel will auto-deploy on push

### Docker Deployment

**Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**Update `next.config.js`:**
```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // For Docker
}

module.exports = nextConfig
```

---

## Monitoring & Maintenance

### Railway Logs

- **View Logs:** Service → Deployments → Click deployment → View Logs
- **Stream Logs:** Use Railway CLI: `railway logs`

### Database Backups

Railway PostgreSQL includes automatic backups:
- Go to PostgreSQL service → Backups
- Manual backups available
- Restore from backup if needed

### Updates & Redeployments

**Automatic:**
- Railway auto-deploys on git push to main branch

**Manual:**
- Railway Dashboard → Service → "Redeploy"
- Or via CLI: `railway up`

### Scaling

Railway auto-scales, but you can:
- Set resource limits in service settings
- Upgrade plan for more resources
- Monitor usage in dashboard

---

## Security Checklist

- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] `DATABASE_URL` is secure (Railway handles this)
- [ ] Admin password is changed from default
- [ ] Environment variables are not committed to git
- [ ] HTTPS is enabled (Railway default)
- [ ] CORS is configured if needed
- [ ] Rate limiting considered for production
- [ ] Error logging/monitoring set up

---

## Quick Reference

### Essential Commands

```bash
# Local development
npm run dev

# Build locally
npm run build

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Create admin user
npx tsx scripts/create-admin.ts

# Railway CLI
railway login
railway link
railway up
railway logs
railway run <command>
```

### Important URLs

- **Railway Dashboard:** https://railway.app
- **Your App:** https://your-app-name.railway.app
- **Admin Login:** https://your-app-name.railway.app/admin/login

---

## Support

If you encounter issues:

1. Check Railway logs
2. Verify environment variables
3. Test database connection
4. Review this guide's troubleshooting section
5. Check Railway status: https://status.railway.app

---

## Next Steps After Deployment

1. ✅ Test all pages and functionality
2. ✅ Add initial content (vehicles, services)
3. ✅ Configure custom domain (optional)
4. ✅ Set up monitoring/analytics
5. ✅ Configure email notifications
6. ✅ Test booking flow end-to-end
7. ✅ Set up regular database backups
8. ✅ Document admin credentials securely

---

**Last Updated:** 2024
**Version:** 1.0
