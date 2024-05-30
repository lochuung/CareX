import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
const { Meta } = Card;
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

  console.log(item, "item");

  return (
    <div className="">
      <Card
        onClick={() => navigate(`/workshop/${item?.id}`)}
        style={{
          width: 300,
        }}
        cover={<img alt="example" src={item?.imageUrl} />}
      >
        <Meta title={item?.name} />
        <p className="text-gray-500 truncate columns-4">{item?.description}</p>
        <div className="flex flex-col gap-2 w-fit mt-3">
          <div className="flex gap-2">
            <h1 className="font-bold text-md">Open: </h1>
            <Tag color="green">{formatDateTime(item?.startTime)}</Tag>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold text-md">Close: </h1>
            <Tag color="yellow">{formatDateTime(item?.endTime)}</Tag>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkshopItem;
