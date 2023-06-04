const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Seat = require("../../../models/seat.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/seats", () => {
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

  it("/:id should properly delete choosen document and return sucess", async () => {
    const res = await request(server).delete(
      "/api/seats/64733285595f41217eacfe0d"
    );
    const seat = await Seat.findOne({ client: "Amanda Doe" });

    expect(res.body.message).to.be.equal(
      "You've successfully deleted seat id: 64733285595f41217eacfe0d"
    );

    expect(seat).to.be.null;
  });
});
