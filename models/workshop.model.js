const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  concertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Concert",
    required: true,
  },
});

module.exports = mongoose.model("Workshop", workshopSchema);
