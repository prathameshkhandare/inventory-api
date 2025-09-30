const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    stock_quantity: { type: Number, default: 0, min: 0 },
    low_stock_threshold: { type: Number, default: 5, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
