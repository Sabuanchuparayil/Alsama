# Railway Deployment - Step by Step Guide

Since Railway CLI requires interactive input, follow these steps to complete your deployment.

## ✅ Already Completed
- ✅ Railway project created
- ✅ PostgreSQL database installed
- ✅ Code pushed to GitHub

## 📋 Remaining Steps

### Step 1: Link Railway Project (Interactive)

Open your terminal and run:

```bash
cd "/Users/sabuj/Desktop/Alsama New"
railway link
```

You'll be prompted to:
1. Select your workspace (choose "Sabu J's Projects")
2. Select your project (choose "alsama" or the project you created)

### Step 2: Get Database URL from Railway Dashboard

1. Go to [Railway Dashboard](https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1)
2. Click on your **PostgreSQL** service
3. Go to the **Variables** tab
4. Copy the `DATABASE_URL` value

### Step 3: Set Environment Variables

You can set variables via Railway Dashboard or CLI:

#### Option A: Via Railway Dashboard (Recommended)

1. In your Railway project, click on your **Next.js service** (or create one if it doesn't exist)
2. Go to **Variables** tab
3. Add these variables:

```
DATABASE_URL=<paste from PostgreSQL service>
NEXTAUTH_SECRET=<generate using: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app-name.railway.app
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### Option B: Via Railway CLI

After linking the project:

```bash
# Get DATABASE_URL from PostgreSQL service
railway variables --service <postgres-service-name>

# Set variables
railway variables set NEXTAUTH_SECRET="your-generated-secret"
railway variables set NEXTAUTH_URL="https://your-app.railway.app"
```

### Step 4: Generate Railway Domain

1. In Railway Dashboard, click on your **Next.js service**
2. Go to **Settings** tab
3. Scroll to **Domains** section
4. Click **Generate Domain** or **Add Custom Domain**
5. Copy the generated domain (e.g., `alsama-production.up.railway.app`)
6. Update `NEXTAUTH_URL` variable with this domain

### Step 5: Run Database Migrations

After linking the project, run:

```bash
railway run npx prisma migrate deploy
```

This will create all database tables.

### Step 6: Create Admin User

```bash
# Set admin credentials
export ADMIN_EMAIL="admin@alsama.ae"
export ADMIN_PASSWORD="YourSecurePassword123!"

# Create admin user
railway run npx tsx scripts/create-admin.ts
```

**Important:** Change the password after first login!

### Step 7: Deploy Application

Railway will automatically deploy when you:
- Push code to GitHub (if connected)
- Or manually trigger: `railway up`

### Step 8: Verify Deployment

1. Visit your Railway app URL
2. Test the homepage
3. Go to `/admin/login` and login with admin credentials
4. Add initial content (vehicles, services)

## 🚀 Quick Deployment Script

After linking your project, you can run:

```bash
chmod +x scripts/deploy-railway.sh
./scripts/deploy-railway.sh
```

This script will:
- ✅ Check Railway connection
- ✅ Get database URL
- ✅ Generate and set NEXTAUTH_SECRET
- ✅ Set NEXTAUTH_URL
- ✅ Run migrations
- ✅ Generate Prisma Client
- ✅ Create admin user
- ✅ Deploy application

## 📝 Manual Steps Checklist

- [ ] Link Railway project: `railway link`
- [ ] Get DATABASE_URL from PostgreSQL service
- [ ] Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Set environment variables in Railway dashboard
- [ ] Generate Railway domain
- [ ] Update NEXTAUTH_URL with domain
- [ ] Run migrations: `railway run npx prisma migrate deploy`
- [ ] Create admin user: `railway run npx tsx scripts/create-admin.ts`
- [ ] Verify deployment works
- [ ] Test admin login
- [ ] Add initial content

## 🔧 Troubleshooting

### Project Not Linking

If `railway link` doesn't work:
1. Make sure you're logged in: `railway login`
2. Check your project exists in Railway dashboard
3. Try selecting the project manually in the interactive prompt

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check PostgreSQL service is running
3. Ensure database is in same region as app

### Build Fails

1. Check Railway logs: `railway logs`
2. Verify all environment variables are set
3. Test build locally: `npm run build`

### Admin Login Not Working

1. Verify admin user exists: Check database or recreate
2. Check NEXTAUTH_SECRET is set
3. Verify NEXTAUTH_URL matches your domain

## 📞 Support

- Railway Docs: https://docs.railway.app
- Railway Status: https://status.railway.app
- Your Project: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
