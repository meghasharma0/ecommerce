const asyncHandler = require("../middlewares/asyncHandler");
const Product = require("../models/productModel");

// CREATE PRODUCT
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// UPDATE PRODUCT
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await updatedProduct.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

// REMOVE PRODUCT
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.json(deleteProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL PRODUCTS
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET PRODUCT BY ID 
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    
    const product = await Product.findById(req.params.id);

    if (product){
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found")
    }

  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
});

module.exports = {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById
};
