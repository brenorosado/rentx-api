import { ImagesRepository } from "@repositories/ImagesRepository";
import { ImagesService } from "@services/ImagesService";
import { Request, Response } from "express";
import { Image } from "@prisma/client";

export class ImagesController {
  async create (request: Request, response: Response) {
    const { body } = request;

    const imagesRepository = new ImagesRepository();
    const imagesService = new ImagesService();

    const createdImage: Image = await imagesService.create(body, imagesRepository);

    return response.status(201).json(createdImage);
  }
}
