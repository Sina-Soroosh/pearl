import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import commentModel from "@/models/comment";
import { getMe } from "@/utils/myAccount";
import categoryCheck from "@/validators/category";
import comments from "../comments";
import productModel from "@/models/product";
import cartModel from "@/models/cart";

const category = async (req, res) => {
  connectToDB();

  try {
    const { shortName } = req.query;

    const mainCategory = await categoryModel
      .findOne({ shortName })
      .populate("products")
      .lean();

    if (!mainCategory) {
      return res.status(404).json({ message: "Notfound category !!" });
    }

    const user = await getMe(req.cookies);

    switch (req.method) {
      case "GET": {
        return res.json(mainCategory);
      }
      case "PUT": {
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const {
          title = mainCategory.title,
          shortName = mainCategory.shortName,
        } = req.body;

        const categoryInfo = { title, shortName };

        const isValidCategoryInfo = categoryCheck(categoryInfo);

        if (isValidCategoryInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        const isCategoryExist = await categoryModel.findOne({
          $nor: [{ _id: mainCategory._id }],
          shortName,
        });

        if (isCategoryExist) {
          return res.status(422).json({
            message: "There is a category with this shortName",
          });
        }

        await categoryModel.findOneAndUpdate(
          { _id: mainCategory._id },
          categoryInfo
        );

        return res.json({ message: "Update category successfully :))" });
      }
      case "DELETE": {
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        await mainCategory.products.forEach(async (product) => {
          await commentModel.deleteMany({ product: product._id });

          await cartModel.updateMany(
            {
              "products.product": product._id,
            },
            { $pull: { products: { product: product._id } } }
          );
        });

        await productModel.deleteMany({ category: mainCategory._id });

        await categoryModel.findOneAndDelete({ _id: mainCategory._id });

        return res.json({ message: "Remove category successfully :))" });
      }
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown internal server error !!" });
  }
};

export default category;
