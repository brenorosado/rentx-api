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
  };

  async update (account: Account) {
    const { id } = account;

    const updatedAccount = await prismaClient.account.update({
      where: {
        id
      },
      data: {
        ...account
      }
    });

    return updatedAccount;
  };

  async delete (id: string) {
    const deletedAccount = await prismaClient.account.delete({
      where: {
        id
      }
    });

    return deletedAccount;
  }
}
