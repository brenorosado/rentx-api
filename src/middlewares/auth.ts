import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { Account } from "@prisma/client";

export interface RequestingUser {
  account: Account;
  iat: number;
}

export const auth = (request: Request, response: Response, next: NextFunction) => {
  const token = request.headers.authorization;

  if (!token) return response.status(403).json({ message: "Unauthorized." });

  try {
    const decoded: JwtPayload | string = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY as string);
    request.body.requestingUser = decoded as RequestingUser;
  } catch (err) {
    return response.status(401).json({ message: "Unauthorized." });
  }
  return next();
};
