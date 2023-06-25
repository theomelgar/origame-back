-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_fk0";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_fk0";

-- DropForeignKey
ALTER TABLE "LikesComments" DROP CONSTRAINT "LikesComments_fk0";

-- DropForeignKey
ALTER TABLE "Sessions" DROP CONSTRAINT "Sessions_fk0";

-- DropForeignKey
ALTER TABLE "Tutorials" DROP CONSTRAINT "Tutorials_fk0";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LikesComments" ADD CONSTRAINT "LikesComments_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tutorials" ADD CONSTRAINT "Tutorials_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
