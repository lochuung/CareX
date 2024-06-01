import React, { useState } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
const IntegerStep = ({ inputValue, onChange, min, max }) => {
  return (
    <Row>
      <Col span={12}>
        <Slider
          onChange={onChange}
          min={min}
          max={max}
          value={typeof inputValue === "number" ? inputValue : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={min}
          max={max} 
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
const CustomSlider = ({ inputValue, onChange, min, max }) => (
  <Space
    style={{
      width: "100%",
    }}
    direction="vertical"
  >
    <IntegerStep
      max={max}
      min={min}
      inputValue={inputValue}
      onChange={onChange}
    />
  </Space>
);
export default CustomSlider;
