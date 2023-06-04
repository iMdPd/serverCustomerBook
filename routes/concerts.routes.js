const express = require("express");
const router = express.Router();
const ConcertController = require("../controllers/concert.controller");

router.route("/concerts").get(ConcertController.getAll);

router.route("/concerts/:id").get(ConcertController.getById);

router
  .route("/concerts/performer/:performer")
  .get(ConcertController.getByPerfomerName);

router.route("/concerts/genre/:genre").get(ConcertController.getByGenre);

router.route("/concerts").post(ConcertController.post);

router.route("/concerts/:id").put(ConcertController.put);

router.route("/concerts/:id").delete(ConcertController.delete);

module.exports = router;
