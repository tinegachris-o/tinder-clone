import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { UseAuthStore } from "./UseAuthStore";
export const useUserStore = create((set) => ({
  loading: false,
  authUser: null,
  updateProfile: async (data) => {
    try {
      set({ loading: true });
      const response = axiosInstance.put("/users/update", data);
      set({ authUser: response.data.user });
      UseAuthStore.getState().setAuthUser(response.data.user);
      toast.success("user'profile updated sucessfully");
    } catch (error) {
      toast.error(error.response.data.message || "error in updating the user ");
    } finally {
      set({ loading: false });
    }
  },
}));
