import { Account, Car } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import { RequestingUser } from "../../../middlewares/auth";
import { requiredFields } from "../../../utils/requiredFields";
import { CreateCarDTO } from "./CreateCarDTO";

export class CreateCarUseCase {
    async handle({ 
        name,
        manufacturer,
        pricePerDay,
        maxSpeed,
        zeroToAHundredTime,
        fuelType,
        gear,
        maxPeople,
        horsePower,
        description,
        images
    }: CreateCarDTO, requestingUser: RequestingUser) {

        if(requestingUser.account.role !== "ADMIN") 
            throw new CustomError(403, "Only admins are allowed to create a car.");

        requiredFields({
            name,
            manufacturer,
            pricePerDay,
            maxSpeed,
            zeroToAHundredTime,
            fuelType,
            gear,
            maxPeople,
            horsePower,
            description,
            images
        });

        const imagesToConnect = images.map(image => { return { id: image?.id }});

        const createdCar: Car = await prismaClient.car.create({
            data: {
                name,
                manufacturer,
                pricePerDay,
                maxSpeed,
                zeroToAHundredTime,
                fuelType,
                gear,
                maxPeople,
                horsePower,
                description,
                images: {
                    connect: imagesToConnect
                }
            }
        });

        return createdCar;
    }
}