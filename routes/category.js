const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { adminMiddlewere } = require("../middlewere");

const categoryRoute = (app, httpServer) => {
  app.post("/api/v1/categories/create", adminMiddlewere, (req, res) =>
    createCategory(req, res, httpServer)
  );

  app.get("/api/v1/categories", (req, res) => getCategories(req, res));

  app.get("/api/v1/categories/:categoryId", (req, res) =>
    getCategory(req, res)
  );

  app.put("/api/v1/categories/:categoryId", (req, res) =>
    updateCategory(req, res)
  );

  app.delete("/api/v1/categories/:categoryId", (req, res) =>
    deleteCategory(req, res)
  );
};

module.exports = { categoryRoute };
