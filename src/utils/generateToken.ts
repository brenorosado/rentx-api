import { Account } from ".prisma/client";
import jwt from "jsonwebtoken";

export const generateToken = (account: Account) => {
  return jwt.sign({ account }, process.env.JWT_SECRET_KEY as string);
};
