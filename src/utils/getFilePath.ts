import path from "path";

export default async (fileName: string) => {
  return path.join(__dirname, "/", fileName);
};
