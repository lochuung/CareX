import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      isLogged: false,
      setIsLogged: (status) => set({ isLogged: status }),
      currentUser: null,
      getInformation: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          return;
        }
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          set({ isLogged: true, currentUser: data.data });
        } else if (res.status === 401) {
          set({ isLogged: false, currentUser: null });
          const navigate = useNavigate();
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      },
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
