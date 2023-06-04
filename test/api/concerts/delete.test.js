const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/concerts", () => {
  beforeEach(async () => {
    const testConOne = new Concert({
      _id: "6473318d595f41217eacfe0b",
      performer: "John Doe",
      genre: "Rock",
      price: 25,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testConOne.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
  });

  it("/:id should properly delete choosen document and return sucess", async () => {
    const res = await request(server).delete(
      "/api/concerts/6473318d595f41217eacfe0b"
    );
    const concert = await Concert.findOne({ performer: "John Doe" });

    expect(res.body.message).to.be.equal(
      "You've successfully deleted concert id: 6473318d595f41217eacfe0b"
    );

    expect(concert).to.be.null;
  });
});
