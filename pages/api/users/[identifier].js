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

    const { identifier } = req.query;

    const userMain = await userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!userMain) {
      return res.status(404).json({ message: "Notfound user !!" });
    }

    switch (req.method) {
      case "GET": {
        return res.json(userMain);
      }
      case "DELETE": {
        if (String(user._id) === String(userMain._id)) {
          return res.status(400).json({
            message: "You can't remove yourself !!",
          });
        }

        await userModel.findOneAndDelete({ _id: userMain._id });

        return res.json({ message: "Remove user successfully :))" });
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
