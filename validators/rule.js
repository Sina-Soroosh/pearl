const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  title: { type: "string", required: true, min: 3 },
  body: { type: "string", required: true },
};

const ruleCheck = validator.compile(schema);

export default ruleCheck;
