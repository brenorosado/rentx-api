import { requiredFields } from "../../../utils/requiredFields";
import { ImageRequestDTO } from "./CreateImageDTO";
import { saveImage } from "../../../utils/saveImage";
import { prismaClient } from "../../../database/prismaClient";
import { Image } from "@prisma/client";
import getFilePath from "../../../../tmp/uploads/getFilePath";

export class CreateImageUseCase {
    async handle({ 
        fileName,
        fileExtension,
        base64,
        carId
    }: ImageRequestDTO) {

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

        const createdImage: Image = await prismaClient.image.create({
            data: {
                fileName,
                fileExtension,
                url: `${process.env.API_URL}/image/file/${fileKey}.${fileExtension}`,
                fileKey,
                carId
            }
        });

        return createdImage;
    }
}