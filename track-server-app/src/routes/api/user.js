const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const requireAuth = require("../../middlewares/requireAuth");

// @route GET test
// @desc TEST
// @access Private
router.get("/", requireAuth, (req, res) => {
  res.send("Hi");
});

// @route POST api/auth
// @desc Register user
// @access Public

router.post(
  "/signup",
  [
    body("email", "Per favore inserisci una mail").isEmail(),
    body(
      "password",
      "Per favore inserisci una password con 8 o più caratteri"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, "MY_SECRET_KEY");
      res.send({ token, email });
      res.send("You made a post request");
    } catch (error) {
      console.error(error.message);
      return res.status(422).send(error.message);
    }
  }
);

// @route POST api/auth
// @desc signin user
// @access Public

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Devi inserire mail e password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Password o email non validi" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    // response.setHeader("Content-Type", "application/json");
    res.send({ token, email });
  } catch (error) {
    return res.status(422).send({ error: "Password o email non validi" });
  }
});

module.exports = router;
