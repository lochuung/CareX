import { convertToPercentage, formatTime } from "@/lib/utils";
import { div } from "@tensorflow/tfjs";
import React from "react";
import { Progress } from "./ui/progress";

const Countdown = ({ duration, original }) => {
  return (
    <div className="shadow-sm border-[1px] bg-white w-full p-4 rounded-xl flex flex-col items-center justify-center gap-4">
      <div className=" rounded-xl">
        <span className="text-4xl font-bold">{formatTime(duration)}</span>
      </div>
      <Progress
        className="bg-red-400 text-blue-500 bg-blackA6 "
        value={convertToPercentage(duration, 0, original)}
      />
    </div>
  );
};

export default Countdown;
