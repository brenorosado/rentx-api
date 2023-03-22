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

  async delete (id: string) {
    const deletedCar: Car = await prismaClient.car.delete({
      where: {
        id
      }
    });

    return deletedCar;
  };

  async find (
    filters: {
      active?: boolean;
      name?: Object;
      id?: string;
      manufacturer?: string;
      pricePerDay?: Object;
    },
    pagination: { skip: number, take: number }
  ) {
    const cars = await prismaClient.car.findMany({
      ...pagination,
      where: {
        ...filters
      },
      include: {
        images: {
          where: {
            active: true
          }
        }
      }
    });

    return cars;
  };
};
