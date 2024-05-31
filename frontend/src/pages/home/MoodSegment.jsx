import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Flex, Segmented } from "antd";
const App = ({ mood, setMood }) => {
  const adviceByMood = {
    0: {
      text: "I'm here to listen to you! 🤗",
      color: "orange",
    },
    1: {
      text: "I'm glad to hear that! 😊",
      color: "green",
    },
    2: {
      text: "That's great! 😄",
      color: "blue",
    },
  };
  const getColor = (value) => {
    return `text-${value}-500`;
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <div className="py-4 text-xl font-bold">What's your current mood?</div>
        <span className={`font-bold ${getColor(adviceByMood[mood].color)}`}>
          {adviceByMood[mood].text}
        </span>
      </div>

      <Segmented
        value={mood}
        onChange={(value) => setMood(value)}
        options={[
          {
            label: (
              <div
                style={{
                  padding: 4,
                }}
              >
                <div className="text-2xl">😥</div>
                <div>Not good</div>
              </div>
            ),
            value: 0,
          },
          {
            label: (
              <div
                style={{
                  padding: 4,
                }}
              >
                <div className="text-2xl">😊</div>
                <div>I'm fine</div>
              </div>
            ),
            value: 1,
          },
          {
            label: (
              <div
                style={{
                  padding: 4,
                }}
              >
                <div className="text-2xl">🤣</div>
                <div>Couldn't be happier</div>
              </div>
            ),
            value: 2,
          },
        ]}
      />
    </div>
  );
};
export default App;
