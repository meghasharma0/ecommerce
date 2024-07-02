const express = require("express");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  listCategory,
} = require("../controllers/categoryController");

const router = express.Router(); 

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory);
// router.route("/:categoryId").delete(authenticate, authorizeAdmin, deleteCategory);
router.route('/categories').get(listCategory);

module.exports = router;
