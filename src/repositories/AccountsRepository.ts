import { Account } from "@prisma/client";
import { prismaClient } from "@database/prismaClient";

export class AccountsRepository {
  async create ({ name, email, password, cnh, role }: Account) {
    const createdAccount: Account = await prismaClient.account.create({
      data: {
        name,
        email,
        password,
        cnh,
        role
      }
    });

    return createdAccount;
  }
}
