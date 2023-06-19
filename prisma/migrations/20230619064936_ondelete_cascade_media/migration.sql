-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_fk1";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_fk1" FOREIGN KEY ("tutorialId") REFERENCES "Tutorials"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
