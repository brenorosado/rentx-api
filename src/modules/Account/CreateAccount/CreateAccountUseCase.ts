import { Account } from ".prisma/client";
import { prismaClient } from "../../../database/prismaClient";
import { requiredFields } from "../../../utils/requiredFields";
import bcrypt from "bcryptjs";

export class CreateAccountUseCase {
  async handle ({ name, email, password, cnh, role }: Account) {
    requiredFields({ name, email, password, cnh, role });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdAccount: Account = await prismaClient.account.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        cnh,
        role
      }
    });

    return createdAccount;
  }
}
