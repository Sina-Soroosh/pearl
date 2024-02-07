import productModel from "./product";
import userModel from "./user";

const { default: mongoose } = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "product",
        required: true,
      },
      count: {
        type: Number,
        default: 1,
        min: 1,
        required: true,
      },
    },
  ],
});

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);

export default cartModel;
