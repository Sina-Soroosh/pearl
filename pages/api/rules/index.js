import { connectToDB } from "@/config/db";
import ruleModel from "@/models/rule";

const rules = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const rules = await ruleModel.find();

        return res.json(rules);
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

export default rules;
