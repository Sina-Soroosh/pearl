import { sign, verify } from "jsonwebtoken";
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

const verifyToken = (token) => {
  try {
    let payloadToken = verify(token, process.env.privateKey);

    return payloadToken;
  } catch (error) {
    return false;
  }
};

export {
  hashedPasswordHandler,
  comparedPasswordHandler,
  generateToken,
  verifyToken,
};
