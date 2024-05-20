import { Menubar } from "@/components";
import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex ">
      {/* Menu bar */}
      <div className="w-1/5 bg-gray-50 h-screen overflow-x-scroll">
        <Menubar />
      </div>
      <div className="w-4/5 bg-yellow-500 h-[500px]">{children}</div>
    </div>
  );
};

export default DefaultLayout;
