import { expect, describe, it } from "@jest/globals";
import { Account } from "@prisma/client";
import { mockCnh } from "src/test/mocks/mockCnh";
import { mockEmail } from "src/test/mocks/mockEmail";
import { AccountsService } from "./AccountsService";
import { CustomError } from "@errors/CustomError";

const accountPayload = {
  email: mockEmail(),
  password: "123456",
  name: "Jest Test",
  cnh: mockCnh(),
  role: "USER",
  id: "mockedId",
  createdAt: new Date(),
  active: true
};

const accountsService = new AccountsService();

const mockedAccountsRepository = {
  async create (account: Account) {
    return new Promise<Account>((resolve, reject) => {
      resolve(account);
    });
  },

  async update (account: Account) {
    return new Promise<Account>((resolve, reject) => {
      resolve(account);
    });
  },

  async delete (id: string) {
    return new Promise<Account>(() => accountPayload);
  },

  async find (id: string) {
    return new Promise<Account>(() => [accountPayload]);
  },

  async authenticate (id: string) {
    return new Promise<Account>(() => accountPayload);
  }
};

describe("Create accounts service tests", () => {
  it.each([
    ["email", { email: "" }],
    ["name", { name: "" }],
    ["cnh", { cnh: "" }],
    ["role", { role: "" }],
    ["password", { password: "" }]
  ])("Should fail when missing %s", async (key, payload) => {
    expect(async () => {
      const createAccountPayload = accountPayload;

      await accountsService.create({
        ...createAccountPayload,
        ...payload
      }, mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Should be successfull when sending correct payload", async () => {
    const createAccountPayload = accountPayload;

    const createdAccount = await accountsService.create(
      createAccountPayload,
      mockedAccountsRepository
    );

    delete createAccountPayload.password;

    expect(createdAccount).toEqual(
      expect.objectContaining(createAccountPayload)
    );
  });
});

describe("Update accounts service tests", () => {
  it.each([
    ["email", { email: "" }],
    ["name", { name: "" }],
    ["cnh", { cnh: "" }],
    ["role", { role: "" }]
  ])("Should fail when missing %s", async (key, payload) => {
    expect(async () => {
      const updateAccountPayload = accountPayload;
      delete updateAccountPayload.password;

      await accountsService.update({
        requestingUser: {
          account: {
            ...updateAccountPayload
          },
          iat: 123
        },
        ...updateAccountPayload,
        ...payload
      }, mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Should fail when trying to update account of another user", () => {
    expect(async () => {
      const updateAccountPayload = accountPayload;
      delete updateAccountPayload.password;

      await accountsService.update({
        requestingUser: {
          account: {
            ...updateAccountPayload,
            id: "anotherMockedId"
          },
          iat: 123
        },
        ...updateAccountPayload
      }, mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, "Você só pode alterar sua própria conta."));
  });

  it("Should be successfull when sending correct payload", async () => {
    const updateAccountPayload = accountPayload;

    delete updateAccountPayload.password;

    const createdAccount = await accountsService.update({
      requestingUser: {
        account: {
          ...updateAccountPayload
        },
        iat: 123
      },
      ...updateAccountPayload,
      image: { id: "imageId" }
    },
    mockedAccountsRepository
    );

    expect(createdAccount).toEqual(
      expect.objectContaining(updateAccountPayload)
    );
  });
});
