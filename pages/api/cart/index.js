import { connectToDB } from "@/config/db";
import cartModel from "@/models/cart";
import { getMe } from "@/utils/myAccount";

const cart = async (req, res) => {
  await connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const user = await getMe(req.cookies);

        if (!user) {
          return res.status(401).json({ message: "You are unauthorized" });
        }

        const cart = await cartModel.findOne({ user: user._id }).populate([
          {
            path: "products.product",
            select: "shortName title price discount image",
          },
        ]);

        return res.json(cart);
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

export default cart;
