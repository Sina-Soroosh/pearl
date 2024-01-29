import { connectToDB } from "@/config/db";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";

const products = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const productsData = await productModel
          .find()
          .populate({ path: "category" });

        return res.json(productsData);
      }
      case "POST": {
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

export default products;
