# Troubleshooting Guide - Admin Login 500 Error

## Error: `error?error=Configuration` (500 Internal Server Error)

This error typically occurs due to one of these issues:

### 1. Missing NEXTAUTH_SECRET ✅ FIXED

**Symptom**: Configuration error on login page

**Solution**: Create `.env.local` file with:
```env
NEXTAUTH_SECRET=ckc+npHKU4zTQcmswTZ6W9nf3nZU6HcLNbwotDojWQo=
NEXTAUTH_URL=http://localhost:3000
```

### 2. Database Connection Error (Most Likely Cause)

**Symptom**: 500 error when trying to authenticate

**Cause**: Database not connected or tables don't exist

**Solution**:

#### Step 1: Check if DATABASE_URL is set
```bash
# Check if .env.local exists and has DATABASE_URL
cat .env.local | grep DATABASE_URL
```

#### Step 2: Set up Database

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally or use Docker
docker run --name alsama-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=alsama -p 5432:5432 -d postgres

# Add to .env.local
DATABASE_URL=postgresql://postgres:password@localhost:5432/alsama?schema=public
```

**Option B: Use Railway PostgreSQL**
1. Create PostgreSQL service on Railway
2. Copy DATABASE_URL from Railway dashboard
3. Add to `.env.local`

#### Step 3: Run Migrations
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# Or if database already exists
npx prisma migrate deploy
```

#### Step 4: Create Admin User
```bash
ADMIN_EMAIL=admin@alsama.ae ADMIN_PASSWORD=YourSecurePass123! npm run create-admin
```

### 3. Prisma Client Not Generated

**Symptom**: Import errors or "PrismaClient is not defined"

**Solution**:
```bash
npx prisma generate
```

### 4. Environment Variables Not Loading

**Symptom**: Variables exist but aren't being read

**Solution**:
1. **Restart dev server** after creating/updating `.env.local`
2. **Check file name**: Must be exactly `.env.local` (not `.env` or `.env.local.txt`)
3. **Check location**: Must be in project root (same directory as `package.json`)
4. **Verify format**: No spaces around `=`, use quotes for values with spaces

### 5. Database Tables Don't Exist

**Symptom**: "relation does not exist" or "table not found"

**Solution**:
```bash
# Check if migrations have been run
npx prisma migrate status

# Run migrations
npx prisma migrate dev

# Or reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Quick Diagnostic Steps

Run these commands to diagnose the issue:

```bash
# 1. Check if .env.local exists
ls -la .env.local

# 2. Check environment variables (without showing values)
grep -E "^[A-Z_]+" .env.local | cut -d= -f1

# 3. Check Prisma Client
npx prisma generate

# 4. Check database connection
npx prisma db pull

# 5. Check migrations
npx prisma migrate status
```

## Complete Setup Checklist

- [ ] `.env.local` file exists in project root
- [ ] `NEXTAUTH_SECRET` is set in `.env.local`
- [ ] `NEXTAUTH_URL` is set in `.env.local`
- [ ] `DATABASE_URL` is set in `.env.local`
- [ ] PostgreSQL database is running/accessible
- [ ] Prisma Client is generated (`npx prisma generate`)
- [ ] Database migrations are run (`npx prisma migrate dev`)
- [ ] Admin user exists in database
- [ ] Dev server has been restarted after adding `.env.local`

## Test Database Connection

Create a test script `test-db.ts`:

```typescript
import { prisma } from './lib/db/prisma';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
    
    const userCount = await prisma.user.count();
    console.log(`✅ Users table exists (${userCount} users)`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database error:', error);
    process.exit(1);
  }
}

testConnection();
```

Run it:
```bash
npx tsx test-db.ts
```

## Still Having Issues?

1. **Check server logs**: Look at terminal where `npm run dev` is running
2. **Check browser console**: Open DevTools → Console tab
3. **Check Network tab**: See the actual error response from `/api/auth/error`
4. **Verify NextAuth version**: `npm list next-auth`

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Configuration` | Missing NEXTAUTH_SECRET | Add to `.env.local` |
| `500 Internal Server Error` | Database connection failed | Check DATABASE_URL |
| `relation "users" does not exist` | Tables not created | Run `npx prisma migrate dev` |
| `PrismaClient is not defined` | Client not generated | Run `npx prisma generate` |
| `Invalid credentials` | User doesn't exist | Create admin user |
