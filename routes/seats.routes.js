const express = require("express");
const router = express.Router();
const { seats } = require("./../db/db");

router.route("/seats").get((req, res) => {
  res.json(seats);
});

router.route("/seats/:id").get((req, res) => {
  const { id } = req.params;
  const getElementById = seats.find((obj) => obj.id === +id);

  if (getElementById) {
    res.json(getElementById);
  } else {
    res.send("Given id doesn't exist.");
  }
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = Math.max(...seats.map((obj) => obj.id)) + 1;

  if (day && seat && client && email) {
    seats.push({ id, day, seat, client, email });
    res.send("Data has been successfully added!");
    console.log(seats);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

router.route("/seats/:id").put((req, res) => {
  const { id } = req.params;
  const { day, seat, client, email } = req.body;
  const getElementById = seats.find((obj) => obj.id === +id);

  if (getElementById && day && seat && client && email) {
    getElementById.day = day;
    getElementById.seat = seat;
    getElementById.client = client;
    getElementById.email = email;
    res.send("Data has been successfully changed!");
    console.log(seats);
  } else {
    res.send(
      "Ooops, something went wrong. Please don't forget to fill all input fields."
    );
  }
});

router.route("/seats/:id").delete((req, res) => {
  const { id } = req.params;
  const removedElement = seats.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    seats.splice(removedElement, 1);
    res.send("Data has been successfully removed!");
    console.log(seats);
  } else {
    res.send("Given id doesn't exist.");
  }
});

module.exports = router;
