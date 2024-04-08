import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export const generateToken = (user: User) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY as string);
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
};
