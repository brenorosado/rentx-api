import * as bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';

export const encryptKey = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const validateKey = async (
  password: string,
  encryptedPassword: string,
) => {
  return await bcrypt.compare(password, encryptedPassword);
};

export const generateSixDigitCode = async () => {
  const code = [
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
    randomInt(0, 9),
  ].join('');

  const encryptedCode = await encryptKey(code);

  return { code, encryptedCode };
};
