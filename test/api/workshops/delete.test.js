const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Workshop = require("../../../models/workshop.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/workshops", () => {
  beforeEach(async () => {
    const testWorOne = new Workshop({
      _id: "647e30012f06803e25cfe58a",
      name: "Rock Music Style",
      concertId: "6473318d595f41217eacfe0a",
    });

    await testWorOne.save();
  });

  afterEach(async () => {
    await Workshop.deleteMany();
  });

  it("/:id should properly delete choosen document and return sucess", async () => {
    const res = await request(server).delete(
      "/api/workshops/647e30012f06803e25cfe58a"
    );
    const workshop = await Workshop.findOne({ name: "Rock Music Style" });

    expect(res.body.message).to.be.equal(
      "You've successfully deleted workshop id: 647e30012f06803e25cfe58a"
    );

    expect(workshop).to.be.null;
  });
});
