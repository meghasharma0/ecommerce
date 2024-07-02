const asyncHandler = require("../middlewares/asyncHandler");
const Category = require("../models/categoryModel");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({error: 'Already exists'});
    }

    const newCategory = await new Category({ name }).save();
    res.json(newCategory);

  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = createCategory;
