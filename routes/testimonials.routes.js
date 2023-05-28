const express = require("express");
const router = express.Router();
const TestiomnialController = require("../controllers/testimonial.controller");

router.route("/testimonials").get(TestiomnialController.getAll);

router.route("/testimonials/:id").get(TestiomnialController.getById);

router.route("/testimonials").post(TestiomnialController.post);

router.route("/testimonials/:id").put(TestiomnialController.put);

router.route("/testimonials/:id").delete(TestiomnialController.delete);

module.exports = router;
