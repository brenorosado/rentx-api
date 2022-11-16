import { Request, Response } from "express";
import { CreateCarDTO } from "./CreateCarDTO";
import { CreateCarUseCase } from "./CreateCatUseCase";

export class CreateCarController {
    async handle(request: Request, response: Response) {
        const {
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
        }: CreateCarDTO = request.body;

        const { requestingUser } = request.body

        const createCar = new CreateCarUseCase();

        const createdCar = await createCar.handle({
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
        }, requestingUser);

        return response.status(201).json(createdCar);
    }
}