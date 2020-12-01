const mongoose = require("mongoose");

/* Creating a mongoose schema */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
