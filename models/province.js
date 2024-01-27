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

const provinceModel =
  mongoose.models.province || mongoose.model("province", provinceSchema);

export default provinceModel;
