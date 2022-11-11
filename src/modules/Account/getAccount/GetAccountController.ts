import { Request, Response } from "express";
import { GetAccountUseCase } from "./GetAccountUseCase";

export class GetAccountController {
  async handle (request: Request, response: Response) {
    const { requestingUser } = request.body;

    const getAccount = new GetAccountUseCase();

    const account = await getAccount.handle(requestingUser.account);

    return response.status(200).json(account);
  }
}
