const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/createToken");

// CREATE USER
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) res.status(400).send("User already exists");

  // For password protection
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    // For user is being logged in after signing up
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new Error("Please enter both email and password");

  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new Error("User has not registered");

  const isPassValid = await bcrypt.compare(password, existingUser.password);
  if (!isPassValid) throw new Error("Email or password is not valid");
  
  generateToken(res, existingUser._id);
  res.status(201).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
  return;
});

// LOGOUT USER
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true, 
    expires: new Date(0)
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// GET ALL THE USERS
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

// GET USER CURRENT PROFILE
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById( req.User._id );

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email
    })
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// UPDATING THE CURRENT USER PROFILE
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.User._id);

  if (user){
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword; 
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin
    })
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile };
