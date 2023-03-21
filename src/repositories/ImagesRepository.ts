import { prismaClient } from "@database/prismaClient";
import { Image } from "@prisma/client";

export class ImagesRepository {
  async create ({
    fileName,
    fileExtension,
    fileKey
  }: {
    fileName: string,
    fileExtension: string;
    fileKey: string;
  }) {
    const createdImage: Image = await prismaClient.image.create({
      data: {
        fileName,
        fileExtension,
        url: `${process.env.API_URL}/image/file/${fileKey}.${fileExtension}`,
        fileKey
      }
    });

    return createdImage;
  };
};
