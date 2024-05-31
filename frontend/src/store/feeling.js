import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFeelingStorage = create(
  persist(
    (set, get) => ({
      feelings: [],
      addFeeling: (feeling) => set({ feelings: [...get().feelings, feeling] }),
      removeFeeling: (index) =>
        set({
          feelings: get().feelings.filter((_, i) => i !== index),
        }),
      clearFeelings: () => set({ feelings: [] }),
    }),
    {
      name: "feel-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
