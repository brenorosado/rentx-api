import { ImagesRepository } from "@repositories/ImagesRepository";
import { ImagesService } from "@services/ImagesService";
import { Request, Response } from "express";
import { Image } from "@prisma/client";
import { saveImage, deleteImage } from "@utils/imageConnection";

export class ImagesController {
  async create (request: Request, response: Response) {
    const { body } = request;

    const imagesRepository = new ImagesRepository();
    const imagesService = new ImagesService();

    const createdImage: Image = await imagesService.create(body, imagesRepository, saveImage);

    return response.status(201).json(createdImage);
  };

  async delete (request: Request, response: Response) {
    const { id } = request.params;

    const imagesRepository = new ImagesRepository();
    const imagesService = new ImagesService();

    await imagesService.delete(id, imagesRepository, deleteImage);

    return response.status(200).json({
      message: "Imagem deletada com sucesso."
    });
  };
}
