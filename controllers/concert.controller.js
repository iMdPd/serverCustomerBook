const Concert = require("../models/concert.model.js");
const sanitize = require("mongo-sanitize");

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find().populate("workshops");

    res.json(concerts);
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.getById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: "Not found" });
    else res.json(conc);
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.getByPerfomerName = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const searchingParam = req.params.performer.toLowerCase();

    const filteredConcerts = concerts.filter((concert) => {
      if (
        concert.performer
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchingParam.toLowerCase())
      ) {
        return concert;
      }
    });

    if (!filteredConcerts.length)
      res.status(404).json({ message: "Not found" });
    else res.json(filteredConcerts);
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find();
    const searchingParam = req.params.genre.toLowerCase();

    const filteredConcerts = concerts.filter((concert) => {
      if (
        concert.genre
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchingParam.toLowerCase())
      ) {
        return concert;
      }
    });

    if (!filteredConcerts.length)
      res.status(404).json({ message: "Not found" });
    else res.json(filteredConcerts);
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.getByPriceRange = async (req, res) => {
  const priceMin = Number(req.params.price_min);
  const priceMax = Number(req.params.price_max);

  if (isNaN(priceMin || priceMax) || priceMin < 0 || priceMax < 0) {
    res.status(404).json({
      message: "Ooops, something went wrong.",
    });
  } else {
    try {
      const concerts = await Concert.find({
        $and: [{ price: { $gt: priceMin } }, { price: { $lt: priceMax } }],
      });

      if (!concerts.length) res.status(404).json({ message: "Not found" });
      else res.json(concerts);
    } catch (err) {
      if (process.env.debug === true) res.status(500).json({ message: err });
      else res.status(500).json({ message: "Couldn't connect to db..." });
    }
  }
};

exports.getByDay = async (req, res) => {
  const day = Number(req.params.day);

  if (isNaN(day) || day < 0) {
    res.status(404).json({
      message: "Ooops, something went wrong.",
    });
  } else {
    try {
      const concerts = await Concert.find({
        day: day,
      });

      if (!concerts.length) res.status(404).json({ message: "Not found" });
      else res.json(concerts);
    } catch (err) {
      if (process.env.debug === true) res.status(500).json({ message: err });
      else res.status(500).json({ message: "Couldn't connect to db..." });
    }
  }
};

exports.post = async (req, res) => {
  const { performer, genre, price, day, image } = sanitize(req.body);

  if (performer && genre && price && day && image)
    try {
      const newConcert = new Concert({
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image,
      });
      await newConcert.save();

      res.json({
        message: "You've successfully added new concert",
        addedConcert: newConcert,
      });
    } catch (err) {
      if (process.env.debug === true) res.status(500).json({ message: err });
      else res.status(500).json({ message: "Couldn't connect to db..." });
    }
  else
    res.status(409).json({
      message:
        "Ooops, something went wrong. Please don't forget to fill all input fields.",
    });
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (performer || genre || price || day || image) {
    try {
      const conc = await Concert.findById(req.params.id);
      if (conc) {
        await Concert.updateOne(
          { _id: req.params.id },
          {
            $set: {
              performer: performer ? performer : conc.performer,
              genre: genre ? genre : conc.genre,
              price: price ? price : conc.price,
              day: day ? day : conc.day,
              image: image ? image : conc.image,
            },
          }
        );
        res.json({
          message: `You've successfully modified concert id: ${req.params.id}`,
          beforeModification: conc,
          modifications: {
            performer: performer,
            genre: genre,
            price: price,
            day: day,
            image: image,
          },
        });
      } else res.status(404).json({ message: "Not found..." });
    } catch (err) {
      if (process.env.debug === true) res.status(500).json({ message: err });
      else res.status(500).json({ message: "Couldn't connect to db..." });
    }
  } else {
    res.status(404).json({
      message:
        "Ooops, something went wrong. Please don't forget to fill input fields.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({
        message: `You've successfully deleted concert id: ${req.params.id}`,
        deletedConcert: conc,
      });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};
