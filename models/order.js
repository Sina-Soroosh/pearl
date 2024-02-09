import userModel from "./user";

const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderID: {
      type: Number,
      required: true,
      index: true,
      unique: true,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    user: {
      firstName: {
        type: String,
        minLength: 3,
        required: true,
      },
      lastName: {
        type: String,
        minLength: 3,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    address: {
      province: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        title: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          default: 1,
          min: 1,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "shipped", "delivered"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
