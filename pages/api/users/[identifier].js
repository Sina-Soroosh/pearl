import { connectToDB } from "@/config/db";
import userModel from "@/models/user";
import { getMe } from "@/utils/myAccount";
import userCheck from "@/validators/user";

const users = async (req, res) => {
  connectToDB();

  try {
    const user = await getMe(req.cookies);

    if (user === false || user.role !== "ADMIN") {
      return res.status(403).json({ message: "You don't access to data !!" });
    }

    switch (req.method) {
      case "GET": {
        const { identifier } = req.query;

        const userMain = await userModel.findOne(
          {
            $or: [{ email: identifier }, { username: identifier }],
          },
          "-password"
        );

        if (!userMain) {
          return res.status(404).json({ message: "Notfound user !!" });
        }

        return res.json(userMain);
      }
      case "DELETE": {
      }
      case "PUT": {
      }
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res.status(500).res({ message: "Unknown internal server error !!" });
  }
};

export default users;
