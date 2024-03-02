import { connectToDB } from "@/config/db";
import messageModel from "@/models/message";
import { getMe } from "@/utils/myAccount";
import messageCheck from "@/validators/message";

const messages = async (req, res) => {
  await connectToDB();

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
        const { name, email, message } = req.body;

        const messageInfo = { name, email, message };

        const isValidMessage = messageCheck(messageInfo);

        if (isValidMessage !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        await messageModel.create(messageInfo);

        return res
          .status(201)
          .json({ message: "Create message successfully :))" });
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
