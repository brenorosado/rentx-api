import { Request, Response } from "express";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

export class UpdateAccountController {
  async handle (request: Request, response: Response) {
    const { body } = request;

    const updateAccount = new UpdateAccountUseCase();

    const updatedAccount = await updateAccount.handle(body);

    return response.status(200).json(updatedAccount);
  }
}
