import { Progress, Tag } from "antd";
import { useRouter } from "next/navigation";
import Router from "next/router";
import React, { useMemo } from "react";

const WorkshopItem = ({ ...item }) => {
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

  const startTime = "2024-05-23T02:07:46.112492";
  const formattedDateTime = formatDateTime(startTime);

  console.log(formattedDateTime); // Output: "23/05/2024 02-07-46"

  const formatCurrency = (amount) => {
    // Chuyển đổi chuỗi thành số nguyên
    let number = parseInt(amount, 10);

    // Kiểm tra nếu số hợp lệ
    if (isNaN(number)) {
      return "Invalid number";
    }

    // Sử dụng phương thức toLocaleString để định dạng số
    return number.toLocaleString("en-US");
  };

  const percent = useMemo(() => {
    const maxPercent = item?.countMember;
    const currentPercent = 233;

    return (Math.floor(currentPercent / maxPercent) * 100).toFixed(2);
  }, []);

  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/workshops/${item?.id}`)}
      className="w-[300px] border-[1px] border-gray-300 rounded-xl hover:bg-blue-100 hover:text-white cursor-pointer"
    >
      <div className="">
        <img
          src="https://i.pinimg.com/564x/16/89/bc/1689bcf22a03911bf3115f71b0103f33.jpg"
          alt=""
          className="w-full h-[200px] object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col my-3 p-3 gap-2">
        <p className="text-gray-800 text-lg font-semibold">
          {item?.nameWorkshop}
        </p>

        <div className="">
          <p className="text-gray-500 text-sm font-semibold">{item?.address}</p>
        </div>

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
