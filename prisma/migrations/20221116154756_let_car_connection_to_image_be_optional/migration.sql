-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_carId_fkey";

-- AlterTable
ALTER TABLE "images" ALTER COLUMN "carId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
