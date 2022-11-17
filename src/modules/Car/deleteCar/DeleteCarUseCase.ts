import { prismaClient } from "../../../database/prismaClient";
import { RequestingUser } from "../../../middlewares/auth";
import { CustomError } from "../../../errors/CustomError";

export class DeleteCarUseCase {
    async handle(id: string, requestingUser: RequestingUser) {
        if(requestingUser.account.role !== "ADMIN")
            throw new CustomError(403, "Only admins are allowed to delete a car.");

        const deletedCar = await prismaClient.car.delete({
            where: {
                id
            }
        });

        return deletedCar;
    }
}