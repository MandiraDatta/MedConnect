-- AlterTable
ALTER TABLE "DoctorLogin" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "specialization" TEXT;
