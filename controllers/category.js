const slugify = require("slugify");
const { CategoryModel } = require("../models/category");
const { capitalize } = require("../helper/helper");
// const WebSocket = require("ws");

const createCategory = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      const response = {
        statusCode: 401,
        msg: "Unauthorized accessssssss",
      };
      res.send(response);
    } else {
      const myCategory = await CategoryModel.findOne({
        title: req.body.title,
      });
      if (myCategory) {
        // res.status(402).send("category already exists");
        const response = {
          statusCode: 402,
          msg: "category already exists",
        };
        res.send(response);
      } else {
        const category = new CategoryModel({
          title: capitalize(req.body.title),
          slug: slugify(req.body.title).toLowerCase(),
        });
        await category.save();

        const response = {
          statusCode: 200,
          msg: "category created successfully",
          headers: { "content-type": "application/json" },
          body: {
            data: category,
          },
        };
        //   resopnse
        res.send(response);
        console.log("CATEGORY CREATED");
      }
    }
  } catch (error) {
    res.send(error.json);
    // res.json(error);
    // console.log(error);
    // res.send("Error while creating category" + error);
  }
};

const getCategories = async (req, res) => {
  try {
    // const categories = await CategoryModel.find().populate("product");
    const categories = await CategoryModel.find();
    const totalCategories = await CategoryModel.find().count();
    res.send({
      status: true,
      code: 200,
      message: "List Of Categories",
      payload: {
        count: totalCategories,
        data: categories,
      },
    });
  } catch (error) {
    message: error + " error while getting categories";
  }
};

const getCategory = async (req, res) => {
  try {
    const category_id = req.params.categoryId;
    const category = await CategoryModel.findById({
      _id: category_id,
    });
    res.send({
      status: true,
      code: 200,
      payload: {
        data: category,
      },
    });
  } catch (error) {
    message: error + " error while getting categories";
  }
};

const updateCategory = async (req, res) => {
  try {
    const category_id = req.params.categoryId;
    const updateCategoryDetails = await CategoryModel.findByIdAndUpdate(
      {
        _id: category_id,
      },
      { title: req.body.title, slug: slugify(req.body.title).toLowerCase() },
      { new: true }
    );
    updateCategoryDetails.save();
    const updatedCategory = await CategoryModel.findById(category_id);
    res.send({
      status: true,
      code: 200,
      message: "Category Updated",
      payload: {
        data: updatedCategory,
      },
    });
    console.log("Category Updated");
  } catch (error) {
    console.log(error + "Error while updating category");
  }
};
const deleteCategory = async (req, res) => {
  const category_id = req.params.categoryId;
  const deletedCategory = await CategoryModel.findByIdAndDelete(category_id);
  res.send({
    status: true,
    code: 200,
    message: "Category Deleted",
    payload: {
      data: deletedCategory,
    },
  });
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
