const Concert = require("../models/concert.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: "Not found" });
    else res.json(conc);
  } catch (err) {
    res.status(500).json({ message: err });
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
    res.status(500).json({ message: err });
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
    res.status(500).json({ message: err });
  }
};

exports.getByPriceRange = async (req, res) => {
  const priceMin = Number(req.params.price_min);
  const priceMax = Number(req.params.price_max);

  if (isNaN(priceMin || priceMax) || priceMin < 0 || priceMax < 0) {
    res.status(404).json({
      message:
        "Ooops, something went wrong. Please don't forget to fill all input fields.",
    });
  } else {
    try {
      const concerts = await Concert.find({
        $and: [{ price: { $gt: priceMin } }, { price: { $lt: priceMax } }],
      });

      if (!concerts) res.status(404).json({ message: "Not found" });
      else res.json(concerts);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
};

exports.post = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

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
      res.status(500).json({ message: err });
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
      res.status(500).json({ message: err });
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
    res.status(500).json({ message: err });
  }
};
