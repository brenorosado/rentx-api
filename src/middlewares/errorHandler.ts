import { Prisma } from "@prisma/client";
import { Response, Request, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  console.log("ERROR MESSAGE", error.message);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let errorMessage = "Dados já cadastrados.";
    if (error.code === "P2002") {
      const fields: string[] = error.meta.target as Array<string>;

      errorMessage = `Campo(s): "${fields.map(field => {
        if (field === "email") return "E-mail";
        return field;
      })}" já cadastrado(s).`;
    }

    return res.status(400).json({
      statusCode: 400,
      message: `${errorMessage}`
    });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: `${error.message}`
    });
  }

  if (error && error.statusCode) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message
    });
  }
};
