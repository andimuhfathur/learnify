/*
  Warnings:

  - Made the column `type` on table `beasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Beasiswa_type_key` ON `beasiswa`;

-- AlterTable
ALTER TABLE `beasiswa` MODIFY `type` VARCHAR(191) NOT NULL;
