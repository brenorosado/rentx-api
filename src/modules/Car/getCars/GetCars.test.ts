import server from "../../../server";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { Account, Car, Image } from "@prisma/client";
import { CarGetParams } from "./GetCarsParamsType";

const createCarsPayloads = [
    [
        "Car creation.",
        {
            active: true,
            name: "Fiat Uno",
            manufacturer: "Fiat",
            pricePerDay: 76,
            maxSpeed: 160,
            zeroToAHundredTime: 9.2,
            fuelType: "flex",
            gear: "manual",
            maxPeople: 5,
            horsePower: 70,
            description: "A great car for road trips."
        }
    ],
    [
        "Car creation.",
        {
            active: true,
            name: "Gol",
            manufacturer: "Volkswagen",
            pricePerDay: 88,
            maxSpeed: 180,
            zeroToAHundredTime: 7.8,
            fuelType: "flex",
            gear: "manual",
            maxPeople: 5,
            horsePower: 82,
            description: "A great car for road trips."
        }
    ],
    [
        "Car creation",
        {
            active: false,
            name: "Tracker",
            manufacturer: "Chevrolet",
            pricePerDay: 125,
            maxSpeed: 220,
            zeroToAHundredTime: 5.7,
            fuelType: "flex",
            gear: "automatic",
            maxPeople: 5,
            horsePower: 112,
            description: "A great car for road trips."
        }
    ]
];

const createImagePayload = {
    fileName: "ImageTest",
    fileExtension: "jpeg",
    base64: "data:image/jpeg;base64,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"
}

const createdCars: Car[] = [];
const createdImages: Image[] = [];

const defaultParams = {
    page: 1,
    elementsPerPage: 10
}

const createAccountPayload = {
  email: "jesttest9@jesttest9.com",
  password: "123456",
  name: "Jest Test",
  cnh: "987654321",
  role: "ADMIN"
};

let createdAccount: Account;
let bearerToken: string;

describe("GET at /car", () => {
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

    bearerToken = `Bearer ${authRes.body.token}`;
  });

  it.each(
    createCarsPayloads
  )("Creating cars for tests", async (key, payload) => {
    const imageRes = await request(server).post("/image")
        .set("Accept", "application/json")
        .set("Authorization", bearerToken)
        .expect("content-type", /json/)
        .send(createImagePayload)
        .expect(201);

    createdImages.push(imageRes.body);

    const carRes = await request(server).post("/car")
        .set("Accept", "application/json")
        .set("Authorization", bearerToken)
        .expect("content-type", /json/)
        // @ts-ignore
        .send({ ...payload, images: [{ id: imageRes.body.id }] })
        .expect(201);

    createdCars.push(carRes.body);
  });

  it("GET without optionals filters", async () => {
    const carsRes = await request(server).get("/car")
        .query({ page: 1, elementsPerPage: 10 })
        .set("Accept", "application/json")
        .set("Authorization", bearerToken)
        .expect("content-type", /json/)
        .expect(200);

    expect(carsRes.body.length).toBeGreaterThanOrEqual(createCarsPayloads.length);
  });

  it.each([
      ["active filter true", { params: { active: true }, conditions: { active: true } }],
      ["active filter false", { params: { active: false }, conditions: { active: false } }],
      ["name filter 'Fiat Uno'", { params: { name: "Fiat Uno" }, conditions: { name: "Fiat Uno" } }],
      ["manufacturer filter 'Fiat'", { params: { manufacturer: "Fiat" }, conditions: { manufacturer: "Fiat" } }]
  ])("GET with %s", async (key, info) => {
    const cars = await request(server).get("/car")
        .query({...defaultParams, ...info.params})
        .set("Accept", "application/json")
        .set("Authorization", bearerToken)
        .expect("content-type", /json/)
        .expect(200);

        expect(cars.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ...info.conditions
                })
            ])
        )
  });

  it("GET with maxPricePerDay filter", async () => {
    const cars = await request(server).get("/car")
      .query({...defaultParams, maxPricePerDay: 100 })
      .set("Accept", "application/json")
      .set("Authorization", bearerToken)
      .expect("content-type", /json/)
      .expect(200);

      cars.body.forEach((car: Car) => {
        expect(car.pricePerDay <= 100)
      })
  })

  it("Deleting the created images", async () => {
    createdImages.forEach(async (image) => {
      await request(server).delete(`/image/${image.id}`)
        .set("Accept", "application/json")
        .set("Authorization", bearerToken)
        .expect("content-type", /json/)
        .expect(200);
    })
  })

  it("Deleting the created cars", async () => {
    createdCars.forEach(async (car) => {
      await request(server).delete(`/car/${car.id}`)
        .set("Accept", "application/json")
        .set("Authorization", bearerToken)
        .expect("content-type", /json/)
        .expect(200);
    })
  });

  it("Deleting the created account for tests", async () => {
    await request(server).delete("/account")
      .set("Accept", "application/json")
      .set("Authorization", bearerToken)
      .send(createAccountPayload)
      .expect("content-type", /json/)
      .expect(200);
  });
});
