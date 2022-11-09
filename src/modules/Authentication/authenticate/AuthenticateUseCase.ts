import { prismaClient } from "../../../database/prismaClient";
import { CustomError } from "../../../errors/CustomError";
import { requiredFields } from "../../../utils/requiredFields";
import bcrypt from "bcryptjs";
import { AuthenticateDTO } from "./AuthenticateDTO";
import { Account } from "@prisma/client";

export class AuthenticateUseCase {
  async handle ({ email, password }: AuthenticateDTO) {
    requiredFields({ email, password });

    const account: Account = await prismaClient.account.findUnique({
      where: {
        email
      }
    });

    if (!account) throw new CustomError(401, "Incorrect email.");

    let validatePassword = false;

    validatePassword = await bcrypt.compare(password, account.password);

    if (!validatePassword) throw new CustomError(401, "Incorrect password.");

    return account;
  }
}
