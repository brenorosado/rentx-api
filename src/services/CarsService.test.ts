import { expect, describe, it } from "@jest/globals";
import { Car, Image } from "@prisma/client";
import { CustomError } from "@errors/CustomError";
import { CarsService } from "./CarsService";
import { RequestingUser } from "@middlewares/auth";
import { mockEmail } from "src/test/mocks/mockEmail";
import { mockCnh } from "src/test/mocks/mockCnh";

const mockedRequestingUser: RequestingUser = {
  account: {
    email: mockEmail(),
    password: "123456",
    name: "Jest Test",
    cnh: mockCnh(),
    role: "ADMIN",
    id: "mockedId",
    createdAt: new Date(),
    active: true
  },
  iat: 1298319
};

const carPayload = {
  id: "mockedId",
  name: "Jest Car Test",
  manufacturer: "Jest Manufactor Test",
  pricePerDay: 99.99,
  maxSpeed: 180,
  zeroToAHundredTime: 12.9,
  fuelType: "FLEX",
  gear: "MANUAL",
  maxPeople: 5,
  horsePower: 70,
  description: "Jest car description test",
  createdAt: new Date(),
  active: true
};

const mockedImage = {
  id: "imageId",
  fileName: "imageName",
  fileExtension: "fileExtension",
  fileKey: "filKey",
  carId: "mockedId",
  createdAt: new Date(),
  active: true,
  url: "https://url.com",
  accountId: ""
};

const carsService = new CarsService();

const mockedCarsRepository = {
  async create (car: Car, imagesToConnect: Image[]) {
    return new Promise<Car>((resolve, reject) => resolve(car)
    );
  },

  async find (filters: {
    active?: boolean;
    name?: Object;
    id?: string;
    manufacturer?: string;
    pricePerDay?: Object;
  }) {
    return new Promise<Car[]>((resolve, reject) => {
      resolve([carPayload]);
    });
  },

  async delete (id: string) {
    return new Promise<Car>((resolve, reject) => resolve(carPayload));
  }
};

describe("Create accounts service tests", () => {
  it.each([
    ["name", { name: "" }],
    ["manufacturer", { manufacturer: "" }],
    ["pricePerDay", { pricePerDay: 0 }],
    ["maxSpeed", { maxSpeed: 0 }],
    ["zeroToAHundredTime", { zeroToAHundredTime: 0 }],
    ["fuelType", { fuelType: "" }],
    ["gear", { gear: "" }],
    ["maxPeople", { maxPeople: 0 }],
    ["horsePower", { horsePower: 0 }],
    ["description", { description: "" }]
  ])("Should fail when missing %s", async (key, payload) => {
    expect(async () => {
      const createCarPayload = carPayload;

      await carsService.create(mockedRequestingUser, {
        ...createCarPayload,
        ...payload
      },
      [mockedImage],
      mockedCarsRepository);
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Should fail when user is not a ADMIN", async () => {
    expect(async () => {
      const createCarPayload = carPayload;

      await carsService.create(
        {
          ...mockedRequestingUser,
          account: {
            ...mockedRequestingUser.account,
            role: "USER"
          }
        },
        createCarPayload,
        [mockedImage],
        mockedCarsRepository
      );
    }).rejects.toThrow(new CustomError(401, "Apenas administradores podem criar carros."));
  });

  it("Should fail when not sending images", async () => {
    expect(async () => {
      const createCarPayload = carPayload;

      await carsService.create(
        mockedRequestingUser,
        createCarPayload,
        [],
        mockedCarsRepository
      );
    }).rejects.toThrow(new CustomError(400, "Insira pelo menos uma imagem para o carro."));
  });

  it("Should be successfull when sending correct payload", async () => {
    const createCarPayload = carPayload;

    const createdCar = await carsService.create(
      mockedRequestingUser,
      createCarPayload,
      [mockedImage],
      mockedCarsRepository
    );
    expect(createdCar).toEqual(
      expect.objectContaining(createCarPayload)
    );
  });
});

describe("Find accounts service test", () => {
  it("Should be successfull when sending correct requestingUser", async () => {
    const findCarsPayload = carPayload;

    const carsFound = await carsService.find({}, mockedCarsRepository);

    expect(carsFound[0]).toEqual(
      expect.objectContaining(findCarsPayload)
    );
  });
});

describe("Delete accounts service test", () => {
  it("Should fail when user is not a ADMIN", async () => {
    expect(async () => {
      await carsService.delete(
        {
          ...mockedRequestingUser,
          account: {
            ...mockedRequestingUser.account,
            role: "USER"
          }
        },
        "mockedId",
        mockedCarsRepository
      );
    }).rejects.toThrow(new CustomError(401, "Apenas administradores podem deletar carros."));
  });

  it("Should faild when missing id", async () => {
    expect(async () => {
      await carsService.delete(
        mockedRequestingUser, "", mockedCarsRepository);
    }).rejects.toThrow(new CustomError(400, "Atributo 'id' é necessário."));
  });

  it("Should be successfull when sending correct requestingUser", async () => {
    const deleteCarPayload = carPayload;

    const deletedCar = await carsService.delete(
      mockedRequestingUser,
      "mockedId",
      mockedCarsRepository
    );

    expect(deletedCar).toEqual(
      expect.objectContaining(deleteCarPayload)
    );
  });
});
