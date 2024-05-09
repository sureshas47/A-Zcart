const {
  addProducts,
  getProducts,
  getProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/product");
const { adminMiddlewere } = require("../middlewere");

const productRoutes = (app) => {
  app.get("/api/v1/products", (req, res) => getProducts(req, res));
  app.post("/api/v1/products/create", (req, res) => addProducts(req, res));
  app.get("/api/v1/products/:productId", (req, res) => getProduct(req, res));
  app.put("/api/v1/products/:productId", (req, res) => updateProduct(req, res));
  app.delete("/api/v1/products/:productId", (req, res) =>
    deleteProductById(req, res)
  );
};
module.exports = { productRoutes };
