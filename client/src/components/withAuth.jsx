"use client";
import { useStore } from "@/store/store";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = (Component) => {
  return function WithAuth(props) {
    const currentUser = useStore((state) => state?.currentUser);

    const role = currentUser?.roles[0]?.name?.toLowerCase();
    const pathName = usePathname();
    useEffect(() => {
      if (role?.includes("user") && pathName.includes("admin")) {
        redirect("/notfound");
      }

      if (!currentUser) {
        redirect("/auth/signin");
      }
    }, []);

    return <Component {...props} />;
  };
};

export default withAuth;
