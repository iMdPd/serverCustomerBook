const express = require("express");
const router = express.Router();
const ConcertController = require("../controllers/concert.controller");

router.route("/concerts").get(ConcertController.getAll);

router.route("/concerts/:id").get(ConcertController.getById);

router.route("/concerts").post(ConcertController.post);

router.route("/concerts/:id").put(ConcertController.put);

router.route("/concerts/:id").delete((req, res) => {
  const { id } = req.params;
  const removedElement = concerts.findIndex((obj) => obj.id === +id);

  if (removedElement >= 0) {
    concerts.splice(removedElement, 1);

    res.status(200).json({
      message: "Data has been successfully removed!",
    });

    console.log(concerts);
  } else {
    res.status(404).json({ message: "Given id doesn't exist." });
  }
});

module.exports = router;
