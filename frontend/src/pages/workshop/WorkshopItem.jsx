import { Progress, Tag } from "antd";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const WorkshopItem = ({ ...item }) => {
  const navigate = useNavigate();
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div
      onClick={() => navigate(`/workshop/${item?.id}`)}
      className="w-[300px] border-[1px] border-gray-300 rounded-xl hover:shadow-lg hover:shadow-gray-300 hover:text-white cursor-pointer"
    >
      <div className="">
        <img
          src={
            item?.imageUrl ||
            "https://i.pinimg.com/564x/16/89/bc/1689bcf22a03911bf3115f71b0103f33.jpg"
          }
          alt=""
          className="w-full h-[200px] object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col my-3 p-3 gap-2">
        <p className="text-gray-800 text-lg font-semibold">{item?.name}</p>

        <div className="">
          <Tag
            color="gold-inverse"
            className="text-gray-500 text-sm font-semibold"
          >
            {formatDateTime(item?.startTime)}
          </Tag>
        </div>

        <div className="">
          <p className="text-gray-600 font-medium">{item?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkshopItem;
