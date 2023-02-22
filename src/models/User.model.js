import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
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
  cardModel: { type: String },
  phoneNumber: { type: Number },
});

export default mongoose.model.users || mongoose.model("User", UserSchema);
