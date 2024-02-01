import { connectToDB } from "@/config/db";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";

const changeStatus = async (req, res) => {
  connectToDB();

  try {
    const { shortName } = req.query;

    const product = await productModel.findOne({ shortName }, "-infos._id");

    if (!product) {
      return res.status(404).json({ message: "Notfound product !!" });
    }

    const user = await getMe(req.cookies);

    switch (req.method) {
      case "PUT": {
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        if (product.isAvailable) {
          // Edit Cart Users
        }

        await productModel.findOneAndUpdate(
          { _id: product._id },
          { isAvailable: !product.isAvailable }
        );

        return res.json({ message: "Update product successfully :))" });
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

export default changeStatus;
