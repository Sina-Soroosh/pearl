const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  body: {
    type: "string",
    required: true,
  },
  star: {
    type: "number",
    min: 0,
    max: 5,
    required: true,
  },
  product: {
    type: "string",
    required: true,
  },
  creator: {
    type: "string",
    required: true,
  },
  isShow: {
    type: "boolean",
    required: true,
  },
};

const commentCheck = validator.compile(schema);

export default commentCheck;
