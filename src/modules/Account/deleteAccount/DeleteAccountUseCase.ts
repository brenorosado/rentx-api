import { Account } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import { RequestingUser } from "../../../middlewares/auth";

export class DeleteAccountUseCase {
  async handle (requestingUser: RequestingUser) {
    const { account } = requestingUser;

    if (!account) throw new CustomError(404, "Account not found.");

    const accountToDelete: Account = await prismaClient.account.findUnique({
      where: {
        id: account.id
      }
    });

    if (!accountToDelete) throw new CustomError(404, "Account not found.");

    const deletedAccount = await prismaClient.account.delete({
      where: {
        id: account.id
      }
    });

    delete deletedAccount.password;

    return deletedAccount;
  }
}
