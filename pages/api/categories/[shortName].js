import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import { getMe } from "@/utils/myAccount";
import categoryCheck from "@/validators/category";

const category = async (req, res) => {
  connectToDB();

  try {
    const { shortName } = req.query;

    const mainCategory = await categoryModel.findOne({ shortName });

    if (!mainCategory) {
      return res.status(404).json({ message: "Notfound category !!" });
    }

    switch (req.method) {
      case "GET": {
        return res.json(mainCategory);
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

export default category;
