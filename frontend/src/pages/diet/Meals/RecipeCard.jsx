import { Card, Image, Table, Tabs } from "antd";
import { ImPower } from "react-icons/im";
import React from "react";
import { FaClock } from "react-icons/fa6";
import NutritionTable from "./NutritionTable";
import { formatTime } from "../../../utils/utils";
import CookTutorial from "./CookTutorial";

const RecipeCard = ({ currentRecipe }) => {
  const nutritionColumns = [
    "FatContent",
    "SaturatedFatContent",
    "CholesterolContent",
    "SodiumContent",
    "CarbohydrateContent",
    "FiberContent",
    "SugarContent",
    "ProteinContent",
  ];

  return (
    <Card
      hoverable
      style={{
        width: 320,
      }}
      cover={
        <Image
          className="object-cover"
          width={320}
          height={240}
          src={currentRecipe.image_link}
        />
      }
    >
      <div className="flex gap-2 flex-col">
        <h1 className="font-bold text-lg">{currentRecipe.Name}</h1>
        <div className="flex items-center justify-start">
          <button className="border-[1px] flex items-center gap-2 px-2 py-1 rounded-xl text-green-500 font-bold">
            <span className="">{formatTime(currentRecipe.TotalTime)}</span>
            <FaClock />
          </button>
        </div>
      </div>
      <Tabs
        items={[
          {
            key: "1",
            label: "Nutrition Facts",
            children: (
              <div className="">
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center justify-start gap-2 font-bold text-orange-500">
                    <span>Total calories </span>
                    <button className="border-[1px] flex items-center gap-2 px-2 py-1 rounded-xl  font-bold">
                      <span className="">
                        {formatTime(currentRecipe.TotalTime)}
                      </span>
                      <ImPower />
                    </button>
                    <span>kJ</span>
                  </div>
                  <NutritionTable
                    nutritions={nutritionColumns.reduce((acc, cur) => {
                      acc[cur] = currentRecipe[cur];
                      return acc;
                    }, {})}
                  />
                </div>
              </div>
            ),
          },
          {
            key: "2",
            label: "Cooking Tutorial",
            children: (
              <div className="flex flex-col gap-2">
                <CookTutorial
                  ingredients={currentRecipe.RecipeIngredientParts}
                  instructions={currentRecipe.RecipeInstructions}
                />
              </div>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default RecipeCard;
