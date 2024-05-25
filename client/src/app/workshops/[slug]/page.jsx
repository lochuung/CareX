"use client";
import { PageHeading } from "@/components";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Table, Tag } from "antd";
import React from "react";

const WorkshopDetail = () => {
  const data = {
    nameWorkshop: "Workshop 1",
    address: "HCM",
    countMember: 100,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, vel porro, eum beatae doloribus laborum eveniet fugiat quidem quo accusantium quaerat tenetur neque eaque sunt sed minus? Necessitatibus, fuga mollitia! ",
    dataMember: [
      {
        id: 1,
        nameUser: "Nguyễn Văn A",
        timestamp: "12/2/2024 23:00:00",
        status: "Chưa đăng ký",
      },
      {
        id: 2,
        nameUser: "Nguyễn Văn A",
        timestamp: "12/2/2024 23:00:00",
        status: "Chưa đăng ký",
      },
      {
        id: 3,
        nameUser: "Nguyễn Văn A",
        timestamp: "12/2/2024 23:00:00",
        status: "Chưa đăng ký",
      },
      {
        id: 4,
        nameUser: "Nguyễn Văn A",
        timestamp: "12/2/2024 23:00:00",
        status: "Chưa đăng ký",
      },
    ],
  };

  const columns = [
    { key: 1, dataIndex: "id", label: "id" },
    {
      key: "nameUser",
      dataIndex: "nameUser",
      label: "Name User",
    },
    { key: "timestamp", dataIndex: "timestamp", label: "Thời gian" },
    {
      key: "status",
      dataIndex: "status",
      label: "Trạng thái",
      render: (status) => {
        let color = "";
        if (status === "Chưa đăng ký") {
          color = "red";
        } else {
          color = "green";
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button className="text-white bg-blue-500 px-3 py-1 rounded-lg">
              Edit
            </button>
            <button className="text-white bg-red-500 px-3 py-1 rounded-lg">
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      <PageHeading title={data?.nameWorkshop} desc={data.description} />

      <div className="">
        <div className="flex flex-col justify-between gap-3">
          <div className="w-[600px] flex flex-col gap-3">
            <div className="mt-4">
              <img
                src="https://i.pinimg.com/564x/16/89/bc/1689bcf22a03911bf3115f71b0103f33.jpg"
                alt=""
                className="w-full h-[300px] object-cover rounded-xl"
              />
            </div>

            <div className="flex flex-col my-3 p-3 gap-2">
              <p className="text-gray-800 text-lg font-semibold">
                {data?.nameWorkshop}
              </p>

              <div className="">
                <p className="text-gray-500 text-sm font-semibold">
                  {data?.address}
                </p>
              </div>

              <div className="">
                <p className="text-gray-500 text-sm font-semibold">
                  12/2/2024 12:00 - 14:00
                </p>
              </div>
            </div>
          </div>

          <div className="w-[800px]">
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <p className="text-gray-800 text-lg font-semibold">
                  Thành viên
                </p>
                <Tag
                  color="geekblue-inverse"
                  className="text-gray-800 text-lg font-semibold"
                >
                  {data?.countMember}
                </Tag>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-xl">
                  Danh sách thành viên đã đăng ký tham gia Workshop
                </h1>
                <Table dataSource={data?.dataMember} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default WorkshopDetail;
