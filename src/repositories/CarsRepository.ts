import { prismaClient } from "@database/prismaClient";
import { Car } from "@prisma/client";

export class CarsRepository {
  async create (carObj: Car, imagesToConnect: { id: string }[]) {
    const createdCar: Car = await prismaClient.car.create({
      data: {
        ...carObj,
        images: {
          connect: imagesToConnect
        }
      }
    });

    return createdCar;
  };
};
