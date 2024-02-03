import { connectToDB } from "@/config/db";
import commentModel from "@/models/comment";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";
import { isValidObjectId } from "mongoose";

const comment = async (req, res) => {
  connectToDB();

  const { commentID } = req.query;

  if (!isValidObjectId(commentID)) {
    return res.status(404).json({ message: "Notfound comment !!" });
  }

  const comment = await commentModel.findOne({ _id: commentID });

  if (!comment) {
    return res.status(404).json({ message: "Notfound comment !!" });
  }

  const user = await getMe(req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return res.status(403).json({ message: "You don't access to data !!" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const commentMain = await commentModel
          .findOne({ _id: commentID })
          .populate([
            { path: "product", select: "shortName title" },
            { path: "creator", select: "username email" },
          ]);

        return res.json(commentMain);
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

export default comment;
