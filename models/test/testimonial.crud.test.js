const Testimonial = require("../testimonial.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

const createTestData = async () => {
  const testTesOne = new Testimonial({
    author: "John Doe",
    text: "This company is worth every coin!",
  });
  await testTesOne.save();

  const testTesTwo = new Testimonial({
    author: "Amanda Doe",
    text: "They really know how to make you happy.",
  });
  await testTesTwo.save();
};

describe("Testimonial CRUD", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/NewWaveDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe("Reading data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Testimonial.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const testimonials = await Testimonial.find();

      expect(testimonials.length).to.be.equal(2);
    });

    it("should return a proper document by various params with 'findOne' method", async () => {
      const testimonial = await Testimonial.findOne({
        author: "John Doe",
        text: "This company is worth every coin!",
      });

      expect(testimonial).not.to.be.null;
    });
  });

  describe("Creating data", () => {
    it("should insert new document with 'insertOne' method", async () => {
      const testimonial = new Testimonial({
        author: "Thomas Json",
        text: "Lorem ipsum dolor sit amet.",
      });
      await testimonial.save();

      expect(testimonial.isNew).to.be.false;
    });

    after(async () => {
      await Testimonial.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Testimonial.deleteMany();
    });

    it("should properly update document with 'updateOne' method", async () => {
      await Testimonial.updateOne(
        { author: "John Doe" },
        { $set: { author: "John Doe" } }
      );

      const updatedTestimonial = await Testimonial.findOne({
        author: "John Doe",
      });
      expect(updatedTestimonial).not.to.be.null;
    });

    it("should properly update docment with 'save' method", async () => {
      const testimonial = await Testimonial.findOne();

      testimonial.text = "Lorem ipsum dolor sit amet.";
      await testimonial.save();

      const updatedTestimonial = await Testimonial.findOne({
        text: "Lorem ipsum dolor sit amet.",
      });

      expect(updatedTestimonial).not.to.be.null;
    });

    it("should properly update multiple docments with 'updateMany' method", async () => {
      await Testimonial.updateMany(
        {},
        { $set: { text: "This text was updated" } }
      );

      const updatedTestimonial = await Testimonial.find({
        text: "This text was updated",
      });

      expect(updatedTestimonial.length).to.be.equal(2);
    });
  });

  describe("Removing data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Testimonial.deleteMany();
    });

    it("should properly remove document with 'deleteOne' method", async () => {
      await Testimonial.deleteOne({
        author: "John Doe",
      });

      const removedTestimonial = await Testimonial.findOne({
        author: "John Doe",
      });

      expect(removedTestimonial).to.be.null;
    });

    it("should properly remove document with 'remove' method", async () => {
      const testimonial = await Testimonial.findOne({
        author: "Amanda Doe",
      });

      testimonial.remove();

      const removedTestimonial = await Testimonial.findOne({
        author: "Amanda Doe",
      });

      expect(removedTestimonial).to.be.null;
    });

    it("should properly remove multiple documents with 'deleteMany' method", async () => {
      await Testimonial.deleteMany();

      const testimonial = await Testimonial.find();

      expect(testimonial.length).to.be.equal(0);
    });
  });
});
