const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../server.js");
const Testimonial = require("../../../models/testimonial.model.js");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe("POST /api/testimonials", () => {
  afterEach(async () => {
    await Testimonial.deleteMany();
  });

  it("/ should insert new document to db and return success", async () => {
    const res = await request(server).post("/api/testimonials").send({
      author: "John Doe",
      text: "This company is worth every coin!",
    });

    const newTestimonial = await Testimonial.findOne({
      author: "John Doe",
    });

    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal(
      "You've successfully added new testimonial"
    );
    expect(newTestimonial).not.to.be.null;
  });
});
