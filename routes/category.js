const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  
} = require("../controllers/categoryController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });




router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;