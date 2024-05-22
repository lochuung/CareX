"use client";
import Image from "next/image";
import SignInPage from "./auth/signin/page";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./home/page";
import AdminHomePage from "./admin/home/page";

export default function Home() {
  const token = localStorage?.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const currentUser = useStore((state) => state.currentUser);
  useEffect(() => {
    if (currentUser === null) {
      router.push("/auth/signin");
      router.refresh();
    }
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/v1/user`, {
          method: "GET",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setCurrentUser(data?.data);

        setLoading(false);

        router.push("/");
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    };

    fetchAPI();
  }, [token]);

  console.log(currentUser, "currentUser");

  return (
    <div className="">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <h1>Loading ... </h1>
        </div>
      ) : currentUser?.roles[0]?.name === "ADMIN" ? (
        <AdminHomePage />
      ) : currentUser?.roles[0]?.name === "USER" ? (
        <HomePage />
      ) : (
        currentUser === null && <SignInPage />
      )}
    </div>
  );
}
