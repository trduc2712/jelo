/*
  Warnings:

  - You are about to drop the column `lastActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastActive",
ADD COLUMN     "lastActiveAt" TIMESTAMP(3);
