import Message from "../models/Message.js";
import {getConnectedUsers} from "../socket/socket.server.js"
export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });
    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverId).emit("newMessage", {
        message: newMessage,
      });
    }
    res.status(200).json({ message: "message sent successfully", newMessage });
  } catch (error) {
    console.error("error in sending messsage route", error);
    res
      .status(500)
      .json({ message: "error in sending messsage route", success: false });
  }
};
//TODO APP


export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort("createdAt");
    res
      .status(200)
      .json({ message: "messages retrived successfully", messages });
  } catch (error) {
    console.log("error in reriving messages", error);
    res.status(500).json({ message: "error in retriving messages", error });
  }
};
