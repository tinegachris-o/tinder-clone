import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export const UseAuthStore = create((set) => ({
  authUser: null,
  checkingAuthUser: true,
  loading: false,
  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/signup", signupData);
      set({ authUser: res.data.user });
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
      console.log('user is logging in',response);
        set({ authUser: response.data.user });
        toast.success("user logged in successfully");
      <Link to="/">Home page</Link>

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
      toast.success("user logged out successfully");
    } catch (error) {
      res.send("error in logout functionality");
      toast.error(error.response.data.messsage);
    }
  },
  checkAuthUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      console.log("this is authenticated data", response.data);
      set({ authUser: response.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuthUser: false });
    }
  },
}));
