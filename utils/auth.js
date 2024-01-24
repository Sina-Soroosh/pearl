const bcrypt = require("bcryptjs");

const hashedPasswordHandler = (password) => {
  const hashedPassword = bcrypt.hashSync(password);

  return hashedPassword;
};

const comparedPasswordHandler = (password, hashedPassword) => {
  const isValidPassword = bcrypt.compareSync(password, hashedPassword);

  return isValidPassword;
};

export { hashedPasswordHandler, comparedPasswordHandler };
