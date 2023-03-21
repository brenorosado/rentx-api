import { Image } from "@prisma/client";
import { ImagesRepository } from "@repositories/ImagesRepository";
import { requiredFields } from "@utils/requiredFields";
import { saveImage } from "@utils/saveImage";

export class ImagesService {
  async create ({
    fileName,
    fileExtension,
    base64
  }: {
    fileName: string,
    fileExtension: string;
    base64: string;
  }, imagesRepository: ImagesRepository) {
    requiredFields({
      fileName,
      fileExtension,
      base64
    });

    const fileKey = await saveImage({
      fileName,
      fileExtension,
      base64
    });

    const createdImage: Image = await imagesRepository.create({
      fileName,
      fileExtension,
      fileKey
    });

    return createdImage;
  }
};
