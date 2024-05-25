import React, { useState } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
const IntegerStep = ({ inputValue, onChange }) => {
  return (
    <Row>
      <Col span={12}>
        <Slider
          onChange={onChange}
          min={0}
          max={3}
          value={typeof inputValue === "number" ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={3}
          style={{
            margin: "0 16px",
          }}
          value={inputValue}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};
const CustomSlider = ({ inputValue, onChange }) => (
  <Space
    style={{
      width: "100%",
    }}
    direction="vertical"
  >
    <IntegerStep inputValue={inputValue} onChange={onChange} />
  </Space>
);
export default CustomSlider;
