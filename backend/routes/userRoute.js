const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.post("/auth", loginUser);

module.exports = router;
