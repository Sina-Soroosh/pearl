const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  name: { type: "string", required: true, min: 3 },
  email: { type: "email", required: true },
  message: { type: "string", required: true },
};

const messageCheck = validator.compile(schema);

export default messageCheck;
