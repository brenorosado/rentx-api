import { Account } from "@prisma/client";
import { prismaClient } from "../../../database/prismaClient";

export class GetAccountUseCase {
  async handle (requestingUserAccount: Account) {
    const account: Account = await prismaClient.account.findUnique({
      where: {
        id: requestingUserAccount.id
      }
    });

    delete account.password;

    return account;
  }
}
