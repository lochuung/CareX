import React, { useState } from "react";
import { Descriptions, Divider, Steps } from "antd";
import { createJSONStorage } from "zustand/middleware";
const Tutorial = ({ instructions }) => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };

  const instructionsToSteps = (instructions) => {
    let list = instructions.split("\\n");
    let steps = [];
    list.forEach((item, index) => {
      steps.push({
        title: `Step ${index + 1}`,
        description: item,
      });
    });

    return steps;
  };

  return (
    <Steps
      current={current}
      onChange={onChange}
      direction="vertical"
      items={[...instructionsToSteps(instructions)]}
    />
  );
};
export default Tutorial;
