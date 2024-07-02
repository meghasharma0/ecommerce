const asyncHandler = require("../middlewares/asyncHandler");
const Category = require("../models/categoryModel");

// CREATE CATEGORY
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const newCategory = await new Category({ name }).save();
    res.json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// UPDATE CATEGORY
const updateCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const {categoryId} = req.params;

    const category = await Category.findOne({_id: categoryId});

    if (!category) {
        return res.status(404).json({error: 'Category not found!'});
    }

    category.name = name || category.name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
});

module.exports = { createCategory, updateCategory };
