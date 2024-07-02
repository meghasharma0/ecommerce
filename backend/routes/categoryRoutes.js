const express = require('express');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const createCategory = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin, createCategory);

module.exports = router;