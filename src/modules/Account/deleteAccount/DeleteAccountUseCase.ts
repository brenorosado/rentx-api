import { Account } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";

export class DeleteAccountUseCase {
  async handle(id: string) {

    const accountToDelete: Account = await prismaClient.account.findUnique({
      where: {
        id
      }
    });

    if(!accountToDelete) {
      throw new CustomError(400, "There is no account with the given ID.");
    }

    const deletedAccount = await prismaClient.account.delete({
      where: {
        id
      }
    });

    delete deletedAccount.password;
    
    return deletedAccount;
  }
}