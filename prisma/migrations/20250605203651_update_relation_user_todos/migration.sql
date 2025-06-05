/*
  Warnings:

  - You are about to drop the column `userId` on the `todo` table. All the data in the column will be lost.
  - Added the required column `clerkUserId` to the `todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_userId_fkey";

-- AlterTable
ALTER TABLE "todo" DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
