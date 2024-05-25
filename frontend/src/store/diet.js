import { create } from "zustand";

const useDietStore = create((set) => ({
  person: null,
  setPerson: (person) => set({ person }),
}));

export default useDietStore;
