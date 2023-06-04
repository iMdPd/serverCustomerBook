const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Concert = require("../../../models/concert.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/concerts", () => {
  beforeEach(async () => {
    const testConOne = new Concert({
      _id: "6473318d595f41217eacfe0b",
      performer: "John Doe",
      genre: "Rock",
      price: 10,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: "6473318d595f41217eacfe0a",
      performer: "Rebekah Parker",
      genre: "R&B",
      price: 30,
      day: 1,
      image: "/img/uploads/2f342s4fsdg.jpg",
    });
    await testConTwo.save();
  });

  afterEach(async () => {
    await Concert.deleteMany();
  });

  it("/ should return all concerts", async () => {
    const res = await request(server).get("/api/concerts");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:id should return one concert by :id ", async () => {
    const res = await request(server).get(
      "/api/concerts/6473318d595f41217eacfe0b"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).not.to.be.null;
  });

  it("/performer/:performer should return concerts by :performer ", async () => {
    const cases = ["joh", "j", "b", "reb", "Park", "DO", "kER"];

    for (let data of cases) {
      const res = await request(server).get(`/api/concerts/performer/${data}`);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.equal(1);
      expect(res.body).not.to.be.null;
    }
  });

  it("/performer/:performer should throw error if :performer value does'nt match to existing concerts", async () => {
    const cases = ["ab", "Sa", "Dominic", "ANTON", "mark", "po", "OV"];

    for (let data of cases) {
      const res = await request(server).get(`/api/concerts/performer/${data}`);

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal("Not found");
    }
  });

  it("/concerts/genre/:genre should return concerts by :genre", async () => {
    const cases = ["rock", "ROCK", "Ro", "R&b", "r&b", "R&B"];

    for (let data of cases) {
      const res = await request(server).get(`/api/concerts/genre/${data}`);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.equal(1);
      expect(res.body).not.to.be.null;
    }
  });

  it("/concerts/genre/:genre should throw error :genre value does'nt match to existing concerts", async () => {
    const cases = ["POP", "Latino", "HipHop", "Classic", "BMW", "REGGAE"];

    for (let data of cases) {
      const res = await request(server).get(`/api/concerts/genre/${data}`);

      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal("Not found");
    }
  });

  it("/concerts/price/:price_min/:price_max should return concerts from price range", async () => {
    const cases = [
      { price_min: 20, price_max: 50 },
      { price_min: 10, price_max: 40 },
      { price_min: 0, price_max: 70 },
    ];

    for (let { price_min, price_max } of cases) {
      const res = await request(server).get(
        `/api/concerts/price/${price_min}/${price_max}`
      );

      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.lengthOf.above(0);
    }
  });
});
