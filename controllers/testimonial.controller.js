const Testimonial = require("../models/testimonial.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({ message: "Not found" });
    else res.json(tes);
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};

exports.post = async (req, res) => {
  const { author, text } = req.body;

  if (author && text)
    try {
      const newTestimonial = new Testimonial({
        author: author,
        text: text,
      });
      await newTestimonial.save();

      res.json({
        message: "You've successfully added new testimonial",
        addedTestimonial: newTestimonial,
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
  const { author, text } = req.body;

  if (author || text) {
    try {
      const tes = await Testimonial.findById(req.params.id);
      if (tes) {
        await Testimonial.updateOne(
          { _id: req.params.id },
          {
            $set: {
              author: author ? author : tes.author,
              text: text ? text : tes.text,
            },
          }
        );
        res.json({
          message: `You've successfully modified testimonial id: ${req.params.id}`,
          beforeModification: tes,
          modifications: {
            author: author,
            text: text,
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
    const tes = await Testimonial.findById(req.params.id);
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({
        message: `You've successfully deleted testimonial id: ${req.params.id}`,
        deletedTestimonial: tes,
      });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    if (process.env.debug === true) res.status(500).json({ message: err });
    else res.status(500).json({ message: "Couldn't connect to db..." });
  }
};
