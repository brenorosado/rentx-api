import fs from "fs";
import crypto from "crypto";
import { CustomError } from "../errors/CustomError";
export interface FileInfo {
    fileName: string;
    fileExtension: string;
    base64: string;
}

export const saveImage = async ({ fileName, fileExtension, base64 }: FileInfo) => {
  const base64Image: string = base64.split(";base64,").pop();

  const buff = crypto.randomBytes(16);

  if (!buff) throw new CustomError(400, "An error occurred when saving the file.");

  const imageKey = buff.toString("hex");

  await fs.writeFile(`tmp/uploads/${imageKey}-${fileName}.${fileExtension}`, base64Image, { encoding: "base64" }, (err) => {
    if (err) {
      console.log(err);
      throw new CustomError(400, "An error occurred when saving the file.");
    }
  });

  return `${imageKey}-${fileName}`;
};

export const deleteImage = (
  { key, extension } : { key: string, extension: string }
) => {
  fs.unlink(`tmp/uploads/${key}.${extension}`, (err) => {
    console.log(err);
  });
};
