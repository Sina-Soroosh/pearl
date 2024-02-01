import { connectToDB } from "@/config/db";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";
import productCheck from "@/validators/product";

const product = async (req, res) => {
  connectToDB();

  try {
    const { shortName } = req.query;

    switch (req.method) {
      case "GET": {
        const product = await productModel
          .findOne({ shortName })
          .populate([{ path: "category" }]);

        if (!product) {
          return res.status(404).json({ message: "Notfound product !!" });
        }

        return res.json(product);
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

export default product;
