-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_homeStadiumId_fkey";

-- AlterTable
ALTER TABLE "HomeStadium" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "streetAddress" DROP NOT NULL,
ALTER COLUMN "City" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "logo" DROP NOT NULL,
ALTER COLUMN "njcaaName" DROP NOT NULL,
ALTER COLUMN "scheduleType" DROP NOT NULL,
ALTER COLUMN "scheduleUrl" DROP NOT NULL,
ALTER COLUMN "scheduleSinceYear" DROP NOT NULL,
ALTER COLUMN "homeStadiumId" DROP NOT NULL,
ALTER COLUMN "primaryColor" DROP NOT NULL,
ALTER COLUMN "secondaryColor" DROP NOT NULL,
ALTER COLUMN "conferenceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_homeStadiumId_fkey" FOREIGN KEY ("homeStadiumId") REFERENCES "HomeStadium"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
