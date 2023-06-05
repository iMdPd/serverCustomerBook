const Workshop = require("../models/workshop.model.js");

exports.getAll = async (req, res) => {
  try {
    res.json(await Workshop.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const wor = await Workshop.findById(req.params.id);
    if (!wor) res.status(404).json({ message: "Not found" });
    else res.json(wor);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  const { name, concertId } = req.body;

  if (name && concertId)
    try {
      const newWorkshop = new Workshop({
        name: name,
        concertId: concertId,
      });
      await newWorkshop.save();

      res.json({
        message: "You've successfully added new workshop",
        addedWorkshop: newWorkshop,
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
  const { name, concertId } = req.body;

  if (name || concertId) {
    try {
      const wor = await Workshop.findById(req.params.id);
      if (wor) {
        await Workshop.updateOne(
          { _id: req.params.id },
          {
            $set: {
              name: name ? name : wor.name,
              concertId: concertId ? concertId : wor.concertId,
            },
          }
        );
        res.json({
          message: `You've successfully modified workshop id: ${req.params.id}`,
          beforeModification: wor,
          modifications: {
            name: name,
            concertId: concertId,
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
    const wor = await Workshop.findById(req.params.id);
    if (wor) {
      await Workshop.deleteOne({ _id: req.params.id });
      res.json({
        message: `You've successfully deleted workshop id: ${req.params.id}`,
        deletedWorkshop: wor,
      });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
