const {
  addOrders,
  getOrders,
  updateOrder,
  deleteOrderById,
} = require("../controllers/order");
const { adminMiddlewere } = require("../middlewere");

const orderRoutes = (app) => {
  app.get("/api/v1/orders", (req, res) => getOrders(req, res));
  app.post("/api/v1/orders/create", adminMiddlewere, (req, res) =>
    addOrders(req, res)
  );
  app.put("/api/v1/orders/:orderId", adminMiddlewere, (req, res) =>
    updateOrder(req, res)
  );
  app.delete("/api/v1/orders/:orderId", adminMiddlewere, (req, res) =>
    deleteOrderById(req, res)
  );
};
module.exports = { orderRoutes };
