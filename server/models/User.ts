import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  surname: { type: String },
  phone: { type: String },
  czyAdmin: { type: Boolean },
});

const User = mongoose.model("User", userSchema);
export default User;
