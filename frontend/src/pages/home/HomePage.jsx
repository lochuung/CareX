import React, { useEffect, useState } from "react";
import { Line, Radar } from "@ant-design/charts";
import { useNavigate } from "react-router-dom";
import { HiStar } from "react-icons/hi";
import MoodSegment from "./MoodSegment";
import Thought from "./Thought";
import { FaHeart } from "react-icons/fa6";
import RewardCard from "./RewardCard";

import { Button, Card, Image, Modal, Progress } from "antd";
import { useFeelingStorage } from "../../store/feeling";
import { useDietStore } from "../../store/diet";
import { useUserStore } from "../../store/user";
const { Meta } = Card;
const App = () => {
  const [mood, setMood] = useState(1);
  const [thought, setThought] = useState("");

  const resetMood = () => {
    setMood(1);
    setThought("");
  };
  const [open, setOpen] = useState(false);
  const showModal = () => {
    resetMood();
    setOpen(true);
  };

  const { feelings, addFeeling } = useFeelingStorage((state) => state);

  const handleOk = () => {
    addFeeling({ mood, thought, date: new Date() });
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [wordCloud, setWordCloud] = useState(null);
  // Make word cloud
  const getWordCloud = async (data) => {
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_ML_API_URL}/wordcloud/make`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data }),
      }
    );
    let blob = await res.blob();
    let url = URL.createObjectURL(blob);
    setWordCloud(url);
  };
  const [data, setData] = useState(null);

  const [configRadar, setConfigRadar] = useState(null);
  useEffect(() => {
    if (!data) return;
    let newConfigRadar = {
      data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
      xField: "name",
      yField: "star",
      area: {
        style: {
          fillOpacity: 0.2,
        },
      },
      scale: {
        x: {
          padding: 0.5,
          align: 0,
        },
        y: {
          nice: true,
        },
      },
      axis: {
        x: {
          title: false,
          grid: true,
        },
        y: {
          gridAreaFill: "rgba(0, 0, 0, 0.04)",
          label: false,
          title: false,
        },
      },
    };
    setConfigRadar(newConfigRadar);
  }, [data]);
  const moodMap = {
    1: "😊 fine",
    2: "🤣 wonderful",
    0: "😭 not gud",
  };
  useEffect(() => {
    if (!feelings) return;
    let newData = {};
    feelings.forEach((element) => {
      newData[element.mood] = (newData[element.mood] || 0) + 1;
    });

    setData(
      Object.keys(newData).map((key) => ({
        name: moodMap[key],
        star: newData[key],
      }))
    );
  }, [feelings]);

  const [yogaExercises, setYogaExercises] = useState([]);
  const { healthInfo, setHealthInfo } = useDietStore((state) => state);
  const fetchExercise = async () => {
    const access_token = localStorage.getItem("access_token");
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/yoga-workouts`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (res.status === 400) {
      throw new Error(`Email or password is incorrect`);
    }
    if (!res.ok) {
      throw new Error(`Error while trying to login`);
    }
    const data = await res.json();
    setYogaExercises(
      data.data.filter((exercise) => exercise.description !== "NO_DESCRIPTION")
    );
  };
  const [practiceHistory, setPracticeHistory] = useState([]);
  const fetchPracticeHistory = async () => {
    const access_token = localStorage.getItem("access_token");
    const res = await fetch(
      `${import.meta.env.VITE_PUBLIC_API_URL}/api/v1/yoga-workouts/history`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const data = await res.json();
    setPracticeHistory(data.data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchPracticeHistory();
  }, []);
  useEffect(() => {
    fetchExercise();
  }, []);

  const isPracticed = (exercise) => {
    if (!practiceHistory) return false;
    return practiceHistory.some(
      (history) => history.yogaWorkout.id === exercise.id
    );
  };

  let getCount = (yogaExercises, practiceHistory) => {
    if (!yogaExercises || !practiceHistory) return 0;
    let newCount = 0;
    for (let i = 0; i < yogaExercises.length; i++) {
      if (isPracticed(yogaExercises[i])) newCount++;
    }
    return newCount;
  };
  useEffect(() => {
    if (!feelings) return;
    let data = feelings.map((feeling) => feeling.thought).join(" ");
    getWordCloud(data);
  }, [feelings]);

  const { currentUser } = useUserStore((state) => state);

  const getFirstName = (user) => {
    if (!user) return "";
    return user?.fullName?.split(" ")[0] || "there.";
  };

  return (
    <div class="grid grid-cols-7 gap-4 w-full h-screen">
      <Modal
        className="text-2xl"
        open={open}
        title="I am here to listen to you!"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <MoodSegment mood={mood} setMood={(mood) => setMood(mood)} />
        <Thought
          thought={thought}
          setThought={(thought) => setThought(thought)}
        />
      </Modal>
      <div className="grid-cols-1 col-span-2">
        <div class="grid grid-rows-5 gap-4 w-full h-full">
          <div className="grid-row-1 row-span-2  items-center justify-center flex">
            <Card
              className="bg-gradient-to-b  from-blue-500 text-center items-center justify-center flex font-bold to-blue-600"
              bordered={false}
              style={{
                position: "relative",
                height: "100%",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <FaHeart className="absolute bottom-0 text-8xl right-0 m-[-1.3rem] mb-[-1.5rem] shadow-lg  text-red-200 rotate-[-15deg]" />
              <div className="flex flex-col gap-6">
                <p className="text-4xl text-white">
                  Hello, {getFirstName(currentUser)}!{" "}
                </p>
                <span className="text-xl text-white">
                  How do you feel now? <br />
                </span>
                <Button
                  type="primary"
                  onClick={() => {
                    showModal();
                  }}
                >
                  Tell me{" "}
                </Button>
              </div>
            </Card>
          </div>
          <div className=" grid-row-1 row-span-3">
            {" "}
            <Card
              className="bg-gradient-to-b from-orange-400 to-orange-500  text-center items-center justify-center flex font-bold "
              bordered={false}
              style={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
                width: "100%",
              }}
            >
              {" "}
              <div className="absolute bottom-0 text-8xl right-0 m-[-1rem] mb-[-1rem] shadow-lg  text-red-200 rotate-[-15deg]">
                🔥
              </div>
              <RewardCard
                history={[
                  {
                    date: "30/5/2024",
                  },
                  {
                    date: "28/5/2024",
                  },
                ]}
                futureReward={[
                  {
                    date: "1/6/2024",
                  },
                ]}
              />
            </Card>
          </div>
        </div>
      </div>
      <div className=" grid-cols-2 col-span-5">
        <div class="grid grid-rows-3 gap-4 w-full h-full">
          <div className=" grid-row-1 row-span-1 ">
            <Card
              className="bg-gradient-to-b bg-lime-400 to-lime-500   text-center h-full w-full"
              bordered={false}
              style={{
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="flex gap-2 w-full">
                <Card title="Practice Yoga" className="w-full" bordered={false}>
                  <div className=" flex gap-4 items-center justify-center">
                    <Progress
                      type="circle"
                      percent={Math.floor(
                        (getCount(yogaExercises, practiceHistory) /
                          yogaExercises.length) *
                          100
                      )}
                      steps={{
                        count: 9,
                        gap: 4,
                      }}
                      trailColor="rgba(0, 0, 0, 0.06)"
                      strokeWidth={20}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate("/yoga");
                      }}
                    >
                      Practice now
                    </Button>
                  </div>
                </Card>
                <Card title="BMI" className="w-full " bordered={false}>
                  <div className="flex items-center justify-between flex-col h-full gap-1">
                    {!healthInfo ? (
                      <p className="text-xl font-bold flex gap-4 flex-col">
                        Tell us about you <br />
                        <Button
                          type="primary"
                          onClick={() => navigate("/diet")}
                        >
                          Calculate BMI
                        </Button>
                      </p>
                    ) : (
                      <p className="text-xl font-bold flex flex-col">
                        <div className="flex flex-col gap-2">
                          <span className="text-4xl text-blue-500 font-bold">
                            {healthInfo?.bmi} kg/m²
                          </span>
                          <p className="text-center text-base ">
                            Health: 18.5 kg/m² - 25 kg/m².
                          </p>
                          <Button
                            type="primary"
                            onClick={() => navigate("/bmiresult")}
                          >
                            Best food for you
                          </Button>{" "}
                        </div>
                      </p>
                    )}
                  </div>
                </Card>
                <Card title="Reward" className="w-full" bordered={false}>
                  <div className="flex items-center justify-center gap-2 text-3xl font-bold flex-col">
                    <div className="flex items-center py-4">
                      <HiStar className="text-orange-400" />
                      <span className="text-orange-600">500 points</span>
                    </div>
                    <div className="text-sm font-light flex gap-2 items-center">
                      <span>= a yoga clamp</span>
                      <Button
                        type="m-2"
                        className="bg-orange-600 text-white hover:bg-orange-500"
                      >
                        Exchange
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
          <div className=" grid-row-1 row-span-2">
            <Card
              className="bg-gradient-to-b   text-center items-center justify-center flex font-bold "
              bordered={false}
              style={{
                position: "relative",
                overflow: "hidden",
                height: "100%",
                width: "100%",
              }}
            >
              <div className="flex justify-between flex-col">
                {/* Create placehodler iamge */}
                <p className="text-2xl">Your current state</p>

                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-full flex-col gap-4 w-full flex items-center justify-center">
                    <Image className="rounded-xl" src={wordCloud} />
                  </div>
                  <div className="h-full flex-col gap-4 w-full flex items-center justify-center">
                    <Radar {...configRadar} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
