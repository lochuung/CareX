import { convertToPercentage, formatTime } from "../utils/utils";
import { Progress } from "antd";
import React from "react";

const Countdown = ({ duration, original }) => {
  return (
    <div className="shadow-sm border-[1px] bg-white w-full p-4 rounded-xl flex flex-col items-center justify-center gap-4">
      <div className=" rounded-xl">
        <span className="text-blue-500 text-4xl font-bold">
          {formatTime(original - duration)}
        </span>
      </div>
      <Progress
        type="circle"
        percent={convertToPercentage(duration, 0, original)}
      />
    </div>
  );
};

export default Countdown;
