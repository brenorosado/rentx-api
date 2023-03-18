import getFilePath from "../../../utils/getFilePath";

export class GetImageUseCase {
  async handle (fileName: string) {
    const filePath = await getFilePath(fileName);

    return filePath;
  }
}
