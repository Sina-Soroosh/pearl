import { connectToDB } from "@/config/db";
import userModel from "@/models/user";
import { generateToken, hashedPasswordHandler } from "@/utils/auth";
import { getMe } from "@/utils/myAccount";
import userCheck from "@/validators/user";
import { serialize } from "cookie";

const users = async (req, res) => {
  connectToDB();

  try {
    const user = await getMe(req.cookies);

    switch (req.method) {
      case "GET":
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const users = await userModel.find(
          {
            $nor: [{ username: user.username }],
          },
          "-password"
        );

        return res.json(users);

      case "PUT":
        if (user === false) {
          return res.status(401).json({ message: "You are unauthorize !!" });
        }

        const userMain = await userModel.findOne({ username: user.username });

        const {
          username = userMain.username,
          email = userMain.email,
          password = userMain.password,
        } = req.body;

        const userInfo = { username, email, password, role: userMain.role };

        const isValidUserInfo = userCheck(userInfo);

        if (isValidUserInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        const isUserExist = await userModel.findOne({
          $or: [{ username }, { email }],
          $nor: [{ _id: user._id }],
        });

        if (isUserExist) {
          return res.status(422).json({
            message: "There is a user with this username or email",
          });
        }

        if (userMain.password !== password) {
          const hashedPassword = await hashedPasswordHandler(password);

          userInfo.password = hashedPassword;
        }

        await userModel.findOneAndUpdate({ _id: userMain._id }, userInfo);

        const token = generateToken({ email });

        const cookie = serialize("user_token", token, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });

        return res
          .setHeader("Set-Cookie", cookie)
          .json({ message: "Update user successfully :))" });
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res.status(500).res({ message: "Unknown internal server error !!" });
  }
};

export default users;
