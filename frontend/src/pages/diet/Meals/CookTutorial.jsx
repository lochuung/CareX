import React, { useState } from "react";
import { Badge, Collapse, Descriptions, Space, Steps } from "antd";
const CookTutorial = ({ ingredients, instructions }) => {
  const colors = [
    "pink",
    "red",
    "yellow",
    "orange",
    "cyan",
    "green",
    "blue",
    "purple",
    "geekblue",
    "magenta",
    "volcano",
    "gold",
    "lime",
  ];

  const circularPick = (index) => {
    return colors[index % colors.length];
  };
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };

  const items = [
    {
      key: "1",
      label: "Ingredients",
      children: (
        <div className="max-h-[200px] overflow-auto">
          <Space direction="vertical">
            {ingredients.map((item, index) => (
              <Badge key={item} color={circularPick(index)} text={item} />
            ))}
          </Space>
        </div>
      ),
    },
    {
      key: "2",
      label: "How to cook?",
      children: (
        <div className="h-[400px] overflow-auto">
          <Steps
            current={current}
            onChange={onChange}
            direction="vertical"
            items={instructions.map((item, index) => {
              return {
                title: `Step ${index + 1}`,
                description: item,
              };
            })}
          />
        </div>
      ),
    },
  ];
  return <Collapse items={items} defaultActiveKey={["1"]} />;
};
export default CookTutorial;
