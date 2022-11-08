import { Account } from ".prisma/client";
import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  async handle (request: Request, response: Response) {
    const { body } = request;

    const createAccount = new CreateAccountUseCase();

    const createdAccount: Account = await createAccount.handle(body);

    delete createdAccount.password;

    return response.status(201).json(createdAccount);
  }
}
