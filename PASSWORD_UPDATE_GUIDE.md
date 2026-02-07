# Admin Password Update Guide

## Quick Update (Railway)

### Option 1: Via Railway CLI (Recommended)

```bash
railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

**Note:** Make sure you're in the project directory and Railway CLI is linked:
```bash
railway link
```

### Option 2: Via Railway Dashboard

1. **Get DATABASE_URL:**
   - Railway Dashboard → PostgreSQL Service → Variables
   - Copy `DATABASE_URL`

2. **Run locally with Railway DATABASE_URL:**
   ```bash
   export DATABASE_URL="postgresql://..."
   ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
   ```

### Option 3: Direct Database Update (Advanced)

If you have direct database access:

```sql
-- First, generate bcrypt hash for "Admin @1234"
-- Use online tool: https://bcrypt-generator.com/
-- Or use Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('Admin @1234', 10);

-- Then update:
UPDATE users 
SET password_hash = '$2a$10$...' 
WHERE email = 'mail@jsabu.com';
```

---

## Troubleshooting

### Error: "No such file or directory"

**Cause:** Railway CLI not installed or not in PATH

**Fix:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link
```

### Error: "User was denied access on the database"

**Cause:** Script trying to use local database instead of Railway's

**Fix:**
1. **Use Railway CLI:**
   ```bash
   railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
   ```

2. **Or set DATABASE_URL manually:**
   ```bash
   # Get DATABASE_URL from Railway Dashboard
   export DATABASE_URL="postgresql://user:pass@host:port/db"
   ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
   ```

### Error: "DATABASE_URL not found"

**Cause:** Environment variable not set

**Fix:**
```bash
# Get DATABASE_URL from Railway
railway variables

# Or from Railway Dashboard → PostgreSQL → Variables

# Then set it:
export DATABASE_URL="postgresql://..."
```

---

## Step-by-Step: Update Password via Railway

### Step 1: Install Railway CLI (if not installed)

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

### Step 3: Link to Project

```bash
cd "/Users/sabuj/Desktop/Alsama New"
railway link
```

Select your project when prompted.

### Step 4: Run Update Script

```bash
railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

### Step 5: Verify

1. Go to: `https://www.alsamatourism.com/admin/login`
2. Login with:
   - Email: `mail@jsabu.com`
   - Password: `Admin @1234`

---

## Alternative: Update via Existing Script

You already have `scripts/update-admin.ts` which might work better:

```bash
railway run npm run update-admin
```

This script:
- Updates email to `mail@jsabu.com`
- Updates password to `Abcd!1234`

To change the password in this script, edit `scripts/update-admin.ts`:
```typescript
const newPassword = 'Admin @1234'; // Change this line
```

Then run:
```bash
railway run npm run update-admin
```

---

## Quick Fix Commands

### If Railway CLI is not working:

```bash
# 1. Get DATABASE_URL from Railway Dashboard
# 2. Set it locally:
export DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# 3. Run update:
ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

### If you want to use the existing update-admin script:

```bash
# Edit scripts/update-admin.ts
# Change: const newPassword = 'Admin @1234';
# Then run:
railway run npm run update-admin
```

---

## Verify Railway CLI Setup

```bash
# Check if Railway CLI is installed
railway --version

# Check if linked to project
railway status

# If not linked:
railway link
```

---

**Recommended:** Use `railway run` command as it automatically uses Railway's DATABASE_URL and environment variables.
