const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name harus diisi"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password harus diisi"],
  },
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  const match = await bcrypt.compare(password, user.password);
  return match ? user : false;
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
