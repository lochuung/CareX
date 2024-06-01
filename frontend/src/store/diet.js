import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useDietStore = create(
  persist(
    (set, get) => ({
      person: null,
      setPerson: (person) => set({ person }),
      healthInfo: null,
      setHealthInfo: (healthInfo) => set({ healthInfo }),
    }),
    {
      name: "diet-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
