const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/createToken");

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password){
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
        // For user is being logged in
        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    } catch (error) {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

module.exports = createUser;