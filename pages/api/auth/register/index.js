import { connectToDB } from "@/config/db";
import userModel from "@/models/user";
import { generateToken, hashedPasswordHandler } from "@/utils/auth";
import userCheck from "@/validators/user";
import { serialize } from "cookie";

const register = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "POST":
        const { username, email, password } = req.body;
        const userInfo = { username, email, password };

        const users = await userModel.find();

        if (users.length > 0) {
          userInfo.role = "USER";
        } else {
          userInfo.role = "ADMIN";
        }

        const isValidUserInfo = userCheck(userInfo);

        if (isValidUserInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        const isUserExist = await userModel.findOne({
          $or: [{ email }, { username }],
        });

        if (isUserExist) {
          return res.status(422).json({
            message: "There is a user with this username or email",
          });
        }

        const hashedPassword = await hashedPasswordHandler(password);

        userInfo.password = hashedPassword;

        await userModel.create(userInfo);

        const token = generateToken({ email });

        const cookie = serialize("user_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });

        return res
          .setHeader("Set-Cookie", cookie)
          .status(201)
          .json({ message: "Register successfully :))" });
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res.status(500).res({ message: "Unknown internal server error !!" });
  }
};

export default register;
