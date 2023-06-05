const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Workshop = require("../../../models/workshop.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/workshops", () => {
  beforeEach(async () => {
    const testWorOne = new Workshop({
      _id: "647dfbfda6a2129a32a406e4",
      name: "Rock Music Style",
      concertId: "6473318d595f41217eacfe0a",
    });
    await testWorOne.save();

    const testWorTwo = new Workshop({
      _id: "647dfbe3a6a2129a32a406e3",
      name: "Lorem ipsum dolor sit amet",
      concertId: "6473318d595f41217eacfe0c",
    });
    await testWorTwo.save();
  });

  afterEach(async () => {
    await Workshop.deleteMany();
  });

  it("/ should return all workshops", async () => {
    const res = await request(server).get("/api/workshops");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:id should return one testimonial by :id ", async () => {
    const res = await request(server).get(
      "/api/workshops/647dfbfda6a2129a32a406e4"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).not.to.be.null;
  });
});
