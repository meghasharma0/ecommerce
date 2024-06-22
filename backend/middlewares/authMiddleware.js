const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// AUTHENTICATE USER
const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //   Read JWT from 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.User = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// AUTHORIZE ADMIN
const authorizeAdmin = (req, res, next) => {
  if (req.User && req.User.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

module.exports = { authenticate, authorizeAdmin };
