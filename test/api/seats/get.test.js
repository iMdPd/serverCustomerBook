const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Seat = require("../../../models/seat.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET/api/seats", () => {
  beforeEach(async () => {
    const testSeatOne = new Seat({
      _id: "64733285595f41217eacfe0d",
      day: 1,
      seat: 3,
      client: "Amanda Doe",
      email: "amandadoe@example.com",
    });
    await testSeatOne.save();

    const testSeatTwo = new Seat({
      _id: "64733285595f41217eacfe0e",
      day: 1,
      seat: 9,
      client: "Curtis Johnson",
      email: "curtisj@example.com",
    });
    await testSeatTwo.save();
  });

  afterEach(async () => {
    await Seat.deleteMany();
  });

  it("/ should return all seats", async () => {
    const res = await request(server).get("/api/seats");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:id should return one seat by :id ", async () => {
    const res = await request(server).get(
      "/api/seats/64733285595f41217eacfe0e"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).not.to.be.null;
  });
});
