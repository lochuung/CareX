import React, { useEffect, useState } from "react";
import { Table } from "antd";
const NutritionTable = ({ nutritions }) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    let newData = [];
    let newColumns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Value",
        dataIndex: "value",
      },
    ];
    Object.entries(nutritions).forEach(([key, value], index) => {
      newData.push({
        key: index,
        name: key,
        value: value,
      });
    });
    setData(newData);
    setColumns(newColumns);
  }, [nutritions]);
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        y: 100,
      }}
    />
  );
};
export default NutritionTable;
