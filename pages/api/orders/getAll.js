import { connectToDB } from "@/config/db";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";

const getAll = async (req, res) => {
  await connectToDB();

  try {
    const user = await getMe(req.cookies);

    if (user === false || user.role !== "ADMIN") {
      return res.status(403).json({ message: "You don't access to data !!" });
    }

    switch (req.method) {
      case "GET": {
        const orders = await orderModel.find({});

        return res.json(orders);
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

export default getAll;
