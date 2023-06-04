const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("POST /api/concerts", () => {
  afterEach(async () => {
    await Concert.deleteMany();
  });

  it("/ should insert new document to db and return success", async () => {
    const res = await request(server).post("/api/concerts").send({
      performer: "John Doe",
      genre: "Rock",
      price: 25,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });

    const newConcert = await Concert.findOne({
      performer: "John Doe",
    });

    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal(
      "You've successfully added new concert"
    );
    expect(newConcert).not.to.be.null;
  });
});
