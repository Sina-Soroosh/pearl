import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";

const categories = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const categoriesData = await categoryModel.find();

        return res.json(categoriesData);
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

export default categories;
