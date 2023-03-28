import { expect, describe, it } from "@jest/globals";
import { Account } from "@prisma/client";
import { mockCnh } from "src/test/mocks/mockCnh";
import { mockEmail } from "src/test/mocks/mockEmail";
import { AccountsService } from "./AccountsService";
import { CustomError } from "@errors/CustomError";

const createAccountPayload = {
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
    return new Promise<Account>(() => account);
  },

  async delete (id: string) {
    return new Promise<Account>(() => createAccountPayload);
  },

  async find (id: string) {
    return new Promise<Account>(() => [createAccountPayload]);
  },

  async authenticate (id: string) {
    return new Promise<Account>(() => createAccountPayload);
  }
};

describe("Create accounts service tests", () => {
  it.each([
    ["email", { email: "" }],
    ["name", { name: "" }],
    ["cnh", { cnh: "" }],
    ["role", { role: "" }],
    ["password", { password: "" }]
  ])("Must fail when missing %s", async (key, payload) => {
    expect(async () => {
      await accountsService.create({
        ...createAccountPayload,
        ...payload
      }, mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Must be successfull when sending correct payload", async () => {
    console.log("createAccountPayload", createAccountPayload);

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
