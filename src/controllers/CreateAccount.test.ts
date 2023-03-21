import server from "../server";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { Account } from "@prisma/client";
import bcryptjs from "bcryptjs";

const createAccountPayload = {
  email: "jesttest1@jesttest1.com",
  password: "123456",
  name: "Jest Test",
  cnh: "12345678910",
  role: "USER"
};

const createdAccountResponse = {
  email: "jesttest1@jesttest1.com",
  name: "Jest Test",
  cnh: "12345678910",
  role: "USER",
  active: true
};

let createdAccount: Account;

describe("POST at /account", () => {
  it.each([
    ["when missing email", { email: "" }],
    ["when missing name", { name: "" }],
    ["when missing cnh", { cnh: "" }],
    ["when missing role", { role: "" }],
    ["when missing password", { password: "" }]
  ])("Must fail %s", async (key, payload) => {
    const randomCnh = await bcryptjs.genSalt(11);

    console.log("RANDOM CNH", randomCnh);
    console.log("RANDOMCNH");

    await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send({ ...createAccountPayload, ...payload })
      .expect(400);
  });

  it("Must be successfull when sending correct payload", async () => {
    const res = await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(201);

    createdAccount = res.body;

    expect(createdAccount).toEqual(
      expect.objectContaining(createdAccountResponse)
    );
  });

  it("Must fail when sending a registered email", async () => {
    await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(400);
  });

  it("Deleting the created account for tests", async () => {
    const authRes = await request(server).post("/authenticate")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(200);

    const { token } = authRes.body;

    await request(server).delete("/account")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(createAccountPayload)
      .expect("content-type", /json/)
      .expect(200);
  });
});