import { FaCheckCircle, FaClock, FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { BsArrowRepeat, BsPlay } from "react-icons/bs";
import { formatTime } from "../../utils/utils";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Image,
  Progress,
  Skeleton,
  Switch,
  Flex,
} from "antd";
import TabCard from "./TabCard";

const { Meta } = Card;
const SubCollection = ({
  isPracticed,
  attr,
  converter,
  data,
  selectCollectionHandler,
}) => {
  const getProgress = () => {
    let total = data.length;
    let practiced = data.filter((item) => isPracticed(item)).length;
    return (practiced / total) * 100;
  };
  return (
    <div className="border-[1px] rounded-xl m-2">
      {/* <Switch checked={!loading} onChange={onChange} /> */}
      <div className="flex items-center justify-between">
        <span className="text-2xl flex items-center rounded-lg p-2 m-1 text-gray-600  font-bold">
          {converter(attr)}
        </span>
        <Flex
          vertical
          gap="small"
          style={{
            width: 300,
          }}
        >
          <Progress percent={getProgress()} />
        </Flex>
        {getProgress() == 100 ? (
          <Button
            className="flex items-center justify-between gap-2 bg-green-500 hover:bg-green-600 m-2  text-white font-bold"
            type="m-2"
            onClick={() => selectCollectionHandler(attr)}
          >
            <span>Practice again</span>
            <BsArrowRepeat />
          </Button>
        ) : (
          <Button
            className="flex items-center justify-between gap-2  m-2  text-white font-bold"
            type="primary m-2"
            onClick={() => selectCollectionHandler(attr)}
          >
            <span>Practice now</span>
            <BsPlay />
          </Button>
        )}
      </div>
      <Divider />
      <div className="flex flex-wrap  gap-4 max-h-[500px] overflow-auto p-2">
        {data.map((item) => {
          if (item.description == "NO_DESCRIPTION") return null;
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
                  src={item.imageUrl}
                />
              }
            >
              <div className="flex gap-2">
                <h1 className="font-bold text-lg">{item.name}</h1>
                <button>
                  {
                    // Check if the item has been practiced
                    isPracticed(item) === true ? (
                      <Badge
                        count={
                          <FaCheckCircle
                            style={{
                              color: "#52c41a",
                            }}
                          />
                        }
                      ></Badge>
                    ) : (
                      ""
                    )
                  }
                </button>
              </div>
              <TabCard
                items={[
                  {
                    key: "1",
                    label: "What is it?",
                    children: (
                      <>
                        <span>{item.description}</span>
                      </>
                    ),
                  },
                  {
                    key: "2",
                    label: "Details",
                    children: (
                      <>
                        <div className="flex gap-2">
                          <button className="border-[1px] flex items-center gap-2 px-2 py-1 rounded-xl font-bold text-blue-500">
                            <span>Duration: {formatTime(item.duration)}</span>
                            <FaClock />
                          </button>
                          <button className="border-[1px] flex items-center gap-2 px-2 py-1 rounded-xl text-orange-400 font-bold">
                            <span className="">Points: {item.point}</span>
                            <FaStar />
                          </button>
                        </div>
                      </>
                    ),
                  },
                ]}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const Collection = ({
  isPracticed,
  data,
  converter,
  deriveAttr,
  selectCollectionHandler,
}) => {
  const [collection, setCollection] = useState({});

  const dervieByAttr = (data, attr) => {
    // Loop through data
    let newCollection = {};
    data.forEach((item) => {
      // Check if the attribute exists in the collection
      if (newCollection[item[attr]]) {
        // If it does, add the item to the collection
        newCollection[item[attr]].push(item);
      } else {
        // If it doesn't, create a new array with the item
        newCollection[item[attr]] = [item];
      }
    });

    setCollection(newCollection);
    console.log({ newCollection });
  };

  useEffect(() => {
    dervieByAttr(data, deriveAttr);
  }, [data]);

  return (
    <div>
      {Object.entries(collection).map(([key, value]) => {
        return (
          <SubCollection
            isPracticed={isPracticed}
            selectCollectionHandler={selectCollectionHandler}
            converter={converter}
            attr={key}
            key={key}
            data={value}
          />
        );
      })}
    </div>
  );
};
export default Collection;
