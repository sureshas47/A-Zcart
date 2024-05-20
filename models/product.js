const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    isInStock: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Product image url is required"],
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
