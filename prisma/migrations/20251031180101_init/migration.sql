-- CreateTable
CREATE TABLE `Account` (
    `id_Account` VARCHAR(191) NOT NULL,
    `image_Account` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `tanggalAccount` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id_Account`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Beasiswa` (
    `id_Beasiswa` VARCHAR(191) NOT NULL,
    `image_Besiswa` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `linkBea` VARCHAR(191) NOT NULL,
    `type` ENUM('PELAJAR', 'MAHASISWA') NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `tanggalbea` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_Beasiswa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seminar` (
    `idSeminar` VARCHAR(191) NOT NULL,
    `imageSem` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `linkSem` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `tanggalBuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idSeminar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentar` (
    `idKomentar` VARCHAR(191) NOT NULL,
    `isiKomentar` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `tanggalBuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idKomentar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saves` (
    `idSaves` VARCHAR(191) NOT NULL,
    `idAccount` VARCHAR(191) NOT NULL,
    `tanggalBuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Saves_idAccount_key`(`idAccount`),
    PRIMARY KEY (`idSaves`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Komentar` ADD CONSTRAINT `Komentar_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id_Account`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Saves` ADD CONSTRAINT `Saves_idAccount_fkey` FOREIGN KEY (`idAccount`) REFERENCES `Account`(`id_Account`) ON DELETE CASCADE ON UPDATE CASCADE;
