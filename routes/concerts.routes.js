const express = require("express");
const router = express.Router();
const { concerts } = require("./../db/db");

router.route("/concerts").get((req, res) => {
  res.json(concerts);
});

router.route("/concerts/:id").get((req, res) => {
  const { id } = req.params;
  const getElementById = concerts.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.send("Given id doesn't exist.");
  }
});

router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Math.max(...concerts.map((obj) => obj.id)) + 1;

  if (performer && genre && price && day && image) {
    concerts.push({ id, performer, genre, price, day, image });
    res.send("Data has been successfully added!");
    console.log(concerts);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

router.route("/concerts/:id").put((req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;
  const getElementById = concerts.find((obj) => obj.id === +id);

  if (getElementById && performer && genre && price && day && image) {
    getElementById.performer = performer;
    getElementById.genre = genre;
    getElementById.price = price;
    getElementById.day = day;
    getElementById.image = image;
    res.send("Data has been successfully changed!");
    console.log(concerts);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const { id } = req.params;
  const removedElement = concerts.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    concerts.splice(removedElement, 1);
    res.send("Data has been successfully removed!");
    console.log(concerts);
  } else {
    res.send("Given id doesn't exist.");
  }
});

module.exports = router;
