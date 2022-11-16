import { Request, Response } from "express";
import { ImageRequestDTO } from "./CreateImageDTO";
import { CreateImageUseCase } from "./CreateImageUseCase";

export class CreateImageController {
    async handle (request: Request, response: Response) {
        const { fileName, fileExtension, base64 }: ImageRequestDTO = request.body;
        
        const createImage = new CreateImageUseCase;

        const createdImage = await createImage.handle({ fileName, fileExtension, base64 });

        return response.status(201).json(createdImage);
    }
}