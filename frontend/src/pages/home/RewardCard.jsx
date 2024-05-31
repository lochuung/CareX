import React from "react";
import { Flex, Progress } from "antd";
const App = () => (
  <div className="p-8 flex flex-col gap-4  bg-white rounded-xl ">
    <div className="text-2xl">Current streak</div>
    <Progress
      type="circle"
      percent={75}
      strokeColor={"#f56a00"}
      format={(percent) => `${percent} Days`}
    />
  </div>
);
export default App;
