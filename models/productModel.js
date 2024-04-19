const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama perlu dimasukkan"],
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Harga harus diisi"],
  },
  stock: {
    type: Number,
    min: 1,
    default: 1,
  },
  size: [
    {
      type: String,
      enum: [
        "XXS",
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "XXXL",
        "XXXXL",
        "All Size",
      ],
    },
  ],
  description: {
    type: String,
    max: 200,
  },
  category: {
    type: String,
    enum: [
      "Upper Clothing",
      "Shoes",
      "Accessories",
      "Lower Clothing",
      "Tops",
      "Hats",
    ],
  },
  garment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garment",
    required: [true, "Pilih salah satu Garment atau buat baru Garment"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
