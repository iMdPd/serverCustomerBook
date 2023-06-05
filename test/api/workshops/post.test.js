const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Workshop = require("../../../models/workshop.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("POST /api/workshops", () => {
  afterEach(async () => {
    await Workshop.deleteMany();
  });

  it("/ should insert new document to db and return success", async () => {
    const res = await request(server).post("/api/workshops").send({
      name: "Lorem ipsum dolor sit amet",
      concertId: "6473318d595f41217eacfe0c",
    });

    const newWorkshop = await Workshop.findOne({
      name: "Lorem ipsum dolor sit amet",
    });

    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal(
      "You've successfully added new workshop"
    );
    expect(newWorkshop).not.to.be.null;
  });
});
