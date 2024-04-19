//config express
const express = require("express");
const router = express.Router();

//buat apaan tau
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//Login-Register view
router.get("/login", (_, res) => {
  res.render("login-views/loginpage", {
    title: "Login / Register",
  });
});

// handle register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash("flashMessage", "Username already exists");
      res.status(400).redirect("/login");
      return;
    }
    const user = new User({
      username,
      email,
      password,
    });

    await user.save();
    req.session.user_id = user._id;
    req.flash("flashMessage", "You have successfully registered!");
    res.status(201).redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// handle login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    if (!user) {
      req.flash("flashMessage", "incorrect password/username");
      res.status(401).redirect("/login");
      return;
    }
    req.session.user_id = user._id;
    req.flash("flashMessage", "You have successfully logged in!");
    res.status(301).redirect("/");
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).send("Internal server error");
  }
});

//handle logout
router.post("/logout", (req, res) => {
  req.session.user_id = null;
  req.flash("flashMessage", "Auf Wiedersehen!");
  res.status(302).redirect("/");
});

module.exports = router;
