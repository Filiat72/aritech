/*
  Warnings:

  - You are about to drop the column `duration` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `accessGiven` on the `Enrollment` table. All the data in the column will be lost.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `course` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `Result` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,packageId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseModeId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseModeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packageId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examType` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('pending', 'granted', 'revoked', 'failed');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "duration",
DROP COLUMN "price",
ADD COLUMN     "bannerImage" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "classRange" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "shortDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "accessGiven",
ADD COLUMN     "accessStatus" "AccessStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "courseModeId" TEXT NOT NULL,
ADD COLUMN     "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lmsAccessGranted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "orderId" TEXT,
ADD COLUMN     "packageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "leadType" TEXT,
ADD COLUMN     "preferredDate" TEXT,
ADD COLUMN     "preferredTime" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "courseModeId" TEXT NOT NULL,
ADD COLUMN     "packageId" TEXT NOT NULL,
ADD COLUMN     "razorpayPaymentId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "course",
DROP COLUMN "rank",
ADD COLUMN     "examType" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "result" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CourseBoard" (
    "id" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseMode" (
    "id" TEXT NOT NULL,
    "modeName" TEXT NOT NULL,
    "duration" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "CourseMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePackage" (
    "id" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "monthlyPrice" DOUBLE PRECISION NOT NULL,
    "duration" TEXT,
    "description" TEXT,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "modeId" TEXT NOT NULL,

    CONSTRAINT "CoursePackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageFeature" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "PackageFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LMSAccess" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "externalStudentId" TEXT,
    "accessStatus" "AccessStatus" NOT NULL DEFAULT 'pending',
    "grantedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LMSAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseBoard_courseId_idx" ON "CourseBoard"("courseId");

-- CreateIndex
CREATE INDEX "CourseMode_courseId_idx" ON "CourseMode"("courseId");

-- CreateIndex
CREATE INDEX "CoursePackage_modeId_idx" ON "CoursePackage"("modeId");

-- CreateIndex
CREATE INDEX "PackageFeature_packageId_idx" ON "PackageFeature"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "LMSAccess_enrollmentId_key" ON "LMSAccess"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_userId_packageId_key" ON "Enrollment"("userId", "packageId");

-- AddForeignKey
ALTER TABLE "CourseBoard" ADD CONSTRAINT "CourseBoard_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMode" ADD CONSTRAINT "CourseMode_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePackage" ADD CONSTRAINT "CoursePackage_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "CourseMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageFeature" ADD CONSTRAINT "PackageFeature_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CoursePackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_courseModeId_fkey" FOREIGN KEY ("courseModeId") REFERENCES "CourseMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CoursePackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseModeId_fkey" FOREIGN KEY ("courseModeId") REFERENCES "CourseMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "CoursePackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LMSAccess" ADD CONSTRAINT "LMSAccess_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
