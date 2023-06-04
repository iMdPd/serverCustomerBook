const Testimonial = require("../testimonial.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Testimonial Model", () => {
  afterEach(() => {
    mongoose.models = {};
  });

  it("should throw an error, if there is no args", () => {
    const tes = new Testimonial({});

    tes.validate((err) => {
      expect(err.errors.author && err.errors.text).to.exist;
    });
  });

  it("should throw an error, if there is missing 'author' arg'", () => {
    const tes = new Testimonial({
      text: "This company is worth every coin!",
    });

    tes.validate((err) => {
      expect(err.errors.author).to.exist;
      expect(err.errors.text).not.to.exist;
    });
  });

  it("should throw an error, if there is missing 'text' arg'", () => {
    const tes = new Testimonial({
      author: "John Doe",
    });

    tes.validate((err) => {
      expect(err.errors.text).to.exist;
      expect(err.errors.author).not.to.exist;
    });
  });

  it("should throw an error, if any of args have valid types", () => {
    const cases = [
      {
        author: {},
        text: function () {},
      },
      {
        author: true,
        text: [],
      },
      {
        author: {},
        text: false,
      },
    ];

    for (let data of cases) {
      const tes = new Testimonial(data);

      tes.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should not to trow error, if all args meet requirements", () => {
    const cases = [
      {
        author: "John Doe",
        text: "This company is worth every coin!",
      },
      {
        author: "Amanda Doe",
        text: "They really know how to make you happy.",
      },
      {
        author: "Thomas Json",
        text: "Lorem ipsum dolor sit amet.",
      },
    ];

    for (let data of cases) {
      const tes = new Testimonial(data);

      tes.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
