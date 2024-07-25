const express = require("express");
const formidable = require("express-formidable");
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const checkId = require("../middlewares/checkId");

// controllers
const { addProduct, updateProductDetails } = require("../controllers/productController");

const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin, formidable(), addProduct);
router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProductDetails);

module.exports = router