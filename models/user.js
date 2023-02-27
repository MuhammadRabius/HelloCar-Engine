const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide unique username"],
      unique: [true, "Username Exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide  password"],
      unique: [false],
    },
    email: {
      type: String,
      required: [true, "Please provide unique email"],
      unique: [true, "Email Exist"],
    },
    carModel: { type: String },
    phoneNumber: { type: Number },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", schema);
