# Production Migration Guide - Fleet Types

**Date:** February 9, 2026  
**Migration:** Add FleetType model to database

---

## 🎯 Overview

This guide will help you run the database migration and seed script in production (Railway).

---

## 📋 Prerequisites

- Railway account access
- Database connection string
- Railway CLI installed (optional, can use Railway dashboard)

---

## 🚀 Method 1: Using Railway Dashboard (Recommended)

### Step 1: Access Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Sign in to your account
3. Select your **AL SAMA** project
4. Click on your **PostgreSQL database service**

### Step 2: Open Database Console

1. Click on the **"Query"** tab or **"Connect"** button
2. This opens the database query interface

### Step 3: Run Migration SQL

Copy and paste the following SQL into the query editor:

```sql
-- CreateTable
CREATE TABLE "fleet_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fleet_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fleet_types_name_key" ON "fleet_types"("name");

-- CreateIndex
CREATE INDEX "fleet_types_name_idx" ON "fleet_types"("name");

-- CreateIndex
CREATE INDEX "fleet_types_is_active_idx" ON "fleet_types"("is_active");
```

4. Click **"Run"** or **"Execute"**
5. Wait for confirmation that the table was created

### Step 4: Verify Migration

Run this query to verify:

```sql
SELECT * FROM fleet_types;
```

Should return empty results (table exists but no data yet).

---

## 🌱 Step 5: Seed Initial Fleet Types

Run this SQL to seed the initial fleet types:

```sql
INSERT INTO "fleet_types" ("id", "name", "description", "order", "is_active", "created_at", "updated_at")
VALUES
  (gen_random_uuid()::text, 'SUV', 'Sport Utility Vehicles', 0, true, NOW(), NOW()),
  (gen_random_uuid()::text, 'Sedan', 'Luxury Sedans', 1, true, NOW(), NOW()),
  (gen_random_uuid()::text, 'Sports', 'Sports Cars', 2, true, NOW(), NOW());
```

**Note:** If `gen_random_uuid()` doesn't work, use this instead:

```sql
INSERT INTO "fleet_types" ("id", "name", "description", "order", "is_active", "created_at", "updated_at")
VALUES
  (md5(random()::text || clock_timestamp()::text)::uuid::text, 'SUV', 'Sport Utility Vehicles', 0, true, NOW(), NOW()),
  (md5(random()::text || clock_timestamp()::text)::uuid::text, 'Sedan', 'Luxury Sedans', 1, true, NOW(), NOW()),
  (md5(random()::text || clock_timestamp()::text)::uuid::text, 'Sports', 'Sports Cars', 2, true, NOW(), NOW());
```

Or use simple CUID-like strings:

```sql
INSERT INTO "fleet_types" ("id", "name", "description", "order", "is_active", "created_at", "updated_at")
VALUES
  ('clx' || substr(md5(random()::text), 1, 20), 'SUV', 'Sport Utility Vehicles', 0, true, NOW(), NOW()),
  ('cly' || substr(md5(random()::text), 1, 20), 'Sedan', 'Luxury Sedans', 1, true, NOW(), NOW()),
  ('clz' || substr(md5(random()::text), 1, 20), 'Sports', 'Sports Cars', 2, true, NOW(), NOW());
```

### Verify Seed Data

Run this query:

```sql
SELECT * FROM fleet_types ORDER BY "order";
```

Should return 3 rows:
- SUV
- Sedan
- Sports

---

## 🖥️ Method 2: Using Railway CLI

### Step 1: Install Railway CLI (if not installed)

```bash
npm i -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

### Step 3: Link to Your Project

```bash
railway link
```

Select your AL SAMA project.

### Step 4: Run Migration

```bash
# Set DATABASE_URL from Railway
railway variables

# Run migration
railway run npx prisma migrate deploy
```

### Step 5: Run Seed Script

```bash
railway run tsx scripts/seed-fleet-types.ts
```

---

## 🔧 Method 3: Using Prisma Migrate Deploy

If you have direct database access:

### Step 1: Set Environment Variable

```bash
export DATABASE_URL="your-production-database-url"
```

### Step 2: Run Migration

```bash
npx prisma migrate deploy
```

### Step 3: Run Seed Script

```bash
tsx scripts/seed-fleet-types.ts
```

---

## ✅ Verification Checklist

After running migration and seed:

- [ ] `fleet_types` table exists in database
- [ ] Table has correct columns (id, name, description, icon, order, is_active, created_at, updated_at)
- [ ] Indexes are created (name unique, name index, is_active index)
- [ ] 3 initial fleet types are seeded (SUV, Sedan, Sports)
- [ ] Can access `/admin/content/fleet-types` in admin panel
- [ ] Fleet types appear in vehicle category dropdown

---

## 🧪 Test in Admin Panel

1. **Go to Admin Panel:**
   - Navigate to: `/admin/content/fleet-types`
   - Should see 3 fleet types: SUV, Sedan, Sports

2. **Test Vehicle Form:**
   - Go to: `/admin/content/vehicles/new`
   - Category dropdown should show: SUV, Sedan, Sports

3. **Test Frontend:**
   - Go to: `/fleet`
   - Category filters should show: All Vehicles, SUV, Sedan, Sports

---

## 🆘 Troubleshooting

### Error: Table already exists

If you get "relation fleet_types already exists":

```sql
-- Check if table exists
SELECT * FROM information_schema.tables WHERE table_name = 'fleet_types';

-- If it exists, check its structure
\d fleet_types
```

If table exists but is empty, just run the seed SQL.

### Error: Duplicate key value

If you get duplicate key error when seeding:

```sql
-- Check existing data
SELECT * FROM fleet_types;

-- Delete if needed
DELETE FROM fleet_types WHERE name IN ('SUV', 'Sedan', 'Sports');

-- Then re-run seed SQL
```

### Error: Permission denied

Make sure you're using the correct database user with CREATE TABLE permissions.

---

## 📊 Expected Results

### Database Schema

```sql
fleet_types
├── id (TEXT, PRIMARY KEY)
├── name (TEXT, UNIQUE)
├── description (TEXT, NULLABLE)
├── icon (TEXT, NULLABLE)
├── order (INTEGER, DEFAULT 0)
├── is_active (BOOLEAN, DEFAULT true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Indexes:
├── fleet_types_name_key (UNIQUE)
├── fleet_types_name_idx
└── fleet_types_is_active_idx
```

### Initial Data

| id | name | description | order | is_active |
|----|------|-------------|-------|-----------|
| ... | SUV | Sport Utility Vehicles | 0 | true |
| ... | Sedan | Luxury Sedans | 1 | true |
| ... | Sports | Sports Cars | 2 | true |

---

## 🎉 Success!

Once migration and seed are complete:

1. ✅ Fleet types table created
2. ✅ Initial data seeded
3. ✅ Admin panel can manage fleet types
4. ✅ Vehicle forms use dynamic categories
5. ✅ Frontend displays dynamic categories

You can now:
- Add new fleet types through admin panel
- Edit existing fleet types
- Assign vehicles to any fleet type
- Reorder fleet types

---

## 📝 Next Steps

1. **Test in Admin:**
   - Create a test fleet type
   - Assign a vehicle to it
   - Verify it appears on frontend

2. **Customize:**
   - Edit fleet type descriptions
   - Reorder as needed
   - Add more fleet types

3. **Monitor:**
   - Check Railway logs for any errors
   - Verify database performance
   - Test all functionality

---

**Migration Status:** Ready to deploy  
**Risk Level:** Low (adds new table, doesn't modify existing)  
**Rollback:** Can drop table if needed (no data loss to existing tables)
