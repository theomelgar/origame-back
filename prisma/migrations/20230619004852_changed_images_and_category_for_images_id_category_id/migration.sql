/*
  Warnings:

  - You are about to drop the column `category` on the `Tutorials` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Tutorials` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Tutorials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagesId` to the `Tutorials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tutorials" DROP CONSTRAINT "Tutorials_fk2";

-- DropForeignKey
ALTER TABLE "Tutorials" DROP CONSTRAINT "Tutorials_fk3";

-- AlterTable
ALTER TABLE "Tutorials" DROP COLUMN "category",
DROP COLUMN "images",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "imagesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tutorials" ADD CONSTRAINT "Tutorials_fk2" FOREIGN KEY ("imagesId") REFERENCES "Media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tutorials" ADD CONSTRAINT "Tutorials_fk3" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
