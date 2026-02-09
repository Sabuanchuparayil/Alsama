-- Seed Initial Fleet Types
-- Run this SQL in Railway database console after migration

-- Insert initial fleet types
INSERT INTO "fleet_types" ("id", "name", "description", "order", "is_active", "created_at", "updated_at")
VALUES
  ('cl' || substr(md5('SUV' || random()::text), 1, 23), 'SUV', 'Sport Utility Vehicles', 0, true, NOW(), NOW()),
  ('cl' || substr(md5('Sedan' || random()::text), 1, 23), 'Sedan', 'Luxury Sedans', 1, true, NOW(), NOW()),
  ('cl' || substr(md5('Sports' || random()::text), 1, 23), 'Sports', 'Sports Cars', 2, true, NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- Verify the data
SELECT * FROM fleet_types ORDER BY "order";
