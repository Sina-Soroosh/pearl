import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import productModel from "@/models/product";
import { saveFile } from "@/utils/file";
import { getMe } from "@/utils/myAccount";
import productCheck from "@/validators/product";
import formidable from "formidable";
import { isValidObjectId } from "mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

const products = async (req, res) => {
  connectToDB();

  try {
    const productsData = await productModel.find().populate("category");

    switch (req.method) {
      case "GET": {
        return res.json(productsData);
      }
      case "POST": {
        const user = await getMe(req.cookies);

        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const form = formidable();

        form.parse(req, async function (err, fields, files) {
          const productInfo = {
            image: "",
            title: fields.title[0],
            shortName: fields.shortName[0],
            desc: fields.desc[0],
            price: +fields.price[0],
            discount: +fields.discount[0],
            isAvailable: Boolean(fields.isAvailable[0]),
            category: fields.category[0],
            infos: JSON.parse(fields.infos[0]),
            rating: 5,
          };

          if (!isValidObjectId(productInfo.category)) {
            return res.status(400).json({ message: "category id is invalid" });
          }

          const categoryMain = await categoryModel.findOne({
            _id: productInfo.category,
          });

          if (!categoryMain) {
            return res.status(404).json({ message: "Notfound category !!" });
          }

          const isValidProductInfo = await productCheck(productInfo);

          if (isValidProductInfo !== true) {
            return res.status(400).json({ message: "Parameters is not valid" });
          }

          const isProductExist = await productModel.findOne({
            shortName: productInfo.shortName,
          });

          if (isProductExist) {
            return res.status(422).json({
              message: "There is a product with this shortName",
            });
          }

          const image = await saveFile(files.image);

          productInfo.image = image;

          await productModel.create(productInfo);

          return res
            .status(201)
            .json({ message: "Create product successfully :))" });
        });

        break;
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
