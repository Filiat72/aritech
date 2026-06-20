-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3);
