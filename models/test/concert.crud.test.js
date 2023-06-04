const Concert = require("../concert.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

const createTestData = async () => {
  const testConOne = new Concert({
    performer: "John Doe",
    genre: "Rock",
    price: 25,
    day: 1,
    image: "/img/uploads/1fsd324fsdg.jpg",
  });
  await testConOne.save();

  const testConTwo = new Concert({
    performer: "Rebekah Parker",
    genre: "R&B",
    price: 25,
    day: 1,
    image: "/img/uploads/2f342s4fsdg.jpg",
  });
  await testConTwo.save();
};

describe("Concert CRUD", () => {
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
      await Concert.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const concerts = await Concert.find();

      expect(concerts.length).to.be.equal(2);
    });

    it("should return a proper document by various params with 'findOne' method", async () => {
      const concert = await Concert.findOne({
        performer: "John Doe",
        genre: "Rock",
        price: 25,
        day: 1,
        image: "/img/uploads/1fsd324fsdg.jpg",
      });

      expect(concert).not.to.be.null;
    });
  });

  describe("Creating data", () => {
    it("should insert new document with 'insertOne' method", async () => {
      const concert = new Concert({
        performer: "Maybell Haley",
        genre: "Pop",
        price: 40,
        day: 1,
        image: "/img/uploads/hdfh42sd213.jpg",
      });
      await concert.save();

      expect(concert.isNew).to.be.false;
    });

    after(async () => {
      await Concert.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Concert.deleteMany();
    });

    it("should properly update document with 'updateOne' method", async () => {
      await Concert.updateOne(
        { performer: "John Doe" },
        { $set: { performer: "Amanda Doe" } }
      );

      const updatedConcert = await Concert.findOne({ performer: "Amanda Doe" });
      expect(updatedConcert).not.to.be.null;
    });

    it("should properly update docment with 'save' method", async () => {
      const concert = await Concert.findOne();

      concert.genre = "POP";
      await concert.save();

      const updatedConcert = await Concert.findOne({
        genre: "POP",
      });

      expect(updatedConcert).not.to.be.null;
    });

    it("should properly update multiple docments with 'updateMany' method", async () => {
      await Concert.updateMany({}, { $set: { price: 150 } });

      const updatedConcert = await Concert.find({
        price: 150,
      });

      expect(updatedConcert.length).to.be.equal(2);
    });
  });

  describe("Removing data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Concert.deleteMany();
    });

    it("should properly remove document with 'deleteOne' method", async () => {
      await Concert.deleteOne({
        genre: "Rock",
      });

      const removedConcert = await Concert.findOne({
        genre: "Rock",
      });

      expect(removedConcert).to.be.null;
    });

    it("should properly remove document with 'remove' method", async () => {
      const concert = await Concert.findOne({
        image: "/img/uploads/1fsd324fsdg.jpg",
      });

      concert.remove();

      const removedConcert = await Concert.findOne({
        image: "/img/uploads/1fsd324fsdg.jpg",
      });

      expect(removedConcert).to.be.null;
    });

    it("should properly remove multiple documents with 'deleteMany' method", async () => {
      await Concert.deleteMany();

      const concert = await Concert.find();

      expect(concert.length).to.be.equal(0);
    });
  });
});
