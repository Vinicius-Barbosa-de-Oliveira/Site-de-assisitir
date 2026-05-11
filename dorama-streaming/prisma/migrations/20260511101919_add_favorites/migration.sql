-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;
