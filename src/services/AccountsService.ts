import { Account } from ".prisma/client";
import { requiredFields } from "@utils/requiredFields";
import { cnhRegex } from "@utils/validations";
import { CustomError } from "@errors/CustomError";
import { AccountsRepository } from "@repositories/AccountsRepository";
import { RequestingUser } from "@middlewares/auth";
import { generateToken } from "@utils/generateToken";

interface UpdateAccount extends Account {
  image?: { id: string };
  requestingUser?: RequestingUser;
}

export class AccountsService {
  async create (
    account: Account,
    accountRepository: AccountsRepository,
    encryptPassword: (p: string) => Promise<string>
  ) {
    const { name, email, password, cnh, role } = account;

    requiredFields({ name, email, password, cnh, role });

    if (!cnhRegex.test(cnh)) throw new CustomError(400, "Nº de CNH inválido.");
    const encryptedPassword = await encryptPassword(password);

    const createdAccount: Account = await accountRepository.create({
      ...account,
      password: encryptedPassword
    });

    delete createdAccount.password;

    return createdAccount;
  };

  async update (payload: UpdateAccount, accountRepository: AccountsRepository) {
    const { id, image, requestingUser, ...accountData } = payload;
    const { name, email, cnh, role } = accountData;
    const { account } = requestingUser;

    requiredFields({ id, name, email, cnh, role });

    if (account.id !== id) throw new CustomError(403, "Você só pode alterar sua própria conta.");

    if (!cnhRegex.test(cnh)) throw new CustomError(400, "Nº de CNH inválido.");

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

  async authenticate (
    { email, password }: { email: string, password: string },
    accountRepository: AccountsRepository,
    validatePassowrd: (p: string, ep: string) => Promise<boolean>
  ) {
    requiredFields({ email, password });

    console.log({ email, password });

    const account: Account = await accountRepository.authenticate(email);

    console.log("account", account);

    if (!await validatePassowrd(password, account.password)) throw new CustomError(401, "Senha incorreta.");
    console.log("PASSWORD VALID!");

    const token = generateToken(account);
    console.log("TOKEN", token);
    delete account.password;

    return {
      token,
      account
    };
  };
};
