import { Account, Image } from ".prisma/client";
import { requiredFields } from "@utils/requiredFields";
import bcrypt from "bcryptjs";
import { cnhRegex } from "@utils/validations";
import { CustomError } from "@errors/CustomError";

export class AccountsService {
  async create (account: Account, image: Image, accountRepository: any) {
    const { name, email, password, cnh, role } = account;

    requiredFields({ name, email, password, cnh, role });

    if (!cnhRegex.test(cnh)) throw new CustomError(400, "Nº de CNH inválido.");
    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdAccount = await accountRepository.create({
      ...account,
      password: encryptedPassword
    });

    return createdAccount;
  }
}
