import { connectToDB } from "@/config/db";
import sliderModel from "@/models/slider";

const sliders = async (req, res) => {
  await connectToDB();

  try {
    const slidersData = await sliderModel.find();

    switch (req.method) {
      case "GET": {
        return res.json(slidersData);
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

export default sliders;
