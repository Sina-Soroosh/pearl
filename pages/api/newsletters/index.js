import { connectToDB } from "@/config/db";
import newsletterModel from "@/models/newsletter";
import newsletterCheck from "@/validators/newsletter";

const newsletters = async (req, res) => {
  await connectToDB();

  try {
    switch (req.method) {
      case "POST": {
        const { email } = req.body;

        const isValidNewsletter = newsletterCheck({ email });

        if (isValidNewsletter !== true) {
          return res.status(400).json({ message: "Email is not valid" });
        }

        const isEmailExist = await newsletterModel.findOne({
          email,
        });

        if (isEmailExist) {
          return res.status(422).json({
            message: "This email has already been registered",
          });
        }

        await newsletterModel.create({ email });

        return res
          .status(201)
          .json({ message: "The email was successfully registered" });
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

export default newsletters;
