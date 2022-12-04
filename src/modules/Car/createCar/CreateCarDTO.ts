import { Image } from "@prisma/client";

interface ImageConnect {
    id: string;
}

export interface CreateCarDTO {
    name: string;
    manufacturer: string;
    pricePerDay: number;
    maxSpeed: number;
    zeroToAHundredTime: number;
    fuelType: string;
    gear: string;
    maxPeople: number;
    horsePower: number;
    description: string;
    images: ImageConnect[];
}