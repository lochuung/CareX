import React from "react";
import { Button, Result } from "antd";
import { div } from "@tensorflow/tfjs";
const DoneExercise = ({ discover }) => (
  <div className="h-screen items-center justify-center flex">
    <Result
      status="success"
      title="So burning!"
      subTitle="You make it today."
      extra={[
        <Button
          onClick={() => {
            discover();
          }}
          type="primary"
          key="console"
        >
          Discover more
        </Button>,
      ]}
    />
  </div>
);
export default DoneExercise;
