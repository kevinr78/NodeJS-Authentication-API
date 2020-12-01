const jwt = require("jsonwebtoken");

/* Verifying jwt token */
module.exports = (req, res, next) => {
  const token = req.header("authtoken");

  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.loggedInUser = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
