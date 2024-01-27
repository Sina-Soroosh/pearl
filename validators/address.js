const Validator = require("fastest-validator");

const validator = new Validator();

const schema = {
  firstName: { type: "string", min: 3, required: true },
  lastName: { type: "string", min: 3, required: true },
  province: { type: "string", required: true },
  city: { type: "string", required: true },
  address: { type: "string", required: true },
  postalCode: { type: "string", required: true },
  phone: { type: "string", required: true, pattern: /^(\+98|0)?9\d{9}$/ },
  email: { type: "email", required: true },
};

const addressCheck = validator.compile(schema);

export default addressCheck;
