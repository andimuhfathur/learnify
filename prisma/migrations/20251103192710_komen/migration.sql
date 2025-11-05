/*
  Warnings:

  - You are about to drop the column `accountId` on the `komentar` table. All the data in the column will be lost.
  - You are about to drop the `saves` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `Komentar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `komentar` DROP FOREIGN KEY `Komentar_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `saves` DROP FOREIGN KEY `Saves_idAccount_fkey`;

-- DropIndex
DROP INDEX `Komentar_accountId_fkey` ON `komentar`;

-- AlterTable
ALTER TABLE `komentar` DROP COLUMN `accountId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `saves`;
