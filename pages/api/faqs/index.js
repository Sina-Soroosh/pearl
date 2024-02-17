import { connectToDB } from "@/config/db";
import faqModel from "@/models/faq";

const faqs = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET": {
        const faqs = await faqModel.find();

        return res.json(faqs);
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
