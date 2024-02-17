import { connectToDB } from "@/config/db";
import faqModel from "@/models/faq";
import { getMe } from "@/utils/myAccount";
import { isValidObjectId } from "mongoose";

const question = async (req, res) => {
  connectToDB();

  const { questionID } = req.query;

  if (!isValidObjectId(questionID)) {
    return res.status(404).json({ message: "Notfound question !!" });
  }

  const question = await faqModel.findOne({ _id: questionID });

  if (!question) {
    return res.status(404).json({ message: "Notfound question !!" });
  }

  const user = await getMe(req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  try {
    switch (req.method) {
      case "DELETE": {
        await faqModel.findOneAndDelete({ _id: questionID });

        return res.json({ message: "Remove question successfully :))" });
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

export default question;
