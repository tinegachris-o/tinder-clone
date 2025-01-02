import mongoose from "mongoose"
import User from "../models/User.js"
const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required:true
  },
},{timestamps:true});
const message= mongoose.model("Message",messageSchema)
export default message
