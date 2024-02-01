import productModel from "./product";
import userModel from "./user";

const { default: mongoose } = require("mongoose");

const commentSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isShow: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const commentModel =
  mongoose.models.comment || mongoose.model("comment", commentSchema);

export default commentModel;
