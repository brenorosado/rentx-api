import { Account } from ".prisma/client";
import { Request, Response } from "express";
import { generateToken } from "../../../utils/generateToken";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { body } = request;

    const createAccount = new CreateAccountUseCase();

    const createdAccount: Account = await createAccount.handle(body);

    const token = generateToken(createdAccount);

    delete createdAccount.password;

    return response.status(201).json({
        account: createdAccount,
        token
    })
  }
}


