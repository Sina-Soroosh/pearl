const { default: mongoose } = require("mongoose");

const sliderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    text: {
      type: String,
      minLength: 3,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageID: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const sliderModel =
  mongoose.models.slider || mongoose.model("slider", sliderSchema);

export default sliderModel;
