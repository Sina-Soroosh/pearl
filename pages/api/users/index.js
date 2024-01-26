import { connectToDB } from "@/config/db";
import userModel from "@/models/user";
import { getMe } from "@/utils/myAccount";

const users = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET":
        const user = await getMe(req.cookies);

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

      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res.status(500).res({ message: "Unknown internal server error !!" });
  }
};

export default users;
