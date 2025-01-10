import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { disconnectSocket, initializeSocket } from "../components/socket/socket.client.js";
//import { disconnectSocket,initializeSocket } from "../components/socket/socket.client.js";
export const UseAuthStore = create((set) => ({
  authUser: null,
  checkingAuthUser: true,
  loading: false,
  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
            initializeSocket(res.data.user._id);

      toast.success("Account created sucessfully");
    } catch (error) {
      toast.error(error.response.data.message || "something went wrong");
    } finally {
      set({ loading: false });
    }
  },
  login: async (loginData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("/auth/login", loginData);
      console.log("user is logging in", response);
      let user = response.data.user;
      let token = response.data.token;
      if (!token || !user) {
        throw new Error("user does not have Api or token");
      }
      set({ authUser: user });
      initializeSocket(response.data.user._id);
      toast.success("welcome back 🚀");
      console.log(`this is logged user called ${user.name}`);
    } catch (error) {
      console.error("error logging in", error.message);
      toast.error(error.response.data.message || "error in login");
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      if (res.status === 200) set({ authUser: null });
      disconnectSocket()
      toast.success("user logged out successfully🚀🚀  ");
    } catch (error) {
      res.send("error in logout functionality");
      toast.error(error.response.data.messsage);
    }
  },
  checkAuthUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
            initializeSocket(response.data.user._id);

      //console.log("this is authenticated data", response.data);
      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuthUser: false });
    }
  },
  setAuthUser:(user)=>set({
    authUser:user
  })
}));
