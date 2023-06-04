const Seat = require("../seat.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

const createTestData = async () => {
  const testSeatOne = new Seat({
    day: 1,
    seat: 3,
    client: "Amanda Doe",
    email: "amandadoe@example.com",
  });
  await testSeatOne.save();

  const testSeatTwo = new Seat({
    day: 1,
    seat: 9,
    client: "Curtis Johnson",
    email: "curtisj@example.com",
  });
  await testSeatTwo.save();
};

describe("Seat CRUD", () => {
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
      await Seat.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const seats = await Seat.find();

      expect(seats.length).to.be.equal(2);
    });

    it("should return a proper document by various params with 'findOne' method", async () => {
      const seat = await Seat.findOne({
        day: 1,
        seat: 3,
        client: "Amanda Doe",
        email: "amandadoe@example.com",
      });

      expect(seat).not.to.be.null;
    });
  });

  describe("Creating data", () => {
    afterEach(async () => {
      await Seat.deleteMany();
    });

    it("should insert new document with 'insertOne' method", async () => {
      const seat = new Seat({
        day: 1,
        seat: 3,
        client: "Amanda Doe",
        email: "amandadoe@example.com",
      });
      await seat.save();

      expect(seat.isNew).to.be.false;
    });
  });

  describe("Updating data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Seat.deleteMany();
    });

    it("should properly update document with 'updateOne' method", async () => {
      await Seat.updateOne(
        { client: "Amanda Doe" },
        { $set: { client: "John Doe" } }
      );

      const updatedSeat = await Seat.findOne({
        client: "John Doe",
      });

      expect(updatedSeat).not.to.be.null;
    });

    it("should properly update docment with 'save' method", async () => {
      const seat = await Seat.findOne();

      seat.seat = 25;

      await seat.save();

      const updatedSeat = await Seat.findOne({
        seat: 25,
      });
      expect(updatedSeat).not.to.be.null;
    });

    it("should properly update multiple docments with 'updateMany' method", async () => {
      await Seat.updateMany({}, { $set: { email: "updated@email.com" } });

      const updatedSeat = await Seat.find({
        email: "updated@email.com",
      });
      expect(updatedSeat.length).to.be.equal(2);
    });
  });

  describe("Removing data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Seat.deleteMany();
    });

    it("should properly remove document with 'deleteOne' method", async () => {
      await Seat.deleteOne({
        client: "Curtis Johnson",
      });
      const removedSeat = await Seat.findOne({
        client: "Curtis Johnson",
      });
      expect(removedSeat).to.be.null;
    });

    it("should properly remove document with 'remove' method", async () => {
      const seat = await Seat.findOne({
        seat: 3,
      });

      seat.remove();

      const removedSeat = await Seat.findOne({
        seat: 3,
      });

      expect(removedSeat).to.be.null;
    });

    it("should properly remove multiple documents with 'deleteMany' method", async () => {
      await Seat.deleteMany();
      const seat = await Seat.find();
      expect(seat.length).to.be.equal(0);
    });
  });
});
