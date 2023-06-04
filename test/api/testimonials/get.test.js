const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Testimonial = require("../../../models/testimonial.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("GET /api/testimonials", () => {
  beforeEach(async () => {
    const testTesOne = new Testimonial({
      _id: "6473303f595f41217eacfe08",
      author: "John Doe",
      text: "This company is worth every coin!",
    });
    await testTesOne.save();

    const testTesTwo = new Testimonial({
      _id: "6473303f595f41217eacfe09",
      author: "Amanda Doe",
      text: "They really know how to make you happy.",
    });
    await testTesTwo.save();
  });

  afterEach(async () => {
    await Testimonial.deleteMany();
  });

  it("/ should return all testimonials", async () => {
    const res = await request(server).get("/api/testimonials");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:id should return one testimonial by :id ", async () => {
    const res = await request(server).get(
      "/api/testimonials/6473303f595f41217eacfe08"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
    expect(res.body).not.to.be.null;
  });
});
