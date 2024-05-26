import React, { useEffect, useState } from "react";
// import DefaultLayout from "../layouts/DefaultLayout";
import { Space, Collapse, Table, Image, Button } from "antd";

const RecommendFood = ({ meals }) => {
  const [mealByTime, setMealByTime] = useState(null);
  const columns = [
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
    },
    {
      title: "FatContent",
      dataIndex: "fatcontent",
      key: "fatcontent",
    },
    {
      title: "SaturatedFatContent",
      dataIndex: "saturatedfatcontent",
      key: "saturatedfatcontent",
    },
    {
      title: "CholesterolContent",
      dataIndex: "cholesterolcontent",
      key: "cholesterolcontent",
    },
    {
      title: "SodiumContent",
      dataIndex: "sodiumcontent",
      key: "sodiumcontent",
    },
    {
      title: "VarbohydrateContent",
      dataIndex: "varbohydratecontent",
      key: "varbohydratecontent",
    },
    {
      title: "FibaerContent",
      dataIndex: "fibaercontent",
      key: "fibaercontent",
    },
    {
      title: "SugarContent",
      dataIndex: "sugarcontent",
      key: "sugarcontent",
    },
    {
      title: "ProteinContent",
      dataIndex: "proteincontent",
      key: "proteincontent",
    },
  ];
  const dataSource = [
    {
      calories: "472.1000",
      fatcontent: "17,9000",
      saturatedfatcontent: "3.5000",
      cholesterolcontent: "46.4000",
      sodiumcontent: "351.1000",
      varbohydratecontent: "46.0000",
      fibaercontent: "4.7000",
      sugarcontent: "8.7000",
      proteincontent: "23.3000",
    },
  ];
  const detailsCalo = [
    {
      id: "1",
      label: "Chicken Cacciatore With Wine",
      ingredient: [
        "chicken breast halves",
        "salt",
        "pepper",
        "olive oil",
        "white mushroom",
      ],
      recipe_instructions: [
        "Rinse the chicken well and pat dry with paper towels.",
        "Season generously with salt and pepper on all sides.",
        "In a large frying pan over medium-high heat, heat 2 T olive oil.",
      ],

      cook_time: "60min",
      preparation_time: "30min",
      total: "90min",
    },
  ];

  useEffect(() => {
    let times = ["breakfast", "lunch", "dinner"];
    let mealByTime = {};
    meals.forEach((meal, index) => {
      mealByTime[times[index]] = meal;
    });
  }, [meals]);
  return (
    <div className="flex flex-row p-4 gap-4 justify-around border-2 text-left">
      <div className="breakfast max-w-sm">
        <div className="font-bold text-lg">
          <p>Breakfast</p>
        </div>
        <div className="w-full">
          {detailsCalo.map((item) => {
            var name = item.label;
            return (
              <Space direction="vertical">
                <Collapse
                  collapsible="header"
                  defaultActiveKey={["1"]}
                  style={{ width: "370px" }}
                  items={[
                    {
                      key: "1",
                      label: name,
                      children: (
                        <div className="space-y-4">
                          <div className="max-w-xs">
                            <div className="flex justify-center">
                              <Image
                                width={150}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              />
                            </div>
                            <p className="font-bold text-lg text-center">
                              Nutritional Values (g):
                            </p>
                            <Table
                              dataSource={dataSource}
                              columns={columns}
                              size="small"
                              scroll={{ x: 240 }}
                              pagination={false}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Ingredients:
                            </p>
                            <ul>
                              {item.ingredient.map((ing) => {
                                return <li>• {ing}</li>;
                              })}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Recipe Instructions:
                            </p>
                            <ul>
                              {item.recipe_instructions.map((rep) => {
                                return <li>• {rep}</li>;
                              })}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Cooking and Preparation Time:
                            </p>
                            <ul>
                              <li>• Cook time : {item.cook_time}</li>
                              <li>
                                • Preparation Time : {item.preparation_time}
                              </li>
                              <li>• Total Time : {item.total}</li>
                            </ul>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </Space>
            );
          })}
        </div>
      </div>
      <div className="lunch">
        <div className="font-bold text-lg">
          <p>Lunch</p>
        </div>
        <div className="w-full">
          {detailsCalo.map((item) => {
            var name = item.label;
            return (
              <Space direction="vertical">
                <Collapse
                  collapsible="header"
                  defaultActiveKey={["1"]}
                  style={{ width: "370px" }}
                  items={[
                    {
                      key: "1",
                      label: name,
                      children: (
                        <div className="space-y-4">
                          <div className="max-w-xs">
                            <div className="flex justify-center">
                              <Image
                                width={150}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              />
                            </div>
                            <p className="font-bold text-lg text-center">
                              Nutritional Values (g):
                            </p>
                            <Table
                              dataSource={dataSource}
                              columns={columns}
                              size="small"
                              scroll={{ x: 240 }}
                              pagination={false}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Ingredients:
                            </p>
                            <ul>
                              {item.ingredient.map((ing) => {
                                return <li>• {ing}</li>;
                              })}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Recipe Instructions:
                            </p>
                            <ul>
                              {item.recipe_instructions.map((rep) => {
                                return <li>• {rep}</li>;
                              })}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Cooking and Preparation Time:
                            </p>
                            <ul>
                              <li>• Cook time : {item.cook_time}</li>
                              <li>
                                • Preparation Time : {item.preparation_time}
                              </li>
                              <li>• Total Time : {item.total}</li>
                            </ul>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </Space>
            );
          })}
        </div>
      </div>
      <div className="dinner">
        <div className="font-bold text-lg">
          <p>Dinner</p>
        </div>
        <div className="w-full">
          {detailsCalo.map((item) => {
            var name = item.label;
            return (
              <Space direction="vertical">
                <Collapse
                  collapsible="header"
                  defaultActiveKey={["1"]}
                  style={{ width: "370px" }}
                  items={[
                    {
                      key: "1",
                      label: name,
                      children: (
                        <div className="space-y-4">
                          <div className="max-w-xs">
                            <div className="flex justify-center">
                              <Image
                                width={150}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              />
                            </div>
                            <p className="font-bold text-lg text-center">
                              Nutritional Values (g):
                            </p>
                            <Table
                              dataSource={dataSource}
                              columns={columns}
                              size="small"
                              scroll={{ x: 240 }}
                              pagination={false}
                            />
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Ingredients:
                            </p>
                            <ul>
                              {item.ingredient.map((ing) => {
                                return <li>• {ing}</li>;
                              })}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Recipe Instructions:
                            </p>
                            <ul>
                              {item.recipe_instructions.map((rep) => {
                                return <li>• {rep}</li>;
                              })}
                            </ul>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-center">
                              Cooking and Preparation Time:
                            </p>
                            <ul>
                              <li>• Cook time : {item.cook_time}</li>
                              <li>
                                • Preparation Time : {item.preparation_time}
                              </li>
                              <li>• Total Time : {item.total}</li>
                            </ul>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </Space>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecommendFood;
