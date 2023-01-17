import getFilePath from "../../../../tmp/uploads/getFilePath";

export class GetImageUseCase {
    async handle(fileName: string) {
        const filePath = await getFilePath(fileName);
        
        return filePath;
    }
}