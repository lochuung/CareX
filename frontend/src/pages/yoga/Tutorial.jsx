import React, { useState } from "react";
import { Divider, Steps } from "antd";
import { createJSONStorage } from "zustand/middleware";
const Tutorial = ({ instructions }) => {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };

  const instructionsToSteps = (instructions) => {
    return instructions.map((instruction, index) => {
      return {
        title: `Step ${index + 1}`,
        description: instruction,
      };
    });
  };

  return JSON.stringify(instructions);
};
export default Tutorial;
