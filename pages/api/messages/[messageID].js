import { connectToDB } from "@/config/db";
import messageModel from "@/models/message";
import { getMe } from "@/utils/myAccount";
import { isValidObjectId } from "mongoose";

const message = async (req, res) => {
  connectToDB();

  const { messageID } = req.query;

  if (!isValidObjectId(messageID)) {
    return res.status(404).json({ message: "Notfound message !!" });
  }

  const message = await messageModel.findOne({ _id: messageID });

  if (!message) {
    return res.status(404).json({ message: "Notfound message !!" });
  }

  const user = await getMe(req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  try {
    switch (req.method) {
      case "DELETE": {
        await messageModel.findOneAndDelete({ _id: messageID });

        return res.json({ message: "Remove message successfully :))" });
      }
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown internal server error !!", error });
  }
};

export default message;
