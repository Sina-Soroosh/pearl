const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  title: { type: "string", min: 3, required: true },
  shortName: { type: "string", min: 3, required: true },
};

const categoryCheck = validator.compile(schema);

export default categoryCheck;
