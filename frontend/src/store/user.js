import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      isLogged: false,
      setIsLogged: (status) => set({ isLogged: status }),
      currentUser: null,
      logout: () => {
        set({ isLogged: false, currentUser: null });
        localStorage.removeItem("access_token");
      },
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
