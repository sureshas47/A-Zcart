const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // Reference to the Category model
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories", // ref should be the name of the collections
    },
  },
  {
    timestamps: true,
  }
);
const ProductModel = mongoose.model("Products", productSchema);
module.exports = { ProductModel };
