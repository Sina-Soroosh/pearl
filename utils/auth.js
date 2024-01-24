const bcrypt = require("bcryptjs");

const hashedPasswordHandler = (password) => {
  const hashedPassword = bcrypt.hashSync(password);

  return hashedPassword;
};

export { hashedPasswordHandler };
