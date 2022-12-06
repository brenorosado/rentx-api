import { Account } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import { RequestingUser } from "../../../middlewares/auth";
import { requiredFields } from "../../../utils/requiredFields";

export class UpdateAccountUseCase {
    async handle(payload: Account, requestingUser: RequestingUser) {
        const { id } = payload;
        const { account } = requestingUser;

        requiredFields({ id });

        if(account.id !== id) throw new CustomError(403, "You can only update your own account.")

        const updatedAccount = await prismaClient.account.update({
            where: {
                id
            },
            data: {
                ...payload
            }
        });

        return updatedAccount;
    }
}