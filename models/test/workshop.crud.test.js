const Workshop = require("../workshop.model.js");
const expect = require("chai").expect;
const mongoose = require("mongoose");

const createTestData = async () => {
  const testWorOne = new Workshop({
    name: "Rock Music Style",
    concertId: "6473318d595f41217eacfe0a",
  });
  await testWorOne.save();

  const testWorTwo = new Workshop({
    name: "Lorem ipsum dolor sit amet",
    concertId: "6473318d595f41217eacfe0c",
  });
  await testWorTwo.save();
};

describe("Workshop CRUD", () => {
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
      await Workshop.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const workshops = await Workshop.find();

      expect(workshops.length).to.be.equal(2);
    });

    it("should return a proper document by various params with 'findOne' method", async () => {
      const workshop = await Workshop.findOne({
        name: "Rock Music Style",
        concertId: "6473318d595f41217eacfe0a",
      });

      expect(workshop).not.to.be.null;
    });
  });

  describe("Creating data", () => {
    it("should insert new document with 'insertOne' method", async () => {
      const workshop = new Workshop({
        name: "Pellentesque eget est diam. Donec.",
        concertId: "6473318d595f41217eacfe0b",
      });
      await workshop.save();

      expect(workshop.isNew).to.be.false;
    });

    after(async () => {
      await Workshop.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Workshop.deleteMany();
    });

    it("should properly update document with 'updateOne' method", async () => {
      await Workshop.updateOne(
        { name: "Lorem ipsum dolor sit amet" },
        { $set: { name: "Updated Name!" } }
      );

      const updatedWorkshop = await Workshop.findOne({
        name: "Updated Name!",
      });
      expect(updatedWorkshop).not.to.be.null;
    });

    it("should properly update docment with 'save' method", async () => {
      const workshop = await Workshop.findOne();

      workshop.name = "Updated Name!";
      await workshop.save();

      const updatedWorkshop = await Workshop.findOne({
        name: "Updated Name!",
      });

      expect(updatedWorkshop).not.to.be.null;
    });

    it("should properly update multiple docments with 'updateMany' method", async () => {
      await Workshop.updateMany(
        {},
        { $set: { name: "This name was updated" } }
      );

      const updatedWorkshop = await Workshop.find({
        name: "This name was updated",
      });

      expect(updatedWorkshop.length).to.be.equal(2);
    });
  });

  describe("Removing data", () => {
    beforeEach(() => createTestData());

    afterEach(async () => {
      await Workshop.deleteMany();
    });

    it("should properly remove document with 'deleteOne' method", async () => {
      await Workshop.deleteOne({
        name: "Lorem ipsum dolor sit amet",
      });

      const removedWorkshop = await Workshop.findOne({
        name: "Lorem ipsum dolor sit amet",
      });

      expect(removedWorkshop).to.be.null;
    });

    it("should properly remove document with 'remove' method", async () => {
      const workshop = await Workshop.findOne({
        name: "Rock Music Style",
      });

      workshop.remove();

      const removedWorkshop = await Workshop.findOne({
        name: "Rock Music Style",
      });

      expect(removedWorkshop).to.be.null;
    });

    it("should properly remove multiple documents with 'deleteMany' method", async () => {
      await Workshop.deleteMany();

      const workshop = await Workshop.find();

      expect(workshop.length).to.be.equal(0);
    });
  });
});
