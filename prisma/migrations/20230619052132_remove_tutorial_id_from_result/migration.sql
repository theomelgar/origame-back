/*
  Warnings:

  - You are about to drop the column `tutorialId` on the `Results` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_fk1";

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "tutorialId";
