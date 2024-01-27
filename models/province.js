import cityModel from "./city";

const { default: mongoose } = require("mongoose");

const provinceSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

provinceSchema.virtual("cities", {
  ref: "city",
  localField: "id",
  foreignField: "province_id",
});

const provinceModel =
  mongoose.models.province || mongoose.model("province", provinceSchema);

export default provinceModel;
