import { Request, Response } from "express";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

export class DeleteAccountController {
  async handle (request: Request, response: Response) {
    const { requestingUser } = request.body;

    const deleteAccountUseCase = new DeleteAccountUseCase();

    await deleteAccountUseCase.handle(requestingUser);

    return response.status(200).json({
      message: "Account deleted successfully."
    });
  }
}
