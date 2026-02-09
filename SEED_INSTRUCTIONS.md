# Seed Fleet Types - Quick Instructions

## ✅ Migration Complete!

Your migration was successful! Now you just need to seed the initial data.

---

## 🚀 Option 1: SQL Script (Easiest - Recommended)

### Steps:

1. **Go to Railway Dashboard:**
   - https://railway.app
   - Your Project → PostgreSQL Database
   - Click **"Query"** or **"Connect"** tab

2. **Run this SQL:**

```sql
INSERT INTO "fleet_types" ("id", "name", "description", "order", "is_active", "created_at", "updated_at")
VALUES
  ('cl' || substr(md5('SUV' || random()::text), 1, 23), 'SUV', 'Sport Utility Vehicles', 0, true, NOW(), NOW()),
  ('cl' || substr(md5('Sedan' || random()::text), 1, 23), 'Sedan', 'Luxury Sedans', 1, true, NOW(), NOW()),
  ('cl' || substr(md5('Sports' || random()::text), 1, 23), 'Sports', 'Sports Cars', 2, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;
```

3. **Verify:**

```sql
SELECT * FROM fleet_types ORDER BY "order";
```

Should show 3 rows! ✅

---

## 🖥️ Option 2: Railway CLI (Alternative)

If you want to use the TypeScript script:

```bash
# Make sure you're in the project directory
cd "/Users/sabuj/Desktop/Alsama New"

# Run with npx (ensures tsx is available)
railway run npx tsx scripts/seed-fleet-types.ts
```

Or if that doesn't work:

```bash
# Generate Prisma client first
railway run npx prisma generate

# Then run seed
railway run npx tsx scripts/seed-fleet-types.ts
```

---

## ✅ Verification

After seeding, test:

1. **Admin Panel:** `/admin/content/fleet-types`
   - Should see 3 fleet types

2. **Vehicle Form:** `/admin/content/vehicles/new`
   - Category dropdown should show: SUV, Sedan, Sports

3. **Frontend:** `/fleet`
   - Category filters should work

---

## 🎉 Done!

Once you see the 3 fleet types in the database, you're all set!
