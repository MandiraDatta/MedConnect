/*
  Warnings:

  - You are about to drop the column `experience` on the `DoctorLogin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DoctorLogin` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `DoctorLogin` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `DoctorLogin` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `DoctorLogin` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `DoctorLogin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "specialization" TEXT;

-- AlterTable
ALTER TABLE "DoctorLogin" DROP COLUMN "experience",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "profileImage",
DROP COLUMN "rating",
DROP COLUMN "specialization";

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "doctorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
