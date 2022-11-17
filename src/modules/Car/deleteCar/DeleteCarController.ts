import { Request, Response } from "express";
import { DeleteCarUseCase } from "./DeleteCarUseCase";

export class DeleteCarController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { requestingUser } = request.body;

        const deleteCar = new DeleteCarUseCase();

        await deleteCar.handle(id, requestingUser);

        return response.status(200).json({
            message: "Car deleted successfully."
        });
    }
}