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
  }
}
