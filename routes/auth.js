/* Initiaizations */
const router = require("express").Router();
const Users = require("../models/Users");
const { registerValidation, loginValidation } = require("../models/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* Register Route */
router.post("/register", async (req, res) => {
  /* Validating the data */
  const { error } = registerValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /* Check if email exists */
  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  /* Hash password */
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  /* Creating  a new user */
  const NewUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  /* Saving the user */
  try {
    const savedUser = await NewUser.save();
    console.log("User saved");
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

/* Login Route */
router.post("/login", async (req, res) => {
  /* Validating data */
  const { error } = loginValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /* Verifying Data */
  const loggedInUser = await Users.findOne({ email: req.body.email });
  if (!loggedInUser)
    return res.status(400).send("Email/Password could not be found");

  /* Comapring password */
  const checkPassword = await bcrypt.compare(
    req.body.password,
    loggedInUser.password
  );
  if (!checkPassword) return res.send("Invalid Email/password ");

  /* jwt token */
  const token = jwt.sign({ _id: loggedInUser._id }, process.env.TOKEN_SECRET);

  res.header("authtoken", token).send("Logged In !!!");
});

module.exports = router;
