const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("PUT /api/concerts", () => {
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

  it("/:id should update choosen document and return success", async () => {
    const res = await request(server)
      .put("/api/concerts/6473318d595f41217eacfe0b")
      .send({ genre: "POP" });

    const updatedConcert = await Concert.findOne({
      _id: "6473318d595f41217eacfe0b",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(updatedConcert.genre).to.be.equal("POP");
  });
});
