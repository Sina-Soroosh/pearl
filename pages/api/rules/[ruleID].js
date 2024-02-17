import { connectToDB } from "@/config/db";
import ruleModel from "@/models/rule";
import { getMe } from "@/utils/myAccount";
import { isValidObjectId } from "mongoose";

const rule = async (req, res) => {
  connectToDB();

  const { ruleID } = req.query;

  if (!isValidObjectId(ruleID)) {
    return res.status(404).json({ message: "Notfound rule !!" });
  }

  const rule = await ruleModel.findOne({ _id: ruleID });

  if (!rule) {
    return res.status(404).json({ message: "Notfound rule !!" });
  }

  const user = await getMe(req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  try {
    switch (req.method) {
      case "DELETE": {
        await ruleModel.findOneAndDelete({ _id: ruleID });

        return res.json({ message: "Remove rule successfully :))" });
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

export default rule;
