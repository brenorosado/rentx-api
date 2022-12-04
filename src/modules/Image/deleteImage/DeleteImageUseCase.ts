import { prismaClient } from "../../../database/prismaClient";
import { RequestingUser } from "../../../middlewares/auth";
import { unlink } from "fs";
import { Image } from "@prisma/client";

export class DeleteImageUseCase {
    async handle(id: string, requestingUser: RequestingUser) {
        const deletedImage: Image = await prismaClient.image.delete({
            where: {
                id
            }
        });

        const { fileKey, fileExtension } = deletedImage;

        unlink(`tmp/uploads/${fileKey}.${fileExtension}`, (err) => {
            console.log(err);
        });

        return deletedImage;
    }
}