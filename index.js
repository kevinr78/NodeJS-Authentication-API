/* Initializations */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

/* Importing modules */
const authRoutes = require("./routes/auth");
const privRoutes = require("./routes/privateRoute");

/* Database Connection */
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected");
  }
);

/* Middleware */
app.use(express.json());

/*  Router Middleware */
app.use("/home", authRoutes);
app.use("/home", privRoutes);

app.listen(3000, () => {
  console.log("Server has started");
});
