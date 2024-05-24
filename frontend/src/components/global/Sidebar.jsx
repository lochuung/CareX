import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const link = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "workshop",
      path: "/workshop",
    },
    {
      name: "yoga",
      path: "/yoga",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {link.map((item) => (
        <div onClick={() => navigate(item?.path)} className="bg-yellow-300 p-2">
          <h1>{item?.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
