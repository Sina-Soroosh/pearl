import categoryModel from "./category";
import commentModel from "./comment";

const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      minLength: 3,
      required: true,
      index: true,
      unique: true,
    },
    desc: {
      type: String,
      minLength: 3,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 1,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    infos: [
      {
        title: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

productSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "product",
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
