const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    slug: {
      type: String,
      required: true,
    },
    // Reference to the Product model
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Products", // ref should be the name of the collections
    // },
  },
  {
    timestamps: true,
  }
);
const CategoryModel = mongoose.model("Categories", categorySchema);
module.exports = { CategoryModel };
