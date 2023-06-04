const Concert = require("../concert.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Concert Model", () => {
  afterEach(() => {
    mongoose.models = {};
  });

  it("should throw an error, if there is no args", () => {
    const con = new Concert({});

    con.validate((err) => {
      expect(
        err.errors.performer &&
          err.errors.genre &&
          err.errors.price &&
          err.errors.day &&
          err.errors.image
      ).to.exist;
    });
  });

  it("should throw an error, if there is missing 'performer' arg'", () => {
    const con = new Concert({
      _id: {
        $oid: "6473318d595f41217eacfe0a",
      },
      genre: "Rock",
      price: 25,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });

    con.validate((err) => {
      expect(err.errors.performer).to.exist;
      expect(
        err.errors.genre &&
          err.errors.price &&
          err.errors.day &&
          err.errors.image
      ).not.to.exist;
    });
  });

  it("should throw an error, if there is missing 'genre' arg'", () => {
    const con = new Concert({
      _id: {
        $oid: "6473318d595f41217eacfe0a",
      },
      performer: "John Doe",
      price: 25,
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });

    con.validate((err) => {
      expect(err.errors.genre).to.exist;
      expect(
        err.errors.performer &&
          err.errors.price &&
          err.errors.day &&
          err.errors.image
      ).not.to.exist;
    });
  });

  it("should throw an error, if there is missing 'price' arg'", () => {
    const con = new Concert({
      _id: {
        $oid: "6473318d595f41217eacfe0a",
      },
      performer: "John Doe",
      genre: "Rock",
      day: 1,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });

    con.validate((err) => {
      expect(err.errors.price).to.exist;
      expect(
        err.errors.performer &&
          err.errors.genre &&
          err.errors.day &&
          err.errors.image
      ).not.to.exist;
    });
  });

  it("should throw an error, if there is missing 'day' arg'", () => {
    const con = new Concert({
      _id: {
        $oid: "6473318d595f41217eacfe0a",
      },
      performer: "John Doe",
      genre: "Rock",
      price: 25,
      image: "/img/uploads/1fsd324fsdg.jpg",
    });

    con.validate((err) => {
      expect(err.errors.day).to.exist;
      expect(
        err.errors.performer &&
          err.errors.genre &&
          err.errors.price &&
          err.errors.image
      ).not.to.exist;
    });
  });

  it("should throw an error, if there is missing 'image' arg'", () => {
    const con = new Concert({
      _id: {
        $oid: "6473318d595f41217eacfe0a",
      },
      performer: "John Doe",
      genre: "Rock",
      price: 25,
      day: 1,
    });
    con.validate((err) => {
      expect(err.errors.image).to.exist;
      expect(
        err.errors.performer &&
          err.errors.genre &&
          err.errors.price &&
          err.errors.day
      ).not.to.exist;
    });
  });

  it("should throw an error, if any of args have valid types", () => {
    const cases = [
      {
        performer: {},
        genre: [],
        price: "",
        day: "",
        image: {},
      },
      {
        performer: [],
        genre: {},
        price: [],
        day: [],
        image: "/img/uploads/1fsd324fsdg.jpg",
      },
      {
        performer: [],
        genre: true,
        price: false,
        day: 1,
        image: {},
      },
    ];

    for (let data of cases) {
      const con = new Concert(data);

      con.validate((err) => {
        expect(err.errors).to.exist;
      });
    }
  });

  it("should not to trow error, if all args meet requirements", () => {
    const cases = [
      {
        performer: "John Doe",
        genre: "Rock",
        price: 25,
        day: 1,
        image: "/img/uploads/1fsd324fsdg.jpg",
      },
      {
        performer: "Rebekah Parker",
        genre: "R&B",
        price: 25,
        day: 1,
        image: "/img/uploads/2f342s4fsdg.jpg",
      },
      {
        performer: "Maybell Haley",
        genre: "Pop",
        price: 40,
        day: 1,
        image: "/img/uploads/hdfh42sd213.jpg",
      },
    ];

    for (let data of cases) {
      const con = new Concert(data);

      con.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
