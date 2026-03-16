-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- Migrate existing city strings into the City table and add city_id column
INSERT INTO "City" ("name")
SELECT DISTINCT "city" FROM "University" WHERE "city" IS NOT NULL;

ALTER TABLE "University" ADD COLUMN "city_id" INTEGER;

UPDATE "University" u
SET "city_id" = c."id"
FROM "City" c
WHERE c."name" = u."city";

ALTER TABLE "University" ALTER COLUMN "city_id" SET NOT NULL;

-- DropColumn
ALTER TABLE "University" DROP COLUMN "city";

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
