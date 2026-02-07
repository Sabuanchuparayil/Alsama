# Quick Password Update - Step by Step

## Problem
- `railway run` command not working
- DATABASE_URL needs to be set correctly

## Solution: Get DATABASE_URL from Railway

### Step 1: Get DATABASE_URL from Railway Dashboard

1. **Go to Railway Dashboard:**
   - https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
   - Click on **Postgres** service (not Alsama service)

2. **Copy DATABASE_URL:**
   - Click on **Variables** tab
   - Find `DATABASE_URL`
   - Click the **copy icon** next to it
   - **IMPORTANT:** Copy the ENTIRE URL (it's long!)

### Step 2: Set DATABASE_URL and Run Update

```bash
# Replace the URL below with your actual DATABASE_URL from Railway
export DATABASE_URL="postgresql://postgres:password@hostname:port/railway?sslmode=require"

# Run the update
ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

**Note:** The DATABASE_URL from Railway will look something like:
```
postgresql://postgres:xxxxx@containers-us-west-xxx.railway.app:xxxxx/railway
```

---

## Alternative: Use Existing Script

### Option 1: Edit update-admin.ts

1. **Edit the file:**
   ```bash
   nano scripts/update-admin.ts
   # or
   code scripts/update-admin.ts
   ```

2. **Change line 9:**
   ```typescript
   const newPassword = 'Admin @1234';  // Change from 'Abcd!1234'
   ```

3. **Get DATABASE_URL from Railway and set it:**
   ```bash
   export DATABASE_URL="your-railway-database-url-here"
   ```

4. **Run the script:**
   ```bash
   railway run npm run update-admin
   ```

   Or if railway run doesn't work:
   ```bash
   npm run update-admin
   ```

---

## Quick Fix: Use Railway Variables Command

Try this instead of `railway run`:

```bash
# Get DATABASE_URL from Railway
railway variables

# This will show all variables including DATABASE_URL
# Copy the DATABASE_URL value

# Then set it and run:
export DATABASE_URL="paste-your-database-url-here"
ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

---

## If Railway CLI Still Not Working

### Use Railway Dashboard to Get DATABASE_URL

1. Railway Dashboard → Postgres Service → Variables
2. Copy `DATABASE_URL` (full URL)
3. In terminal:

```bash
# Paste your DATABASE_URL (replace the example below)
export DATABASE_URL="postgresql://postgres:xxxxx@containers-us-west-xxx.railway.app:xxxxx/railway"

# Verify it's set
echo $DATABASE_URL

# Run update
ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

---

## Verify DATABASE_URL Format

Your DATABASE_URL should:
- Start with `postgresql://`
- Include username, password, host, port, and database
- End with `?sslmode=require` or similar

Example format:
```
postgresql://postgres:password@hostname:port/database?sslmode=require
```

---

## Troubleshooting

### Error: "invalid port number"
- Make sure DATABASE_URL is in quotes
- Check there are no extra spaces
- Verify the URL is complete

### Error: "No such file or directory"
- Make sure you're in the project directory
- Try: `cd "/Users/sabuj/Desktop/Alsama New"`

### Error: "User was denied access"
- DATABASE_URL is wrong or incomplete
- Get fresh DATABASE_URL from Railway Dashboard

---

## Simplest Method

1. **Get DATABASE_URL from Railway Dashboard** (Postgres → Variables)
2. **Copy the entire URL**
3. **Run these commands:**

```bash
export DATABASE_URL="paste-your-full-database-url-here"
ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

Make sure to:
- Use quotes around DATABASE_URL
- Paste the COMPLETE URL (it's long!)
- No spaces or line breaks in the URL
