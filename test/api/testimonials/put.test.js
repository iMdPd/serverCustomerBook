const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Testimonial = require("../../../models/testimonial.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("PUT /api/testimonials", () => {
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

  it("/:id should update choosen document and return success", async () => {
    const res = await request(server)
      .put("/api/testimonials/6473303f595f41217eacfe08")
      .send({ text: "This text has been updated!" });

    const updatedTestimonial = await Testimonial.findOne({
      _id: "6473303f595f41217eacfe08",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(updatedTestimonial.text).to.be.equal("This text has been updated!");
  });
});
