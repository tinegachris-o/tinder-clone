import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { getSocket } from "../components/socket/socket.client";
import { UseAuthStore } from "../Store/UseAuthStore";

export const useMessageStore = create((set) => ({
  messages: [],
  loading: true,
  sendMessage: async (receiverId, content) => {
    try {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            _id: Date.now(),
            sender: UseAuthStore.getState().authUser._id,
            content,
          },
        ],
      }));
      const res = await axiosInstance.post("/messages/send", {
        receiverId,
        content,
      });
      console.log("message sent", res.data);
    } catch (error) {
      toast.error(error.res.data.message || "something went wrong");
    }
  },
  getMessages: async (userId) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.get(
        `/messages/conversation/${userId}`
      );
      set({ messages: response.data.messages, loading: false });
    } catch (error) {
      console.log("error in getting messages");
      set({ messages: [] });
    } finally {
      set({ loading: false });
    }
  },
  subscribeToMessages: () => {
    const socket = getSocket();
    socket.on("newMessage", ({ message }) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });
  },

  unsubscribeFromMessages: () => {
    const socket = getSocket();
    socket.off("newMessage");
  },
}));
