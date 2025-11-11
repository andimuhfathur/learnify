/*
  Warnings:

  - You are about to drop the column `userId` on the `komentar` table. All the data in the column will be lost.
  - Added the required column `username` to the `Komentar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `komentar` DROP FOREIGN KEY `Komentar_userId_fkey`;

-- DropIndex
DROP INDEX `Komentar_userId_fkey` ON `komentar`;

-- AlterTable
ALTER TABLE `komentar` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
