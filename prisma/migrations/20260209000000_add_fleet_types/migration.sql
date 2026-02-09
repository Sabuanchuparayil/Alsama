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
