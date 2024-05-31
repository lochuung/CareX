import React from "react";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
const App = () => (
  <div className="flex gap-4 h-full bg-red-400 justify-between">
    <Card
      bordered={false}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Statistic
        title="Active"
        precision={2}
        valueStyle={{
          color: "#3f8600",
        }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
    <Card
      bordered={false}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Statistic
        title="Active"
        precision={2}
        valueStyle={{
          color: "#3f8600",
        }}
        prefix={<ArrowUpOutlined />}
        suffix="%"
      />
    </Card>
  </div>
);
export default App;
