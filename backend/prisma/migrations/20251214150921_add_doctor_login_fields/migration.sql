/*
  Warnings:

  - You are about to drop the column `doctorloginId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `Doctorlogin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_doctorloginId_fkey";

-- DropIndex
DROP INDEX "Doctor_doctorloginId_key";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "doctorloginId";

-- DropTable
DROP TABLE "Doctorlogin";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "DoctorLogin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "supabaseId" TEXT,
    "password" TEXT,
    "profileImage" TEXT,
    "phone" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorLogin_email_key" ON "DoctorLogin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorLogin_supabaseId_key" ON "DoctorLogin"("supabaseId");
