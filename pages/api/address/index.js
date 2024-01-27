import { connectToDB } from "@/config/db";
import addressModel from "@/models/address";
import { getMe } from "@/utils/myAccount";

const address = async (req, res) => {
  connectToDB();

  try {
    const user = await getMe(req.cookies);

    if (!user) {
      return res.status(401).json({ message: "You are unauthorized" });
    }

    switch (req.method) {
      case "GET": {
        const mainAddress = await addressModel.findOne({ user: user._id });

        return res.json(mainAddress);
      }
      case "PUT": {
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

export default address;
