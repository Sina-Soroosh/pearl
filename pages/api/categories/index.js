import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import { getMe } from "@/utils/myAccount";
import categoryCheck from "@/validators/category";

const categories = async (req, res) => {
  await connectToDB();

  try {
    const categoriesData = await categoryModel.find();

    switch (req.method) {
      case "GET": {
        return res.json(categoriesData);
      }
      case "POST": {
        const user = await getMe(req.cookies);

        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const { title, shortName } = req.body;

        const categoryInfo = { title, shortName };

        const isValidCategoryInfo = categoryCheck(categoryInfo);

        if (isValidCategoryInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        const isCategoryExist = await categoryModel.findOne({
          shortName,
        });

        if (isCategoryExist) {
          return res.status(422).json({
            message: "There is a category with this shortName",
          });
        }

        await categoryModel.create(categoryInfo);

        return res
          .status(201)
          .json({ message: "Create category successfully :))" });
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
