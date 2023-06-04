const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Seat = require("../../../models/seat.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("PUT /api/seats", () => {
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

  it("/:id should update choosen document and return success", async () => {
    const res = await request(server)
      .put("/api/seats/64733285595f41217eacfe0d")
      .send({ email: "updated@email.com" });

    const updatedSeat = await Seat.findOne({
      _id: "64733285595f41217eacfe0d",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(updatedSeat.email).to.be.equal("updated@email.com");
  });
});
