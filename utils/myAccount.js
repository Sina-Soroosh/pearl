import { verifyToken } from "./auth";

const { connectToDB } = require("@/config/db");
const { default: userModel } = require("@/models/user");

const getMe = async (cookies) => {
  connectToDB();

  const token = cookies.user_token;

  if (!token) {
    return false;
  }

  const valueToken = verifyToken(token);

  if (!valueToken || !valueToken.email) {
    return false;
  }

  const user = await userModel.findOne(
    { email: valueToken.email },
    "-password"
  );

  if (!user) {
    return false;
  }

  return user;
};

export { getMe };
