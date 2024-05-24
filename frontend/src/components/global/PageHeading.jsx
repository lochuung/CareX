import React from "react";

const PageHeading = ({ title, desc }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-800 font-bold text-2xl">{title}</h1>

      <p className="text-gray-600 font-medium text-md">{desc}</p>
    </div>
  );
};

export default PageHeading;
