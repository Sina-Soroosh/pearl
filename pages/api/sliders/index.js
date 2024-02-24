import { connectToDB } from "@/config/db";
import productModel from "@/models/product";
import sliderModel from "@/models/slider";
import { saveFile } from "@/utils/file";
import { getMe } from "@/utils/myAccount";
import sliderCheck from "@/validators/slider";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const sliders = async (req, res) => {
  await connectToDB();

  try {
    const slidersData = await sliderModel.find();

    switch (req.method) {
      case "GET": {
        return res.json(slidersData);
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
          let sliderInfo = {};

          try {
            sliderInfo = {
              image: "",
              title: fields.title[0],
              product: fields.product[0],
              text: fields.text[0],
            };
          } catch (error) {
            return res.status(400).json({ message: "Parameters is not valid" });
          }

          const isValidSliderInfo = await sliderCheck(sliderInfo);

          if (!files.image || isValidSliderInfo !== true) {
            return res.status(400).json({ message: "Parameters is not valid" });
          }

          const product = await productModel.findOne({
            shortName: sliderInfo.product,
          });

          if (!product) {
            return res.status(404).json({ message: "NotFound product !!" });
          }

          const image = await saveFile(files.image);

          sliderInfo.image = image;

          await sliderModel.create(sliderInfo);

          return res
            .status(201)
            .json({ message: "Create slider successfully :))" });
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

export default sliders;
