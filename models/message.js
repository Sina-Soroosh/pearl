const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel =
  mongoose.models.message || mongoose.model("message", messageSchema);

export default messageModel;
