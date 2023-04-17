import { CustomError } from "../errors/CustomError";

export const requiredFields = (item: any) => {
  Object.keys(item).forEach((key) => {
    if (!item[key]) {
      throw new CustomError(400, `Atributo '${key}' é necessário.`);
    }
  });
};
