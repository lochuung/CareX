"use client";
import { poster } from "@/app/utils/Images";
import { PageHeading } from "@/components";
import DefaultLayout from "@/layouts/DefaultLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Divider, Drawer, Modal, Table, Tabs, Tag } from "antd";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import useFilterTable from "@/hooks/useFilterTable";
import withAuth from "@/components/withAuth";

const AdminWorkshopPage = () => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState({ modal: false, data });
  const [getColumnSearchProps] = useFilterTable();
  const handleAction = (type, data) => {
    setAction({ [type]: !action[type], data: data });
  };

  const colums = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <div className="">
            <img
              src={image}
              className="w-[80px] h-[40px] object-cover rounded-md"
              alt=""
            />
          </div>
        );
      },
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      ...getColumnSearchProps("userId"),
    },
    {
      title: "Name",
      dataIndex: "nameWorkshop",
      key: "nameWorkshop",
      ...getColumnSearchProps("nameWorkshop"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Start",
      dataIndex: "startTime",
      key: "startTime",
      ...getColumnSearchProps("startTime"),
    },
    {
      title: "End",
      dataIndex: "endTime",
      key: "endTime",
      ...getColumnSearchProps("endTime"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
      render: (status) => {
        let color = "";
        if (status == "Not yet occurred") {
          color = "orange-inverse";
        } else if (status == "In progress") {
          color = "green-inverse";
        } else {
          color = "red-inverse";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleAction("modal", record)}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              <FaEye />
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md">
              <MdCancel />
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const fetchAPI = async () => {
      const data = [];
      for (let i = 0; i < 100; i++) {
        const randomStatus = ["Not yet occurred", "In progress", "Completed"];
        data.push({
          id: i,
          image:
            "https://i.pinimg.com/564x/be/5e/de/be5ede1b4d4aa148236a88c2055ebe57.jpg",
          userId: "user" + i,
          nameWorkshop: "workshop" + i,
          address: "address" + i,
          startTime: "12/2/2024 15:00",
          endTime: "12/2/2024 16:00",
          status: randomStatus[Math.floor(Math.random() * randomStatus.length)],
        });
      }
      setData(data);
    };
    fetchAPI();
  }, []);
  return (
    <DefaultLayout>
      <div className="">
        <PageHeading
          title="Workshop Management"
          desc="Handle user registration for the workshop"
        />

        {/* List button */}
        <div className=""></div>

        <div className="">
          <Table columns={colums} dataSource={data} />
        </div>

        <Drawer
          width={600}
          open={action.modal}
          onClose={() => handleAction("modal")}
        >
          <BoxInfoWorkshop data={action?.data} />
        </Drawer>
      </div>
    </DefaultLayout>
  );
};

const BoxInfoWorkshop = ({ data }) => {
  const items = [
    { label: "Infomation", key: 1, children: "" },
    { label: "Member", key: 2, children: "" },
  ];
  return (
    <div className="">
      <Tabs
        defaultActiveKey="1"
        size={"large"}
        type="card"
        style={{
          marginBottom: 32,
        }}
        items={items}
      />
      <h1 className="text-center flex font-bold text-xl justify-center my-4">
        Workshop Infomation
      </h1>
      <div className="">
        <Image
          src={data?.image}
          alt=""
          width={200}
          height={200}
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-md font-medium">User ID: </p>
          <p>{data?.userId}</p>
        </div>
        <Divider />
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-md font-medium">Workshop Name: </p>
          <p>{data?.nameWorkshop}</p>
        </div>
        <Divider />
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-md font-medium">Address: </p>
          <p>{data?.address}</p>
        </div>
        <Divider />
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-md font-medium">Start Time: </p>
          <p>{data?.startTime}</p>
        </div>
        <Divider />
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-md font-medium">End Time: </p>
          <p>{data?.endTime}</p>
        </div>
        <Divider />
        <div className="flex items-center gap-3">
          <p className="text-gray-500 text-md font-medium">Status: </p>
          <p
            className={`text-white p-1 text-sm rounded-md font-semibold ${
              data?.status === "Not yet occurred"
                ? "bg-orange-500"
                : data?.status === "In progress"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {data?.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkshopPage;
