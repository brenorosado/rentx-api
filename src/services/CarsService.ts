import { CustomError } from "@errors/CustomError";
import { RequestingUser } from "@middlewares/auth";
import { Car, Image } from "@prisma/client";
import { CarsRepository } from "@repositories/CarsRepository";
import { requiredFields } from "@utils/requiredFields";

export class CarsService {
  async create (
    requestingUser: RequestingUser,
    car: Car,
    images: Image[],
    carRepository: CarsRepository
  ) {
    if (requestingUser.account.role !== "ADMIN") { throw new CustomError(401, "Apenas administradores podem criar carros."); };

    const {
      active,
      name,
      manufacturer,
      pricePerDay,
      maxSpeed,
      zeroToAHundredTime,
      fuelType,
      gear,
      maxPeople,
      horsePower,
      description
    } = car;

    requiredFields({
      active,
      name,
      manufacturer,
      pricePerDay,
      maxSpeed,
      zeroToAHundredTime,
      fuelType,
      gear,
      maxPeople,
      horsePower,
      description,
      images
    });

    if (!(images.length > 0)) throw new CustomError(400, "Insira pelo menos uma imagem para o carro.");

    const imagesToConnect = images.map(image => { return { id: image?.id }; });

    const createdCar = await carRepository.create(car, imagesToConnect);

    return createdCar;
  };

  async find ({
    page = "0",
    elementsPerPage = "50",
    active,
    name,
    manufacturer,
    maxPricePerDay,
    id
  }: {
    active?: string;
    available?: string;
    id?: string;
    elementsPerPage?: string;
    manufacturer?: string;
    maxPricePerDay?: string;
    name?: string;
    page?: string;
  },
  carRepository: CarsRepository
  ) {
    const pagination = {
      skip: (Number(page)) * Number(elementsPerPage),
      take: Number(elementsPerPage)
    };

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

    const cars: Car[] = await carRepository.find(filters, pagination);

    return cars;
  };

  async delete (
    requestingUser: RequestingUser,
    id: string,
    carsRepository: CarsRepository
  ) {
    if (requestingUser.account.role !== "ADMIN") { throw new CustomError(401, "Apenas administradores podem deletar carros."); };

    requiredFields({ id });

    const deletedCar: Car = await carsRepository.delete(id);

    return deletedCar;
  }
};
