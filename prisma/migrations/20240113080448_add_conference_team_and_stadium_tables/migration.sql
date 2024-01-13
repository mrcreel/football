/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Division` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Division` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Division" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Conference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeStadium" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HomeStadium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "njcaaTeamId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "njcaaName" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "mascot" TEXT NOT NULL,
    "scheduleType" TEXT NOT NULL,
    "scheduleUrl" TEXT NOT NULL,
    "scheduleSinceYear" INTEGER NOT NULL,
    "homeStadiumId" TEXT NOT NULL,
    "njcaaAliases" TEXT[],
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "conferenceId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_homeStadiumId_fkey" FOREIGN KEY ("homeStadiumId") REFERENCES "HomeStadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
