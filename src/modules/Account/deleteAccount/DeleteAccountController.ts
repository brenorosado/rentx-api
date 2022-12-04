import { Request, Response } from "express";
import { requiredFields } from "../../../utils/requiredFields";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

export class DeleteAccountController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    requiredFields({ id });

    const deleteAccountUseCase = new DeleteAccountUseCase();

    await deleteAccountUseCase.handle(id);

    return response.status(200).json({
      message: "Account deleted successfully."
    });
  }
}


