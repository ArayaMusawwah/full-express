//config express
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel.js");
const Garment = require("../models/garmentModel.js");

//The Products view
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let queryProducts = {};
    if (category) queryProducts = { category: category };
    if (search?.length > 0) {
      queryProducts = { name: { $regex: search, $options: "i" } };
    }

    const products = await Product.find({});
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];

    res.render("./products-views/TheProducts", {
      title: "Products",
      products: await Product.find(queryProducts || {}),
      categories,
      category,
    });
  } catch (error) {
    res.send(error.message);
  }
});

//Create View
router.get("/create", async (_, res) => {
  try {
    res.render("./products-views/ProductsCreate", {
      title: "Create Product",
      sizes: Product.schema.path("size").caster.enumValues,
      categories: Product.schema.path("category").enumValues,
      garments: await Garment.find(),
    });
  } catch (error) {
    res.send({ message: error.message });
  }
});

//Edit View
router.get("/edit/:id", async (req, res) => {
  try {
    res.render("./products-views/ProductsEdit", {
      title: "Edit Product",
      product: await Product.findById(req.params.id),
      sizes: Product.schema.path("size").caster.enumValues,
      categories: Product.schema.path("category").enumValues,
      garments: await Garment.find({}),
    });
  } catch (error) {
    res.status(404).send("data not found");
  }
});

//Details View
router.get("/:id", async (req, res) => {
  try {
    res.render("./products-views/ProductDetails", {
      title: "Product Details",
      product: await Product.findOne({ _id: req.params.id }).populate(
        "garment",
      ),
    });
  } catch (error) {
    res.status(404).send("data not found");
  }
});

//handle create product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    product.size = [...new Set(product.size)];

    await product.save();
    const garment = await Garment.findById(req.body.garment);

    if (garment) {
      garment.products = garment.products || [];
      garment.products.push(product._id);
      await garment.save();
    } else {
      console.error("Garment not found with id", req.body.garment);
    }

    res.status(201).redirect("/products");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// handle update product
router.put("/edit/:product_id/:garment_id", async (req, res) => {
  try {
    const { product_id, garment_id } = req.params;
    const product = req.body;
    product.size = [...new Set(product.size)];

    const oldGarment = await Garment.findById(garment_id);
    if (!oldGarment) {
      throw new Error("Garment not found");
    } else {
      oldGarment.products = oldGarment.products.filter(
        (p) => p.toString() !== product_id,
      );
      await oldGarment.save();
    }

    await Garment.findByIdAndUpdate(
      product.garment,
      { $push: { products: product_id } },
      { new: true },
    );
    await Product.findByIdAndUpdate(product_id, product, { new: true });

    res.status(302).redirect(`/products`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//handle delete product
router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const garment = await Garment.findById(product.garment);
    garment.products = garment.products.filter(
      (p) => p.toString() !== req.params.id,
    );
    await garment.save();
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
