const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");

const auth = (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res.status(401).json({ msg: "No token, Authorization Denied " });

  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token Not Valid",
    });
  }
};
const refreshauth = async (req, res, next) => {
  const refreshtoken = req.headers.refreshtoken;
  if (!refreshtoken) {
    return res.status(401).json({ msg: "No token, Authorization Denied " });
  }

  try {
    const decoded = jwt.verify(
      refreshtoken,
      config.get("jwtsecretrefreshtoken")
    );

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token Not Valid",
    });
  }
};

module.exports = { auth, refreshauth };
