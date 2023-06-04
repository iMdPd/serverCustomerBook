const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Seat = require("../../../models/seat.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("POST/api/seats", () => {
  beforeEach(async () => {
    const testSeatOne = new Seat({
      _id: "64733285595f41217eacfe0d",
      day: 1,
      seat: 3,
      client: "Amanda Doe",
      email: "amandadoe@example.com",
    });
    await testSeatOne.save();
  });

  afterEach(async () => {
    await Seat.deleteMany();
  });

  it("/ should insert new document to db and return success", async () => {
    const res = await request(server).post("/api/seats").send({
      day: 1,
      seat: 9,
      client: "Curtis Johnson",
      email: "curtisj@example.com",
    });

    const newSeat = await Seat.findOne({
      client: "Curtis Johnson",
    });

    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("You've successfully added new seat");
    expect(newSeat).not.to.be.null;
  });

  it("/ should throw an error when insert new document with identical 'day' and 'seat' values to db", async () => {
    const res = await request(server).post("/api/seats").send({
      day: 1,
      seat: 3,
      client: "Amanda Doe",
      email: "amandadoe@example.com",
    });

    expect(res.status).to.be.equal(409);
    expect(res.body.message).to.be.equal("The slot is already taken...");
  });
});
