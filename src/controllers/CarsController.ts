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
};
