import { connectToDB } from "@/config/db";
import faqModel from "@/models/faq";
import { getMe } from "@/utils/myAccount";
import faqCheck from "@/validators/faq";

const faqs = async (req, res) => {
  await connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const faqs = await faqModel.find();

        return res.json(faqs);
      }
      case "POST": {
        const user = await getMe(req.cookies);

        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const { title, body } = req.body;

        const questionInfo = { title, body };

        const isValidQuestion = faqCheck(questionInfo);

        if (isValidQuestion !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        await faqModel.create(questionInfo);

        return res
          .status(201)
          .json({ message: "Create question successfully :))" });
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

export default faqs;
