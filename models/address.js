import userModel from "./user";

const { default: mongoose } = require("mongoose");

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    required: false,
  },
  lastName: {
    type: String,
    minLength: 3,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

const addressModel =
  mongoose.models.address || mongoose.model("address", addressSchema);

export default addressModel;
