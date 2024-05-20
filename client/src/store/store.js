// src/store.js
import { create } from "zustand";

export const useStore = create((set) => ({
  role: "",
  setRole: (role) => set({ role }),
}));
