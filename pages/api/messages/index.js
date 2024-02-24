import { connectToDB } from "@/config/db";
import messageModel from "@/models/message";
import { getMe } from "@/utils/myAccount";

const messages = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const user = await getMe(req.cookies);

        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const messages = await messageModel.find();

        return res.json(messages);
      }
      case "POST": {
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

export default messages;
