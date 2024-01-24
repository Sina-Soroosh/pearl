const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  username: { type: "string", min: 3, required: true },
  email: { type: "email", required: true },
  password: { type: "string", min: 8, required: true },
  role: { type: "string", required: true, enum: ["USER", "ADMIN"] },
};

const userCheck = validator.compile(schema);

export default userCheck;
