-- DropForeignKey
ALTER TABLE "CommunityMessage" DROP CONSTRAINT "CommunityMessage_userId_fkey";

-- AddForeignKey
ALTER TABLE "CommunityMessage" ADD CONSTRAINT "CommunityMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
