/*
  Warnings:

  - You are about to drop the column `imagesId` on the `Tutorials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tutorials" DROP CONSTRAINT "Tutorials_fk2";

-- AlterTable
ALTER TABLE "Tutorials" DROP COLUMN "imagesId";
