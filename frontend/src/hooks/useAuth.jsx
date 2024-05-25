import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUserStore } from "../store/user";
import { toast } from "react-toastify";

function useAuth() {
  const [loading, setLoading] = useState(false);

  const { setCurrentUser, logout } = useUserStore((state) => state);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage?.getItem("access_token");
      if (token) {
        try {
          const options = {
            method: "GET",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };

          const res = await fetch(
            `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/user`,
            options
          );

          if (res.status === 200) {
            const data = await res.json();
            setCurrentUser(data?.data);
            setLoading(false);
          } else {
            throw new Error(`Expired token, please login again.`);
          }
        } catch (error) {
          toast.error(error.message);
          logout();
          setLoading(false);
        }
      } else {
        toast.error("You need to login first.");
        logout();
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { loading };
}

export default useAuth;
