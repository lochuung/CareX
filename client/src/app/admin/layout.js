"use client";
import DefaultLayout from "@/layouts/DefaultLayout";
import { useStore } from "@/store/store";
import { Suspense, useEffect } from "react";

export default function DashboardLayout({ children }) {
  const currentUser = useStore((state) => state.currentUser);
  useEffect(() => {
    alert(JSON.stringify(currentUser));
  }, []);
  return currentUser ? (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </DefaultLayout>
  ) : (
    <div>Ladoing ....</div>
  );
}
