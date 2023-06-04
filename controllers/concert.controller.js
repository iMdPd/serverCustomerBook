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
    const inputValue = req.params.performer.toLowerCase();

    const matchingConcerts = concerts.filter((concert) => {
      if (
        concert.performer
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(inputValue.toLowerCase())
      ) {
        return concert;
      }
    });

    if (!matchingConcerts) res.status(404).json({ message: "Not found" });
    else res.json(matchingConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
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
