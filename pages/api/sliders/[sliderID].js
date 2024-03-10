import { connectToDB } from "@/config/db";
import sliderModel from "@/models/slider";
import { configCloudinary } from "@/utils/file";
import { getMe } from "@/utils/myAccount";
import { isValidObjectId } from "mongoose";
const cloudinary = require("cloudinary").v2;

const slider = async (req, res) => {
  await connectToDB();

  const { sliderID } = req.query;

  if (!isValidObjectId(sliderID)) {
    return res.status(404).json({ message: "Notfound slider !!" });
  }

  const slider = await sliderModel.findOne({ _id: sliderID });

  if (!slider) {
    return res.status(404).json({ message: "Notfound slider !!" });
  }

  const user = await getMe(req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  const sliders = await sliderModel.find();

  if (sliders.length < 4) {
    return res.status(409).json({ message: "You can't remove slider !!" });
  }

  try {
    switch (req.method) {
      case "DELETE": {
        await configCloudinary();

        await cloudinary.api.delete_resources(slider.imageID, {
          type: "upload",
          resource_type: "image",
        });

        await sliderModel.findOneAndDelete({ _id: sliderID });

        return res.json({ message: "Remove slider successfully :))" });
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

export default slider;
