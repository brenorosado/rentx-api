import { Request, Response } from "express";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

export class UpdateAccountController {
    async handle(request: Request, response: Response) {
        const { body } = request;
        const { requestingUser } = body;

        const updateAccount = new UpdateAccountUseCase();

        const updatedAccount = await updateAccount.handle(body, requestingUser);

        return response.status(200).json(updatedAccount);
    }
}