const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { refreshauth } = require("../../middleware/Authenticate");

// @route   GET api/login
// @desc    Login User
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is Required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req).errors;
    if (errors.length > 0) {
      return res.status(400).json({
        errors,
      });
    }

    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "In Correct Username or Password" }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "In Correct Username or Password" }],
        });
      }
      let payload = {
        user: { id: user.id },
      };

      const token = jwt.sign(payload, config.get("jwtsecret"), {
        expiresIn: 36000,
      });
      const refreshtoken = jwt.sign(
        payload,
        config.get("jwtsecretrefreshtoken")
      );
      res.status(200).send({
        token,
        refreshtoken,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send([{ msg: "Server Error" }]);
    }
  }
);

router.get("/getaccesstoken", refreshauth, async (req, res) => {
  try {
    let payload = {
      user: { id: req.user.id },
    };

    const token = await jwt.sign(payload, config.get("jwtsecret"));
    const user = await User.findById({ _id: req.user.id }).select("-password");

    res.status(200).send({
      token,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
