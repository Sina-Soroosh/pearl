import { connectToDB } from "@/config/db";
import ruleModel from "@/models/rule";
import { getMe } from "@/utils/myAccount";
import ruleCheck from "@/validators/rule";

const rules = async (req, res) => {
  await connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const rules = await ruleModel.find();

        return res.json(rules);
      }
      case "POST": {
        const user = await getMe(req.cookies);

        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const { title, body } = req.body;

        const ruleInfo = { title, body };

        const isValidRule = ruleCheck(ruleInfo);

        if (isValidRule !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        await ruleModel.create(ruleInfo);

        return res
          .status(201)
          .json({ message: "Create rule successfully :))" });
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
