import { sign } from "jsonwebtoken";
const bcrypt = require("bcryptjs");

const hashedPasswordHandler = (password) => {
  const hashedPassword = bcrypt.hashSync(password);

  return hashedPassword;
};

const comparedPasswordHandler = (password, hashedPassword) => {
  const isValidPassword = bcrypt.compareSync(password, hashedPassword);

  return isValidPassword;
};

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey);

  return token;
};

export { hashedPasswordHandler, comparedPasswordHandler, generateToken };
