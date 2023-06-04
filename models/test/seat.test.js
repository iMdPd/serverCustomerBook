const Seat = require("../seat.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Seat Model", () => {
  afterEach(() => {
    mongoose.models = {};
  });

  it("should throw an error, if there is no args", () => {
    const seat = new Seat({});

    seat.validate((err) => {
      expect(
        err.errors.day &&
          err.errors.seat &&
          err.errors.client &&
          err.errors.email
      ).to.exist;
    });
  });

  it("should throw an error, if there is missing 'day' arg'", () => {
    const seat = new Seat({
      seat: 3,
      client: "Amanda Doe",
      email: "amandadoe@example.com",
    });

    seat.validate((err) => {
      expect(err.errors.day).to.exist;
      expect(err.errors.seat && err.errors.client && err.errors.email).not.to
        .exist;
    });
  });

  it("should throw an error, if there is missing 'seat' arg'", () => {
    const seat = new Seat({
      day: 1,
      client: "Amanda Doe",
      email: "amandadoe@example.com",
    });

    seat.validate((err) => {
      expect(err.errors.seat).to.exist;
      expect(err.errors.day && err.errors.client && err.errors.email).not.to
        .exist;
    });
  });

  it("should throw an error, if there is missing 'client' arg'", () => {
    const seat = new Seat({
      day: 1,
      seat: 3,
      email: "amandadoe@example.com",
    });

    seat.validate((err) => {
      expect(err.errors.client).to.exist;
      expect(err.errors.day && err.errors.seat && err.errors.email).not.to
        .exist;
    });
  });

  it("should throw an error, if there is missing 'email' arg'", () => {
    const seat = new Seat({
      day: 1,
      seat: 3,
      client: "Amanda Doe",
    });

    seat.validate((err) => {
      expect(err.errors.email).to.exist;
      expect(err.errors.day && err.errors.seat && err.errors.client).not.to
        .exist;
    });
  });

  it("should throw an error, if any of args have valid types", () => {
    const cases = [
      {
        day: "",
        seat: [],
        client: {},
        email: [],
      },
      {
        day: {},
        seat: "",
        client: {},
        email: [],
      },
      {
        day: function () {},
        seat: "",
        client: {},
        email: {},
      },
    ];

    for (let data of cases) {
      const seat = new Seat(data);

      seat.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should not to trow error, if all args meet requirements", () => {
    const cases = [
      {
        day: 1,
        seat: 3,
        client: "Amanda Doe",
        email: "amandadoe@example.com",
      },
      {
        day: 1,
        seat: 9,
        client: "Curtis Johnson",
        email: "curtisj@example.com",
      },
      {
        day: 1,
        seat: 10,
        client: "Felix McManara",
        email: "felxim98@example.com",
      },
    ];

    for (let data of cases) {
      const seat = new Seat(data);

      seat.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
