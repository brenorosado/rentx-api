import { Request, Response } from "express";
import { GetCarsUseCase } from "./GetCarsUseCase";

export class GetCarsController {
    async handle(request: Request, response: Response) {
        const getCars = new GetCarsUseCase();

        const cars = await getCars.handle(request.query);

        return response.status(200).json(cars);
    }
}