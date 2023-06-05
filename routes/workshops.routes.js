const express = require("express");
const router = express.Router();
const WorkshopController = require("../controllers/workshop.conroller");

router.route("/workshops").get(WorkshopController.getAll);

router.route("/workshops/:id").get(WorkshopController.getById);

router.route("/workshops").post(WorkshopController.post);

router.route("/workshops/:id").put(WorkshopController.put);

router.route("/workshops/:id").delete(WorkshopController.delete);

module.exports = router;
