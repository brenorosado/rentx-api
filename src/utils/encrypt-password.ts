import * as bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validatePassowrd = async (
  password: string,
  encryptedPassword: string,
) => {
  return await bcrypt.compare(password, encryptedPassword);
};
