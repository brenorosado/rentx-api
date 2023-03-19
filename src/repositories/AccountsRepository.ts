import { Account, Image } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";

export class AccountsRepository {
  async create ({ name, email, password, cnh, role }: Account, image: Image) {
    const createdAccount: Account = await prismaClient.account.create({
      data: {
        name,
        email,
        password,
        cnh,
        role,
        image: {
          connect: image
        }
      }
    });

    return createdAccount;
  }
}
