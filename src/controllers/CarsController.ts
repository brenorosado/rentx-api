import { Request, Response } from "express";
import { CarsService } from "@services/CarsService";
import { CarsRepository } from "@repositories/CarsRepository";
import { Car } from "@prisma/client";

export class CarsController {
  async create (request: Request, response: Response) {
    const { requestingUser, images, ...car } = request.body;

    const carsServices = new CarsService();
    const carsRepository = new CarsRepository();

    const createdCar: Car = await carsServices.create(
      requestingUser,
      car,
      images,
      carsRepository
    );

    return response.status(201).json(createdCar);
  };

  async delete (request: Request, response: Response) {
    const { requestingUser } = request.body;
    const { id } = request.params;

    const carsServices = new CarsService();
    const carsRepository = new CarsRepository();

    await carsServices.delete(requestingUser, id, carsRepository);

    return response.status(200).json("Carro deletado com sucesso.");
  };

  async find () {

  };
};
