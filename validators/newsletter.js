const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  email: {
    type: "email",
    required: true,
  },
};

const newsletterCheck = validator.compile(schema);

export default newsletterCheck;
