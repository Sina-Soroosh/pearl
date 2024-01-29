const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  title: { type: "string", required: true, min: 3 },
  image: { type: "string", required: true },
  shortName: { type: "string", required: true, min: 3 },
  desc: { type: "string", required: true, min: 10 },
  price: { type: "number", required: true, min: 0 },
  rating: { type: "number", required: true, min: 0, max: 5 },
  discount: { type: "number", required: true, min: 0, max: 100 },
  isAvailable: { type: "boolean", required: true },
  category: { type: "string", required: true },
};

const productCheck = validator.compile(schema);

export default productCheck;
