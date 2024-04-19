const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    req.flash("flashMessage", "Please login first to use the feature!");
    res.status(401).redirect("/login");
  }
  next();
};

module.exports = { requireLogin };
