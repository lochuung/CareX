import React from "react";

import { Avatar, Card, Divider, Skeleton, Switch } from "antd";
const { Meta } = Card;
const SubCollection = () => {
  return (
    <div>
      {/* <Switch checked={!loading} onChange={onChange} /> */}
      <span className="text-4xl flex items-center bg-red-400  text-white">
        Level 1
      </span>

      <div className="flex flex-wrap  gap-2 max-h-[500px] overflow-auto p-4">
        {[...new Array(255)].map((item) => {
          return (
            <Card>
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const Collection = () => {
  const collections = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced",
  };

  return (
    <>
      <SubCollection />
      <SubCollection />
      <SubCollection />
    </>
  );
};
export default Collection;
