const { default: mongoose } = require("mongoose");

const citySchema = mongoose.Schema({
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
  province_id: {
    type: Number,
  },
});

const cityModel = mongoose.models.city || mongoose.model("city", citySchema);

export default cityModel;
