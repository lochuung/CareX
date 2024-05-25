// src/store.js
import { create } from "zustand";

export const useStore = create((set) => ({
  role: "",
  currentUser: null,
  setRole: (role) => set({ role }),
  setCurrentUser: (currentUser) => set({ currentUser }),
}));
