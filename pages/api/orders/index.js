import { connectToDB } from "@/config/db";
import cartModel from "@/models/cart";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";
import addressCheck from "@/validators/address";

const orders = async (req, res) => {
  await connectToDB();

  try {
    const user = await getMe(req.cookies);

    if (!user) {
      return res.status(401).json({ message: "You are unauthorized" });
    }

    switch (req.method) {
      case "GET": {
        const userOrders = await orderModel.find({ userID: user._id });

        return res.json(userOrders);
      }
      case "POST": {
        const {
          firstName,
          lastName,
          province,
          city,
          address,
          postalCode,
          phone,
          email,
          desc,
        } = req.body;

        const isValidAddressInfo = addressCheck({
          firstName,
          lastName,
          province,
          city,
          address,
          postalCode,
          phone,
          email,
        });

        if (isValidAddressInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        const cart = await cartModel
          .findOne({ user: user._id })
          .populate([
            { path: "products.product", select: "title price discount" },
          ]);

        if (cart.products.length === 0) {
          return res.status(400).json({ message: "Your cart is empty" });
        }

        let total = 0;

        const products = cart.products.map((product) => {
          total +=
            product.product.price *
            ((100 - product.product.discount) / 100) *
            product.count;

          return {
            title: product.product.title,
            price:
              product.product.price * ((100 - product.product.discount) / 100),
            count: product.count,
          };
        });

        let orderID = 10000;

        const orders = await orderModel.find();

        if (orders.length > 0) {
          orderID = orders.reduce(
            (prev, next) => (prev > next.orderID ? prev : next.orderID),
            0
          );

          orderID++;
        }

        const orderInfo = {
          orderID,
          userID: user._id,
          user: {
            firstName,
            lastName,
            email,
            phone,
          },
          address: {
            province,
            city,
            address,
            postalCode,
          },
          desc,
          total,
          products,
        };

        await orderModel.create(orderInfo);

        await cartModel.findOneAndUpdate({ user: user._id }, { products: [] });

        return res.status(201).json({ message: "Create order successfully" });
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
