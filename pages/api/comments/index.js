import { connectToDB } from "@/config/db";
import commentModel from "@/models/comment";
import productModel from "@/models/product";
import { getMe } from "@/utils/myAccount";
import commentCheck from "@/validators/comment";

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
      case "POST": {
        if (user === false) {
          return res.status(401).json({ message: "You are unauthorize !!" });
        }

        const { body, star, product: shortNameProduct } = req.body;

        const product = await productModel.findOne({
          shortName: shortNameProduct,
        });

        if (!product) {
          return res.status(404).json({ message: "Notfound product !!" });
        }

        const commentInfo = {
          body,
          star,
          product: product._id.toString(),
          creator: user._id.toString(),
          isShow: false,
        };

        const isValidCommentInfo = await commentCheck(commentInfo);

        if (isValidCommentInfo !== true) {
          return res.status(400).json({ message: "Parameters is not valid" });
        }

        await commentModel.create(commentInfo);

        return res
          .status(201)
          .json({ message: "Create comment successfully :))" });
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
