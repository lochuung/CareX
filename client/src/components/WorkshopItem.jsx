import { Progress, Tag } from "antd";
import { useRouter } from "next/navigation";
import Router from "next/router";
import React, { useMemo } from "react";

const WorkshopItem = ({ ...item }) => {
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
      onClick={() => router.push(`/workshops/923193219`)}
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
            12/2/2024 12:00 - 14:00
          </Tag>
        </div>

        <div className="">
          <Progress percent={percent} />
        </div>
      </div>
    </div>
  );
};

export default WorkshopItem;
