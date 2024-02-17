const { default: mongoose } = require("mongoose");

const ruleSchema = mongoose.Schema(
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

const ruleModel = mongoose.models.rule || mongoose.model("rule", ruleSchema);

export default ruleModel;
