"use client";
import Image from "next/image";
import SignInPage from "./auth/signin/page";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomePage from "./home/page";
import AdminHomePage from "./admin/home/page";

export default function Home() {
  const { role } = useStore();
  console.log(role, "role");

  const router = useRouter();

  useEffect(() => {
    if (role === null || role === undefined || role === "") {
      router.push("/auth/signin");
    } else if (role === "admin") {
      return <AdminHomePage />;
    } else if (role === "user") {
      return <HomePage />;
    }
  }, [role]);

}
