import { Account } from ".prisma/client";
import { requiredFields } from "@utils/requiredFields";
import bcrypt from "bcryptjs";
import { cnhRegex } from "@utils/validations";
import { CustomError } from "@errors/CustomError";
import { AccountsRepository } from "@repositories/AccountsRepository";

export class AccountsService {
  async create (account: Account, accountRepository: AccountsRepository) {
    const { name, email, password, cnh, role } = account;

    requiredFields({ name, email, password, cnh, role });

    if (!cnhRegex.test(cnh)) throw new CustomError(400, "Nº de CNH inválido.");
    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdAccount = await accountRepository.create({
      ...account,
      password: encryptedPassword
    });

    delete createdAccount.password;

    return createdAccount;
  }
}
