const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      required: true,
    },
    shortName: {
      type: String,
      minLength: 3,
      required: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const categoryModel =
  mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;
