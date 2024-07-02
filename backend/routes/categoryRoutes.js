const express = require('express');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const createCategory = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(createCategory);

module.exports = router;