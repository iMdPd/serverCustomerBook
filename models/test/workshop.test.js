const Workshop = require("../workshop.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Workshop Model", () => {
  afterEach(() => {
    mongoose.models = {};
  });

  it("should throw an error, if there is no args", () => {
    const wor = new Workshop({});

    wor.validate((err) => {
      expect(err.errors.name && err.errors.concertId).to.exist;
    });
  });

  it("should throw an error, if there is missing 'name' arg'", () => {
    const wor = new Workshop({
      concertId: "6473318d595f41217eacfe0a",
    });

    wor.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).not.to.exist;
    });
  });

  it("should throw an error, if there is missing 'concertId' arg'", () => {
    const wor = new Workshop({
      name: "Rock Music Style",
    });

    wor.validate((err) => {
      expect(err.errors.concertId).to.exist;
      expect(err.errors.name).not.to.exist;
    });
  });

  it("should throw an error, if any of args have valid types", () => {
    const cases = [
      {
        name: {},
        concertId: [],
      },
      {
        name: false,
        concertId: {},
      },
      {
        name: function () {},
        concertId: [],
      },
    ];

    for (let data of cases) {
      const wor = new Workshop(data);

      wor.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should not to trow error, if all args meet requirements", () => {
    const cases = [
      {
        name: "Rock Music Style",
        concertId: "6473318d595f41217eacfe0a",
      },
      {
        name: "How to make you voice grooowl",
        concertId: "6473318d595f41217eacfe0a",
      },
      {
        name: "Lorem ipsum dolor sit amet",
        concertId: "6473318d595f41217eacfe0c",
      },
    ];

    for (let data of cases) {
      const wor = new Workshop(data);

      wor.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
