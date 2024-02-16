const { default: mongoose } = require("mongoose");

const newsletterSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const newsletterModel =
  mongoose.models.newsletter || mongoose.model("newsletter", newsletterSchema);

export default newsletterModel;
