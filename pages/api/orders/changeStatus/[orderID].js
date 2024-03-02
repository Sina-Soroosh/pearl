import { connectToDB } from "@/config/db";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";

const changeStatus = async (req, res) => {
  await connectToDB();

  const { orderID } = req.query;

  const order = await orderModel.findOne({ orderID });

  if (!order) {
    return res.status(404).json({ message: "Notfound order !!" });
  }

  const user = await getMe(req.cookies);

  if (user.role !== "ADMIN") {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  try {
    switch (req.method) {
      case "PUT": {
        if (order.status === "pending") {
          await orderModel.findOneAndUpdate({ orderID }, { status: "shipped" });
        } else if (order.status === "shipped") {
          await orderModel.findOneAndUpdate(
            { orderID },
            { status: "delivered" }
          );
        } else if (order.status === "delivered") {
          await orderModel.findOneAndUpdate({ orderID }, { status: "pending" });
        }

        return res.json({ message: "Change status order is successfully" });
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

export default changeStatus;
