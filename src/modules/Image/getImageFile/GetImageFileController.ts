import { Request, Response } from "express";
import { GetImageUseCase } from "./GetImageFileUseCase";

export class GetImageFileController {
    async handle(request: Request, response: Response) {
        const { fileName } = request.params;

        const getFile = new GetImageUseCase();

        const file = await getFile.handle(fileName);

        return response.sendFile(file);
    }
}