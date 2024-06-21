const asyncHandler = require("../middlewares/asyncHandler");

const createUser = asyncHandler(async (req, res) => {
    res.send("hello");
})

module.exports = createUser;