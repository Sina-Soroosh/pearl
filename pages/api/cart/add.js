import { connectToDB } from "@/config/db";
import cartModel from "@/models/cart";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";

const addToCart = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "POST": {
        const user = await getMe(req.cookies);

        if (!user) {
          return res.status(401).json({ message: "You are unauthorized" });
        }

        const { product } = req.body;

        if (!product) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        const mainProduct = await productModel.findOne({ shortName: product });

        if (!mainProduct) {
          return res.status(404).json({ message: "Notfound product !!" });
        }

        if (!mainProduct.isAvailable) {
          return res.status(400).json({ message: "Product isn't available" });
        }

        const cart = await cartModel.findOne({ user: user._id });
        const productsToCart = [...cart.products];
        const indexProductToCart = cart.products.findIndex(
          ({ product }) => product.toString() === mainProduct._id.toString()
        );

        if (indexProductToCart !== -1) {
          productsToCart[indexProductToCart].count++;
        } else {
          productsToCart.push({ product: mainProduct._id, count: 1 });
        }

        await cartModel.findOneAndUpdate(
          { user: user._id },
          { products: productsToCart }
        );

        return res
          .status(201)
          .json({ message: "Add product to cart is successfully !!" });
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

export default addToCart;
