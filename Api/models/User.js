import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  gender: {
    required: true,
    type: String,
    enum: ["male", "female"],
  },
  genderPreference: {
    required: true,
    type: String,
    enum: ["male", "female", "both"],
  },
  bio: {
    default: "",
    type: String,
  },
  image: {
    default: "",
    type: String,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{timestamps:true});
/*userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});*/
userSchema.methods.matchPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};
userSchema.statics.checkIfExists = async function (name, email) {
  return await this.findOne({
    $or: [{ name }, { email }],
  });
};
const User = mongoose.model("User", userSchema);
export default User;
