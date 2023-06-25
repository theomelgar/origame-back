-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_fk0";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
