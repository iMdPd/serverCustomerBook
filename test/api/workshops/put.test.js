const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Workshop = require("../../../models/workshop.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("PUT /api/workshops", () => {
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

  it("/:id should update choosen document and return success", async () => {
    const res = await request(server)
      .put("/api/workshops/647dfbfda6a2129a32a406e4")
      .send({ name: "This name has been updated!" });

    const updatedWorkshop = await Workshop.findOne({
      _id: "647dfbfda6a2129a32a406e4",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(updatedWorkshop.name).to.be.equal("This name has been updated!");
  });
});
