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

  async find (id: string) {
    return new Promise<Account>((resolve, reject) => {
      resolve(accountPayload);
    });
  },

  async delete (id: string) {
    return new Promise<Account>((resolve, reject) => resolve(accountPayload));
  },

  async authenticate (id: string) {
    return new Promise<Account>((resolve, reject) => resolve(accountPayload));
  }
};

const mockedEncryptPassword = (password: string) => new Promise<string>((resolve, reject) => resolve(password));
const mockedValidatePassoword = (password: string, encryptedPassword: string) =>
  new Promise<boolean>((resolve, reject) => resolve(password === encryptedPassword));

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
      },
      mockedAccountsRepository,
      mockedEncryptPassword);
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Should fail when sending invalid cnh", async () => {
    expect(async () => {
      const createAccountPayload = accountPayload;

      await accountsService.create({
        ...createAccountPayload,
        cnh: "123761"
      },
      mockedAccountsRepository,
      mockedEncryptPassword);
    }).rejects.toThrow(new CustomError(400, "Nº de CNH inválido."));
  });

  it("Should be successfull when sending correct payload", async () => {
    const createAccountPayload = { ...accountPayload };

    const createdAccount = await accountsService.create(
      createAccountPayload,
      mockedAccountsRepository,
      mockedEncryptPassword
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
      const updateAccountPayload = { ...accountPayload };
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

  it("Should fail when sending invalid cnh", async () => {
    expect(async () => {
      const updateAccountPayload = accountPayload;

      await accountsService.update({
        requestingUser: {
          account: {
            ...updateAccountPayload,
            id: "mockedId"
          },
          iat: 123
        },
        ...updateAccountPayload,
        cnh: "123761",
        image: { id: "imageId" }
      }, mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, "Nº de CNH inválido."));
  });

  it("Should fail when trying to update account of another user", () => {
    expect(async () => {
      const updateAccountPayload = { ...accountPayload };
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
    const updateAccountPayload = { ...accountPayload };

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

describe("Find accounts service test", () => {
  it("Should faild when sending incorrect requestingUser (unauthenticated)", async () => {
    expect(async () => {
      const findAccountPayload = { ...accountPayload };
      delete findAccountPayload.password;

      await accountsService.find(
        {
          account: {
            ...findAccountPayload,
            id: ""
          },
          iat: 123
        }
        , mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, "Atributo 'id' é necessário."));
  });

  it("Should be successfull when sending correct requestingUser", async () => {
    const findAccountPayload = { ...accountPayload };

    delete findAccountPayload.password;

    const createdAccount = await accountsService.find(
      {
        account: {
          ...findAccountPayload
        },
        iat: 123
      },
      mockedAccountsRepository
    );

    expect(createdAccount).toEqual(
      expect.objectContaining(findAccountPayload)
    );
  });
});

describe("Delete accounts service test", () => {
  it("Should faild when sending incorrect requestingUser (unauthenticated)", async () => {
    expect(async () => {
      const deleteAccountPayload = { ...accountPayload };
      delete deleteAccountPayload.password;

      await accountsService.delete(
        {
          account: {
            ...deleteAccountPayload,
            id: ""
          },
          iat: 123
        }
        , mockedAccountsRepository);
    }).rejects.toThrow(new CustomError(400, "Atributo 'id' é necessário."));
  });

  it("Should be successfull when sending correct requestingUser", async () => {
    const deleteAccountPayload = { ...accountPayload };

    delete deleteAccountPayload.password;

    const deletedAccount = await accountsService.delete(
      {
        account: {
          ...deleteAccountPayload
        },
        iat: 123
      },
      mockedAccountsRepository
    );

    expect(deletedAccount).toEqual(
      expect.objectContaining(deleteAccountPayload)
    );
  });
});

describe("Authenticate service test", () => {
  it.each([
    ["email", { email: "" }],
    ["password", { password: "" }]
  ])("Should fail when missing %s", async (key, payload) => {
    expect(async () => {
      const authenticatePayload = { ...accountPayload };

      await accountsService.authenticate(
        {
          ...authenticatePayload,
          ...payload
        },
        mockedAccountsRepository,
        mockedValidatePassoword
      );
    }).rejects.toThrow(new CustomError(400, `Atributo '${key}' é necessário.`));
  });

  it("Should fail when sending incorrect password", async () => {
    expect(async () => {
      const authenticatePayload = { ...accountPayload };

      await accountsService.authenticate(
        {
          ...authenticatePayload,
          password: "123"
        },
        mockedAccountsRepository,
        mockedValidatePassoword
      );
    }).rejects.toThrow(new CustomError(401, "Senha incorreta."));
  });

  it("Should be successfull when sending correct payload", async () => {
    const authenticatePayload = { ...accountPayload };

    const authenticateRes = await accountsService.authenticate(
      authenticatePayload,
      mockedAccountsRepository,
      mockedValidatePassoword
    );

    const expectedAccount = { ...authenticatePayload };
    delete expectedAccount.password;

    expect(authenticateRes.account).toEqual(
      expect.objectContaining(expectedAccount)
    );
  });
});
