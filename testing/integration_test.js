const supertest = require("supertest");
const app = require("../routers/users");

describe("POST /auth/login", () => {
  it("should return a 200 OK status code", async () => {
    const response = await supertest(app).post("/auth/login").send({
      email: "sofi.sidik12@gmail.com",
      sandi: "sidik123",
    });
    expect(response.statusCode).toBe(200);
  });
});
