const router = require("express").Router();
const verify = require("./verifyToken");
/*  private route example */
router.get("/private", verify, (req, res) => {
  res.json({
    posts: {
      title: "Computer",
      content: "IT is a great invention",
    },
  });
});
module.exports = router;
