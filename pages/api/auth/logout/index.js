import { connectToDB } from "@/config/db";
import { serialize } from "cookie";

const logout = async (req, res) => {
  connectToDB();

  try {
    switch (req.method) {
      case "GET":
        const cookie = serialize("user_token", "", {
          httpOnly: true,
          path: "/",
          maxAge: -1,
        });

        return res
          .setHeader("Set-Cookie", cookie)
          .json({ message: "Logout successfully :))" });
      default:
        return res.status(405).json({ message: "The method is not valid" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unknown internal server error !!" });
  }
};

export default logout;
