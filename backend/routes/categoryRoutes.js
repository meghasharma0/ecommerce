const express = require("express");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

module.exports = router;