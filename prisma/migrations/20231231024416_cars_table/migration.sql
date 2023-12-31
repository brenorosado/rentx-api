-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('GAS', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "GearType" AS ENUM ('MANUAL', 'AUTOMATIC');

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    "maxKmPerHour" INTEGER NOT NULL,
    "timeToAHundredKmPerHour" DOUBLE PRECISION NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "gearType" "GearType" NOT NULL,
    "maxPeopleCapacity" INTEGER NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" TEXT,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);
