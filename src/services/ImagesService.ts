import { Image } from "@prisma/client";
import { ImagesRepository } from "@repositories/ImagesRepository";
import { requiredFields } from "@utils/requiredFields";
import { saveImage } from "@utils/saveImage";
import { unlink } from "fs";

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
  };

  async delete (id: string, imagesRepository: ImagesRepository) {
    requiredFields({ id });

    const deletedImage: Image = await imagesRepository.delete(id);

    const { fileKey, fileExtension } = deletedImage;

    unlink(`tmp/uploads/${fileKey}.${fileExtension}`, (err) => {
      console.log(err);
    });

    return deletedImage;
  };
};
