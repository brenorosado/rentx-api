import { Account } from ".prisma/client";
import { Request, Response } from "express";
import { AccountsService } from "@services/AccountsService";
import { AccountsRepository } from "@repositories/AccountsRepository";

export class AccountsController {
  async create (request: Request, response: Response) {
    const { body } = request;

    const accountRepository = new AccountsRepository();
    const accountsService = new AccountsService();

    const createdAccount: Account = await accountsService.create(body, accountRepository);

    return response.status(201).json(createdAccount);
  };

  async update (request: Request, response: Response) {
    const { body } = request;

    const accountRepository = new AccountsRepository();
    const accountsService = new AccountsService();

    const updatedAccount: Account = await accountsService.update(body, accountRepository);

    return response.status(200).json(updatedAccount);
  };

  async find (request: Request, response: Response) {
    const { requestingUser } = request.body;

    const accountRepository = new AccountsRepository();
    const accountsService = new AccountsService();

    const account = await accountsService.find(requestingUser, accountRepository);

    return response.status(200).json(account);
  };

  async delete (request: Request, response: Response) {
    const { requestingUser } = request.body;

    const accountRepository = new AccountsRepository();
    const accountsService = new AccountsService();

    await accountsService.delete(requestingUser, accountRepository);

    return response.status(200).json({
      message: "Account deleted successfully."
    });
  };
}
