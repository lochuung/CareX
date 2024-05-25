import React, { useState } from "react";
import { Radio } from "antd";

const RadioGroup = ({ options }) => {
  const [value, setValue] = useState(options[0].value);
  const onChange = ({ target: { value } }) => {
    console.log("radio2 checked", value);
    setValue(value);
  };
  return <Radio.Group options={options} onChange={onChange} value={value} />;
};
export default RadioGroup;
