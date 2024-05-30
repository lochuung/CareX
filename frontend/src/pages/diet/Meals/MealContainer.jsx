import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Search from "antd/es/input/Search";
const MealContainer = ({ recipes }) => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <>
      <div className="flex items-end w-full justify-end p-4">
        <Search
          placeholder="Keyword (e.c. chicken, salad, ...)"
          allowClear
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className="max-w-xl"
          enterButton="Search"
          size="large"
        />
      </div>
      <div className="flex flex-wrap gap-4 max-h-[1024px] overflow-auto">
        {recipes &&
          recipes
            .filter((item) =>
              item.Name.toLowerCase().includes(searchKey.toLowerCase())
            )
            .map((item) => {
              return <RecipeCard currentRecipe={item} />;
            })}
      </div>
    </>
  );
};
export default MealContainer;
