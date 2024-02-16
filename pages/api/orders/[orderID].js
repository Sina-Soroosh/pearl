import { connectToDB } from "@/config/db";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";

const order = async (req, res) => {
  connectToDB();

  const { orderID } = req.query;

  const mainOrder = await orderModel.findOne({ orderID });

  if (!mainOrder) {
    return res.status(404).json({ message: "Notfound order !!" });
  }

  const user = await getMe(req.cookies);

  if (
    user === false ||
    (user._id.toString() !== mainOrder.userID.toString() &&
      user.role !== "ADMIN")
  ) {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  try {
    switch (req.method) {
      case "GET": {
        return res.json(mainOrder);
      }
      case "DELETE": {
        if (user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        await orderModel.findOneAndDelete({ orderID });

        return res.json({ message: "Remove order is successfully !!" });
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

export default order;
