import { Account } from ".prisma/client";
import { Request, Response } from "express";
import { AccountsService } from "@services/AccountsService";
import { AccountsRepository } from "@repositories/AccountsRepository";

export class AccountsController {
  async create (request: Request, response: Response) {
    const { body } = request;

    const accountRepository = new AccountsRepository();

    const createAccountService = new AccountsService();

    const createdAccount: Account = await createAccountService.create(body, accountRepository);

    return response.status(201).json(createdAccount);
  }

  async update () {
    console.log("update");
  }

  async find () {
    console.log("find");
  }

  async delete () {
    console.log("delete");
  }
}
