const { OrderModal } = require("../models/order");
const { capitalize } = require("../helper/helper");

// get products
const getOrders = async (req, res) => {
  const limitVal = +req.query.limit; // '+' sign parsed the incoming query into integer
  const page = +req.query.page;
  const skipVal = page === 1 ? 0 : page * limitVal - limitVal + 1; // skip
  // 1=1-3, 2=4-6

  try {
    const orders = await OrderModal.find()
      .limit(limitVal) // gives according to limit ex, localhost:4000/api/v1/products?limit=2
      .skip(skipVal)
      .populate("Users")
      .populate("Products");
    const totalOrders = await OrderModal.find().count();
    res.send({
      status: true,
      code: 200,
      payload: {
        count: totalOrders,
        requestedCount: limitVal,
        data: orders,
      },
    });
  } catch (error) {
    res.send("error while getting orders " + error);
  }
};

// add order
const addOrders = async (req, res) => {
  try {
    // const isOrder = await OrderModal.findOne({
    //   title: req.body.title,
    // });

    // if (isOrder) {
    //   res.send({ message: "Duplicate order Found" });
    // } else {

    const order = new OrderModal({
      shippingAddress: req.body.shippingAddress,
      user: req.body.user,
      products: req.body.products,
      imageUrl: req.body.imageUrl,
      orderItems: req.body.orderItems,
    });
    await order.save();

    const response = {
      statusCode: 200,
      msg: "order created successfully",
      headers: { "content-type": "application/json" },
      body: {
        data: order,
      },
    };
    res.send(response);
    console.log("ORDER ADDED");
  } catch (error) {
    //   }
    console.log(error);
    res.send("Error while adding order");
  }
};

// update order by id
const updateOrder = async (req, res) => {
  try {
    const order_id = req.params.orderId;
    const updateOrderDetails = await OrderModal.findByIdAndUpdate(
      { _id: order_id },
      {
        shippingAddress: req.body.shippingAddress,
        user: req.body.user,
        products: req.body.products,
        imageUrl: req.body.imageUrl,
        orderItems: req.body.orderItems,
      },
      {
        new: true,
      }
    );
    updateOrderDetails.save();
    const order = await OrderModal.findById(order_id);
    res.send(order);
    console.log("ORDER UPDATED");
  } catch (error) {
    res.send("error while updating order " + error);
  }
};

// deleting order
const deleteOrderById = async (req, res) => {
  try {
    const order_id = req.params.orderId;
    const deleteOrder = await OrderModal.findByIdAndDelete(order_id);
    const response = {
      statusCode: 200,
      msg: "Order Deleted successfully",
      payload: {
        data: deleteOrder,
      },
    };
    res.send(response);
    console.log("ORDERDELETED");
  } catch (error) {
    res.send("error while deleting prder " + error);
  }
};

module.exports = {
  getOrders,
  addOrders,
  updateOrder,
  deleteOrderById,
};
