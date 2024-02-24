const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  title: { type: "string", required: true, min: 3 },
  text: { type: "string", required: true, min: 3 },
  image: { type: "string", required: true },
  product: { type: "string", required: true, min: 3 },
};

const sliderCheck = validator.compile(schema);

export default sliderCheck;
