const { default: mongoose } = require("mongoose");

const faqSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const faqModel = mongoose.models.faq || mongoose.model("faq", faqSchema);

export default faqModel;
