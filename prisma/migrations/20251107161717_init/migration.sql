/*
  Warnings:

  - You are about to drop the column `username` on the `komentar` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Beasiswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Komentar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `image_Account` VARCHAR(191) NULL,
    MODIFY `username` VARCHAR(191) NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `beasiswa` ADD COLUMN `type` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `komentar` DROP COLUMN `username`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Beasiswa_type_key` ON `Beasiswa`(`type`);

-- AddForeignKey
ALTER TABLE `Komentar` ADD CONSTRAINT `Komentar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`id_Account`) ON DELETE CASCADE ON UPDATE CASCADE;
