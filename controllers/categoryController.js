const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, itemCount} = req.body;
    const image = req.file ? req.file.path : null;

    const newCategory = new Category({ name, itemCount, image });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add category" });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { name, itemCount } = req.body;
    const image = req.file ? req.file.path : null;

    const updatedData = { name, itemCount };
    if (image) updatedData.image = image;

    await Category.findByIdAndUpdate(req.params.id, updatedData);
    res.json({ message: "Category updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
