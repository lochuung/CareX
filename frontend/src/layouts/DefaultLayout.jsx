import React from "react";
import Sidebar from "../components/global/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex ">
      <div className="">
        <Sidebar />
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default DefaultLayout;
