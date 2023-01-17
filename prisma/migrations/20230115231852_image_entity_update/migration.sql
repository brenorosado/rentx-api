/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `images` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "accountId" TEXT,
ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "images_accountId_key" ON "images"("accountId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
