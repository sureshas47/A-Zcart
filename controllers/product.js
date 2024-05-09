const slugify = require("slugify");
const { ProductModel } = require("../models/product");
const { capitalize } = require("../helper/helper");

// get products
const getProducts = async (req, res) => {
  const limitVal = +req.query.limit; // '+' sign parsed the incoming query into integer
  const page = +req.query.page;
  const skipVal = page === 1 ? 0 : page * limitVal - limitVal + 1; // skip
  // 1=1-3, 2=4-6

  try {
    const products = await ProductModel.find()
      .limit(limitVal) // gives according to limit ex, localhost:4000/api/v1/products?limit=2
      .skip(skipVal)
      .populate("category"); // using populate function to retrive all information from category object of product model
    const totalProducts = await ProductModel.find().count();
    res.send({
      status: true,
      code: 200,
      payload: {
        count: totalProducts,
        requestedCount: limitVal,
        data: products,
      },
    });
  } catch (error) {
    res.send("error while getting products " + error);
  }
};

// add product
const addProducts = async (req, res) => {
  try {
    const isProduct = await ProductModel.findOne({
      title: req.body.title,
    });

    if (isProduct) {
      res.send({ message: "Duplicate Product Found" });
    } else {
      const parsedPrice = parseFloat(req.body.price);
      const product = new ProductModel({
        title: capitalize(req.body.title),
        slug: slugify(req.body.title).toLowerCase(),
        price: parsedPrice,
        description: capitalize(req.body.description),
        imageUrl: req.body.imageUrl,
        category: req.body.category, // receive id from client
      });

      await product.save(); // save to database

      const response = {
        statusCode: 200,
        msg: "product created successfully",
        headers: { "content-type": "application/json" },
        body: {
          data: product,
        },
      };
      res.send(response);
      console.log("PRODUCT ADDED");
    }
  } catch (error) {
    console.log(error);
    res.send("Error while adding product");
  }
};
// get single product
const getProduct = async (req, res) => {
  try {
    const product_id = req.params.productId;
    const product = await ProductModel.findById(product_id);
    res.send({ status: 200, message: "ok", product });
  } catch (error) {
    res.send({ status: 300, message: "error occured", error });
  }
};

// update products by id
const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.productId;
    const updateProductDetails = await ProductModel.findByIdAndUpdate(
      { _id: product_id },
      {
        title: req.body.title,
        slug: slugify(req.body.title).toLowerCase(),
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
      },
      {
        new: true,
      }
    );
    updateProductDetails.save();
    const product = await ProductModel.findById(product_id);
    res.send(product);
    console.log("UPDATED");
  } catch (error) {
    res.send("error while updating products " + error);
  }
};

// deleting product
const deleteProductById = async (req, res) => {
  try {
    const product_id = req.params.productId;
    const deleteProduct = await ProductModel.findByIdAndDelete(product_id);
    res.send(deleteProduct);
    console.log("DELETED");
  } catch (error) {
    res.send("error while deleting product " + error);
  }
};

module.exports = {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProductById,
};
