-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doctorloginId" INTEGER,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorloginId_key" ON "Doctor"("doctorloginId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_doctorloginId_fkey" FOREIGN KEY ("doctorloginId") REFERENCES "Doctorlogin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
