const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shippingAddress: {
      type: String,
      required: true,
      trim: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    orderStatus: {
      type: String,
      default: "Reviewing",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModal = mongoose.model("Orders", orderSchema);
module.exports = { OrderModal };
