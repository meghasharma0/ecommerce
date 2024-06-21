const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password){
        throw new Error("Please fill all the inputs");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(400).send("User already exists");

    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
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
})

module.exports = createUser;