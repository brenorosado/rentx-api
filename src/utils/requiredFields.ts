import { CustomError } from "../errors/CustomError";

export const requiredFields = (item: any) => {
  Object.keys(item).map((key) => {
    if (!item[key]) {
      throw new CustomError(400, `Attribute '${key}' is missing.`);
    }
  });
};