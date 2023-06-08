const Seat = require("../models/seat.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: "Not found" });
    else res.json(seat);
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.post = async (req, res) => {
  const { day, seat, client, email } = sanitize(req.body);
  const seats = await Seat.findOne({ $and: [{ day: day }, { seat: seat }] });

  if (!seats) {
    if (day && seat && client && email)
      try {
        const newSeat = new Seat({
          day: day,
          seat: seat,
          client: client,
          email: email,
        });
        await newSeat.save();
        req.io.emit("seatsUpdated", await Seat.find());

        res.json({
          message: "You've successfully added new seat",
        });
      } catch (err) {
        if (process.env.debug === true) res.status(500).json({ message: err });
        else console.log("Couldn't connect to db...");
      }
    else
      res.status(409).json({
        message:
          "Ooops, something went wrong. Please don't forget to fill all input fields.",
      });
  } else res.status(409).json({ message: "The slot is already taken..." });
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  if (day || seat || client || email) {
    try {
      const se = await Seat.findById(req.params.id);
      if (se) {
        await Seat.updateOne(
          { _id: req.params.id },
          {
            $set: {
              day: day ? day : se.day,
              seat: seat ? seat : se.seat,
              client: client ? client : se.client,
              email: email ? email : se.email,
            },
          }
        );
        res.json({
          message: `You've successfully modified seat id: ${req.params.id}`,
          beforeModification: se,
          modifications: {
            day: day,
            seat: seat,
            client: client,
            email: email,
          },
        });
      } else res.status(404).json({ message: "Not found..." });
    } catch (err) {
      if (process.env.debug === true) res.status(500).json({ message: err });
      else console.log("Couldn't connect to db...");
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
    const se = await Seat.findById(req.params.id);
    if (se) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({
        message: `You've successfully deleted seat id: ${req.params.id}`,
        deletedSeat: se,
      });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else console.log("Couldn't connect to db...");
  }
};
