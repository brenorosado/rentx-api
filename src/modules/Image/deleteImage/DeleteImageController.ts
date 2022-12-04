import { Request, Response } from "express";
import { DeleteImageUseCase } from "./DeleteImageUseCase";

export class DeleteImageController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { requestingUser } = request.body;

        const deleteImage = new DeleteImageUseCase();

        await deleteImage.handle(id, requestingUser);

        return response.status(200).json({
            message: "Image deleted successfully."
        });
    }
}