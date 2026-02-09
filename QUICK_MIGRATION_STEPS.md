# Quick Migration Steps - Fleet Types

## 🚀 Fast Track (Railway Dashboard)

### Step 1: Run Migration SQL

1. Go to **Railway Dashboard** → Your Project → **PostgreSQL Database**
2. Click **"Query"** or **"Connect"** tab
3. Copy and paste this SQL:

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
CREATE INDEX "fleet_types_name_idx" ON "fleet_types"("name");
CREATE INDEX "fleet_types_is_active_idx" ON "fleet_types"("is_active");
```

4. Click **"Run"** ✅

### Step 2: Seed Initial Data

Run this SQL in the same query editor:

```sql
INSERT INTO "fleet_types" ("id", "name", "description", "order", "is_active", "created_at", "updated_at")
VALUES
  ('cl' || substr(md5('SUV' || random()::text), 1, 23), 'SUV', 'Sport Utility Vehicles', 0, true, NOW(), NOW()),
  ('cl' || substr(md5('Sedan' || random()::text), 1, 23), 'Sedan', 'Luxury Sedans', 1, true, NOW(), NOW()),
  ('cl' || substr(md5('Sports' || random()::text), 1, 23), 'Sports', 'Sports Cars', 2, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;
```

### Step 3: Verify

```sql
SELECT * FROM fleet_types ORDER BY "order";
```

Should show 3 rows: SUV, Sedan, Sports ✅

---

## ✅ Done!

Now test:
1. Go to `/admin/content/fleet-types` - Should see 3 types
2. Go to `/admin/content/vehicles/new` - Category dropdown should work
3. Go to `/fleet` - Category filters should work

---

**That's it!** The migration is complete. 🎉
