const express = require("express");
const router = express.Router();
const Garment = require("../models/garmentModel");

//Index view
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let queryGarment = {};
    if (search?.length > 0) {
      queryGarment = { name: { $regex: search, $options: "i" } };
    }

    res.render("./garments-views/TheGarments", {
      title: "Garments",
      garments: await Garment.find(queryGarment || {}),
    });
  } catch (error) {
    res.send({ message: error.message });
  }
});

//Create View
router.get("/create", (_, res) => {
  try {
    res.render("./garments-views/GarmentsCreate", {
      title: "Create Garment",
    });
  } catch (error) {
    res.send({ message: error.message });
  }
});

//Edit View
router.get("/edit/:id", async (req, res) => {
  try {
    res.render("./garments-views/GarmentsEdit", {
      title: "Edit Garment",
      garment: await Garment.findById(req.params.id),
    });
  } catch (error) {
    res.send({ message: error.message });
  }
});

//handle create product
router.post("/", async (req, res) => {
  try {
    const newGarment = new Garment(req.body);
    await newGarment.save();
    res.redirect("/garments");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating garment");
  }
});

// handle Update product
router.put("/edit/:id", async (req, res) => {
  try {
    await Garment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/garments`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the garment");
  }
});

// Handle delete garment
router.delete("/delete/:id", async (req, res) => {
  try {
    await Garment.findByIdAndDelete(req.params.id);
    res.redirect("/garments");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
