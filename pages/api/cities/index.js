import { connectToDB } from "@/config/db";
import provinceModel from "@/models/province";

const users = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const cities = await provinceModel.find().populate("cities").lean();

        return res.json(cities);
      }
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res.status(500).res({ message: "Unknown internal server error !!" });
  }
};

export default users;
