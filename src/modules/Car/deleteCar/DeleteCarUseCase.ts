import { prismaClient } from "../../../database/prismaClient";

export class DeleteCarUseCase {
    async handle(id: string) {
        const deletedCar = await prismaClient.car.delete({
            where: {
                id
            }
        });

        return deletedCar;
    }
}