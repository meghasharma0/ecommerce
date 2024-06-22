const express = require("express");
const { createUser, loginUser, logoutCurrentUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", createUser);
router.post("/auth", loginUser);
router.post('/logout', logoutCurrentUser);

module.exports = router;
