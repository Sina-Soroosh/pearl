import { connectToDB } from "@/config/db";
import commentModel from "@/models/comment";
import { getMe } from "@/utils/myAccount";

const comments = async (req, res) => {
  connectToDB();

  try {
    const user = await getMe(req.cookies);

    switch (req.method) {
      case "GET": {
        if (user === false || user.role !== "ADMIN") {
          return res
            .status(403)
            .json({ message: "You don't access to data !!" });
        }

        const commentsData = await commentModel.find();

        return res.json(commentsData);
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

export default comments;
