const mongoose = require("mongoose");

const garmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name garment harus diisi"],
  },
  location: {
    type: String,
    required: [true, "Location harus diisi"],
  },
  contact: {
    type: String,
    required: [true, "Contact harus diisi"],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Garment = mongoose.model("Garment", garmentSchema);

module.exports = Garment;
