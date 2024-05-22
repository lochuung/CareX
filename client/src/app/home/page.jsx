"use client";
import withAuth from "@/components/withAuth";
import DefaultLayout from "@/layouts/DefaultLayout";
import React from "react";

const HomePage = () => {
  return <DefaultLayout/>;
};

export default withAuth(HomePage);
