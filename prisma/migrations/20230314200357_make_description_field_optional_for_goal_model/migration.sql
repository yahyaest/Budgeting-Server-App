/*
  Warnings:

  - You are about to drop the column `decription` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "decription",
ALTER COLUMN "description" DROP NOT NULL;
