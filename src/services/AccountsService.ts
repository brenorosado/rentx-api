import { Account, Image } from ".prisma/client";
import { requiredFields } from "@utils/requiredFields";
import bcrypt from "bcryptjs";
import { cnhRegex } from "@utils/validations";
import { CustomError } from "@errors/CustomError";
import { AccountsRepository } from "@repositories/AccountsRepository";
import { RequestingUser } from "@middlewares/auth";

interface UpdateAccount extends Account {
  image?: Image;
  requestingUser?: RequestingUser;
}

export class AccountsService {
  async create (account: Account, accountRepository: AccountsRepository) {
    const { name, email, password, cnh, role } = account;

    requiredFields({ name, email, password, cnh, role });

    if (!cnhRegex.test(cnh)) throw new CustomError(400, "Nº de CNH inválido.");
    const encryptedPassword = await bcrypt.hash(password, 10);

    const createdAccount: Account = await accountRepository.create({
      ...account,
      password: encryptedPassword
    });

    delete createdAccount.password;

    return createdAccount;
  };

  async update (payload: UpdateAccount, accountRepository: AccountsRepository) {
    const { id, image, requestingUser, ...accountData } = payload;
    const { account } = requestingUser;

    requiredFields({ id });

    if (account.id !== id) throw new CustomError(403, "You can only update your own account.");

    const updatedAccount: Account = await accountRepository.update({
      id,
      ...accountData,
      ...(!!image && {
        image: {
          connect: image?.id
        }
      })
    });

    return updatedAccount;
  };

  async find (requestingUser: RequestingUser, accountRepository: AccountsRepository) {
    const { id } = requestingUser.account;

    requiredFields({ id });

    const account: Account = await accountRepository.find(id);

    return account;
  };

  async delete (requestingUser: RequestingUser, accountRepository: AccountsRepository) {
    const { id } = requestingUser.account;

    requiredFields({ id });

    const deletedAccount: Account = await accountRepository.delete(id);

    return deletedAccount;
  };
}
