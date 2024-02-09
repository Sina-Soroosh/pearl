import { connectToDB } from "@/config/db";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";

const orders = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const user = await getMe(req.cookies);

        if (!user) {
          return res.status(401).json({ message: "You are unauthorized" });
        }

        const userOrders = await orderModel.find({ user: user._id });

        return res.json(userOrders);
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

export default orders;
