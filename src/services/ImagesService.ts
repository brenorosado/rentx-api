import { Image } from "@prisma/client";
import { ImagesRepository } from "@repositories/ImagesRepository";
import { requiredFields } from "@utils/requiredFields";
import { FileInfo } from "@utils/imageConnection";

export class ImagesService {
  async create ({
    fileName,
    fileExtension,
    base64
  }: FileInfo,
  imagesRepository: ImagesRepository,
  saveImage: (s: FileInfo) => Promise<string>
  ) {
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

  async delete (
    id: string,
    imagesRepository:
    ImagesRepository,
    deleteImage: ({ key, extension }: { key: string, extension: string}) => void) {
    requiredFields({ id });

    const deletedImage: Image = await imagesRepository.delete(id);

    const { fileKey, fileExtension } = deletedImage;

    deleteImage({ key: fileKey, extension: fileExtension });

    return deletedImage;
  };
};
