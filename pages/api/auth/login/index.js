import { connectToDB } from "@/config/db";
import userModel from "@/models/user";
import { comparedPasswordHandler, generateToken } from "@/utils/auth";
import { serialize } from "cookie";

const login = async (req, res) => {
  await connectToDB();

  try {
    switch (req.method) {
      case "PUT":
        const { identifier, password } = req.body;

        const user = await userModel.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) {
          return res.status(404).json({ message: "Not found user !!" });
        }

        const isValidPassword = await comparedPasswordHandler(
          password,
          user.password
        );

        if (!isValidPassword) {
          return res
            .status(400)
            .json({ message: "Password or identifier is not valid" });
        }

        const token = generateToken({ email: user.email });

        const cookie = serialize("user_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });

        return res
          .setHeader("Set-Cookie", cookie)
          .json({ message: "Login successfully :))" });
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown internal server error !!" });
  }
};

export default login;
