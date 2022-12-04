import server from "../../../server";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { Account } from "@prisma/client";

const createAccountPayload = {
  email: "jesttest4@jesttest4.com",
  password: "123456",
  name: "Jest Test",
  cnh: "987654321",
  role: "USER"
};

let createdAccount: Account;

describe("POST at /authenticate", () => {
  it("Creating account for tests", async () => {
    const res = await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(201);

    createdAccount = res.body;
  });

  it.each([
    ["when missing email", { email: "" }],
    ["when missing password", { password: "" }]
  ])("Authentication must fail %s", async (key, payload) => {
    await request(server).post("/authenticate")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send({ ...createAccountPayload, ...payload })
      .expect(400);
  });

  it("Must be unauthorized when sending an unexisting account", async () => {
    await request(server).post("/authenticate")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send({ email: "unexistingaccount@email.com", password: "654321" })
      .expect(401);
  });

  it("Must be successfull when sending a correct payload", async () => {
    await request(server).post("/authenticate")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(200);
  });

  it("Deleting the created account for tests", async () => {
    const authRes = await request(server).post("/authenticate")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(200);

    const { token } = authRes.body;

    await request(server).delete(`/account/${createdAccount.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(createAccountPayload)
      .expect("content-type", /json/)
      .expect(200);
  });
});
