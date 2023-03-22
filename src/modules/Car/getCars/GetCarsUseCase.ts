import { prismaClient } from "../../../database/prismaClient";
import { CarGetParams } from "./GetCarsParamsType";

export class GetCarsUseCase {
  async handle (params: CarGetParams) {
    const {
      page,
      elementsPerPage,
      active,
      name,
      manufacturer,
      maxPricePerDay,
      id
    } = params;

    const filters = {
      ...(active && { active: active === "true" }),
      ...(name && {
        name: {
          contains: name
        }
      }),
      ...(id && { id }),
      ...(manufacturer && { manufacturer }),
      ...(maxPricePerDay && {
        pricePerDay: {
          lte: Number(maxPricePerDay)
        }
      })
    };

    const cars = await prismaClient.car.findMany({
      skip: (Number(page) - 1) * Number(elementsPerPage),
      take: Number(elementsPerPage),
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
  }
}
