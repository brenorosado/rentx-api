import server from "../server";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { Account } from "@prisma/client";

const createAccountPayload = {
  email: "jesttest3@jesttest3.com",
  password: "123456",
  name: "Jest Test",
  cnh: "987654321",
  role: "USER"
};

let createdAccount: Account;
let bearerToken: string;

describe("GET at /account", () => {
  it("Creating account for tests", async () => {
    const res = await request(server).post("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(201);

    createdAccount = res.body;
  });

  it("Authenticating for tests", async () => {
    const authRes = await request(server).post("/authenticate")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .send(createAccountPayload)
      .expect(200);

    bearerToken = authRes.body.token;
  });

  it("Must fail when not authenticated", async () => {
    await request(server).get("/account")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(403);
  });

  it("Must be successfull when authenticated", async () => {
    const res = await request(server).get("/account")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("content-type", /json/)
      .expect(200);

    const account = res.body;

    expect(account).toEqual(
      expect.objectContaining(createdAccount)
    );
  });

  it("Deleting the created account for tests", async () => {
    await request(server).delete("/account")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send(createAccountPayload)
      .expect("content-type", /json/)
      .expect(200);
  });
});
