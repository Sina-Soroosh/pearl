import { connectToDB } from "@/config/db";
import cartModel from "@/models/cart";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";

const removeToCart = async (req, res) => {
  await connectToDB();

  try {
    switch (req.method) {
      case "DELETE": {
        const user = await getMe(req.cookies);

        if (!user) {
          return res.status(401).json({ message: "You are unauthorized" });
        }

        const { shortName } = req.query;

        const mainProduct = await productModel.findOne({
          shortName: shortName,
        });

        if (!mainProduct) {
          return res.status(404).json({ message: "Notfound product !!" });
        }

        const cart = await cartModel.findOne({ user: user._id });
        const productsToCart = cart.products.filter(
          ({ product }) => product.toString() !== mainProduct._id.toString()
        );

        await cartModel.findOneAndUpdate(
          { user: user._id },
          { products: productsToCart }
        );

        return res.json({
          message: "Remove product from cart is successfully !!",
        });
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

export default removeToCart;
