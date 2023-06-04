const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Testimonial = require("../../../models/testimonial.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("DELETE /api/testimonials", () => {
  beforeEach(async () => {
    const testTesOne = new Testimonial({
      _id: "6473303f595f41217eacfe08",
      author: "John Doe",
      text: "This company is worth every coin!",
    });
    await testTesOne.save();
  });

  afterEach(async () => {
    await Testimonial.deleteMany();
  });

  it("/:id should properly delete choosen document and return sucess", async () => {
    const res = await request(server).delete(
      "/api/testimonials/6473303f595f41217eacfe08"
    );
    const testimonial = await Testimonial.findOne({ author: "John Doe" });

    expect(res.body.message).to.be.equal(
      "You've successfully deleted testimonial id: 6473303f595f41217eacfe08"
    );

    expect(testimonial).to.be.null;
  });
});
