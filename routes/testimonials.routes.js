const express = require("express");
const router = express.Router();
const { testimonials } = require("./../db/db");

router.route("/testimonials").get((req, res) => {
  res.json(testimonials);
});

router.route("/testimonials/random").get((req, res) => {
  const numbersOfElements = testimonials.length;
  const randomElement = Math.floor(Math.random() * numbersOfElements);

  res.json(testimonials[randomElement]);
});

router.route("/testimonials/:id").get((req, res) => {
  const { id } = req.params;
  const getElementById = testimonials.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.status(404).json({ message: "Given id doesn't exist." });
  }
});

router.route("/testimonials").post((req, res) => {
  const { name, text } = req.body;
  const id = Math.max(...testimonials.map((obj) => obj.id)) + 1;

  if (name && text) {
    testimonials.push({ id, name, text });
    res.status(200).json({
      message: "Data has been successfully added!",
    });

    console.log(testimonials);
  } else {
    res.status(404).json({
      message:
        "Ooops, something went wrong. Please don't forget to fill all input fields.",
    });
  }
});

router.route("/testimonials/:id").put((req, res) => {
  const { id } = req.params;
  const { name, text } = req.body;
  const getElementById = testimonials.find((obj) => obj.id === +id);

  if (getElementById && name && text) {
    getElementById.name = name;
    getElementById.text = text;

    res.status(200).json({
      message: "Data has been successfully changed!",
    });

    console.log(testimonials);
  } else {
    res.status(404).json({
      message:
        "Ooops, something went wrong. Please don't forget to fill all input fields.",
    });
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const { id } = req.params;
  const removedElement = testimonials.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    testimonials.splice(removedElement, 1);

    res.status(200).json({
      message: "Data has been successfully removed!",
    });

    console.log(testimonials);
  } else {
    res.status(404).json({ message: "Given id doesn't exist." });
  }
});

module.exports = router;
