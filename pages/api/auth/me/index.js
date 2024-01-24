import { connectToDB } from "@/config/db";
import userModel from "@/models/user";
import { verifyToken } from "@/utils/auth";

const me = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET":
        const token = req.cookies.user_token;

        if (!token) {
          return res.status(404).json({ message: "Notfound token !!" });
        }

        const valueToken = verifyToken(token);

        if (!valueToken || !valueToken.email) {
          return res.status(404).json({ message: "Notfound token !!" });
        }

        const user = await userModel.findOne(
          { email: valueToken.email },
          "-password"
        );

        if (!user) {
          return res.status(404).json({ message: "Notfound user !!" });
        }

        return res.json(user);
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res.status(500).res({ message: "Unknown internal server error !!" });
  }
};

export default me;
