import { connectToDB } from "@/config/db";
import cartModel from "@/models/cart";
import categoryModel from "@/models/category";
import commentModel from "@/models/comment";
import productModel from "@/models/product";
import { configCloudinary } from "@/utils/file";
import { getMe } from "@/utils/myAccount";
import productCheck from "@/validators/product";
import { isValidObjectId } from "mongoose";
const cloudinary = require("cloudinary").v2;

const product = async (req, res) => {
  await connectToDB();

  try {
    const { shortName } = req.query;

    const product = await productModel.findOne({ shortName }, "-infos._id");

    if (!product) {
      return res.status(404).json({ message: "Notfound product !!" });
    }

    const user = await getMe(req.cookies);

    switch (req.method) {
      case "GET": {
        const product = await productModel
          .findOne({ shortName })
          .populate([
            { path: "category" },
            {
              path: "comments",
              populate: [{ path: "creator", select: "username email" }],
            },
          ])
          .lean();

        product.comments = product.comments.filter((comment) => comment.isShow);

        return res.json(product);
      }
      case "PUT": {
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const {
          title = product.title,
          shortName: shortNameBody = product.shortName,
          desc = product.desc,
          price = product.price,
          discount = product.discount,
          category = product.category.toString(),
          infos = product.infos,
        } = req.body;

        const productInfo = {
          title,
          shortName: shortNameBody,
          desc,
          price,
          discount,
          category,
          infos,
          image: product.image,
          rating: product.rating,
          isAvailable: product.isAvailable,
        };

        if (category.toString() !== product.category.toString()) {
          if (!isValidObjectId(category)) {
            return res.status(400).json({ message: "category id is invalid" });
          }

          const categoryMain = await categoryModel.findOne({
            _id: category,
          });

          if (!categoryMain) {
            return res.status(404).json({ message: "Notfound category !!" });
          }
        }

        const isValidProductInfo = await productCheck(productInfo);

        if (isValidProductInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        if (shortName !== shortNameBody) {
          const isProductExist = await productModel.findOne({
            shortName: productInfo.shortName,
          });

          if (isProductExist) {
            return res.status(422).json({
              message: "There is a product with this shortName",
            });
          }
        }

        await productModel.findOneAndUpdate({ _id: product._id }, productInfo);

        return res.json({ message: "Update product successfully :))" });
      }
      case "DELETE": {
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        await configCloudinary();

        await cartModel.updateMany(
          {
            "products.product": product._id,
          },
          { $pull: { products: { product: product._id } } }
        );

        await commentModel.deleteMany({ product: product._id });

        await cloudinary.api.delete_resources(product.imageID, {
          type: "upload",
          resource_type: "image",
        });

        await productModel.findOneAndDelete({ _id: product._id });

        return res.json({ message: "Remove product successfully :))" });
      }
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown internal server error !!", error });
  }
};

export default product;
