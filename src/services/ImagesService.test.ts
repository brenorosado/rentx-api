import { expect, describe, it } from "@jest/globals";
import { Image } from "@prisma/client";
import { CustomError } from "@errors/CustomError";
import { ImagesService } from "./ImagesService";
import { FileInfo } from "@utils/imageConnection";

const imagePayload = {
  id: "mockedId",
  fileName: "FileName",
  fileExtension: "FileExtension",
  url: "FileUrl",
  fileKey: "FileKey",
  createdAt: new Date(),
  active: true,
  carId: "",
  accountId: "",
  base64: "123123"
};

const imagesService = new ImagesService();

const mockedImagesRepository = {
  async create (file: {
    fileName: string,
    fileExtension: string;
    fileKey: string;
  }) {
    return new Promise<Image>((resolve, reject) => resolve(imagePayload)
    );
  },

  async delete (id: string) {
    return new Promise<Image>((resolve, reject) => resolve(imagePayload));
  }
};

const mockedSaveImage = (file: FileInfo) => new Promise<string>((resolve, reject) => resolve("randomKey"));
const mockedDeleteImage = (
  { key, extension } : { key: string, extension: string }
) => {};

describe("Create images service tests", () => {
  it.each([
    ["fileName", { fileName: "" }],
    ["fileExtension", { fileExtension: "" }],
    ["base64", { base64: "" }]
  ])("Should fail when missing %s", async (key, payload) => {
    expect(async () => {
      const createImagePayload = imagePayload;

      await imagesService.create({
        ...createImagePayload,
        ...payload
      },
      mockedImagesRepository,
      mockedSaveImage);
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Should be successfull when sending correct payload", async () => {
    const createImagePayload = imagePayload;

    const createdCar = await imagesService.create(
      createImagePayload,
      mockedImagesRepository,
      mockedSaveImage
    );
    expect(createdCar).toEqual(
      expect.objectContaining(createImagePayload)
    );
  });
});

describe("Delete images service test", () => {
  it("Should faild when missing id", async () => {
    expect(async () => {
      await imagesService.delete("", mockedImagesRepository, mockedDeleteImage);
    }).rejects.toThrow(new CustomError(400, "Atributo 'id' é necessário."));
  });

  it("Should be successfull when sending id", async () => {
    const deleteImagePayload = imagePayload;

    const deletedCar = await imagesService.delete(
      "mockedId",
      mockedImagesRepository,
      mockedDeleteImage
    );

    expect(deletedCar).toEqual(
      expect.objectContaining(deleteImagePayload)
    );
  });
});
