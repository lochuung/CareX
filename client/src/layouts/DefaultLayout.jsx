import { Header, Menubar } from "@/components";
import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex ">
      {/* Menu bar */}
      <div className="w-1/5 bg-white h-screen ">
        <Menubar />
      </div>
      <div className="w-4/5  h-[500px] flex flex-col gap-3">
        <div className="w-full border-b border-gray-200 py-3">
          <Header />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
