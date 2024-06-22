const express = require("express");
const { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile } = require("../controllers/userController");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post('/logout', logoutCurrentUser);
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);

module.exports = router;
