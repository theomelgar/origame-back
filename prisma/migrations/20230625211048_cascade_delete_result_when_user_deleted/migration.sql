-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_userId_fkey";

-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_fk0";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
