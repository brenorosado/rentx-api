import { Image } from "@prisma/client";

export interface ImageRequestDTO {
    fileName: string;
    fileExtension: string;
    base64: string;
    carId?: string;                                         
}