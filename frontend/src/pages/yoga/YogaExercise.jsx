import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { toast } from "react-toastify";
import {
  FaChalkboardTeacher,
  FaFileVideo,
  FaQuestion,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import Webcam from "react-webcam";

import { FiArrowLeft, FiSkipForward } from "react-icons/fi";
import useYogaDetector, { ID_TO_CLASS } from "../../hooks/useYogaDetector";
import Countdown from "../../components/Countdown";
import { Collapse, Image, Modal } from "antd";
import {
  HiOutlineQuestionMarkCircle,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import Tutorial from "./Tutorial";
import { formatTime } from "../../utils/utils";
const YogaExercise = ({
  stop,
  skip,
  next,
  setComplete,
  currentExercise,
  isPracticed,
}) => {
  const [
    webcamRef,
    canvasRef,
    isLoading,
    currentTime,
    poseTime,
    bestPerform,
    totalTimer,
    accuracy,
    resetTimer,
    isDone,
    setIsDone,
    setCurrentPose,
  ] = useYogaDetector();

  const [initialTime, setInitialTime] = useState(currentExercise.duration);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    setCurrentPose(ID_TO_CLASS[currentExercise.id]);
    setInitialTime(currentExercise.duration);
    resetTimer();
    setIsDone(false);

    if (isPracticed(currentExercise)) {
      modal.confirm({
        title: "Start Practice",
        content:
          "You have practiced this exercise before, do you want to start again?",
        onCancel() {
          setComplete();
        },
      });
    }
  }, [currentExercise]);

  useEffect(() => {
    if (isDone) {
      // Move to next exercise
      toast.success("Great! Let's move to the next.");

      next();
    }
  }, [isDone]);

  useEffect(() => {
    if (!currentExercise) return;
    if (!initialTime) return;
    if (totalTimer == initialTime) {
      setIsDone(true);
    }
  }, [totalTimer]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const items = [
    {
      key: "1",
      label: "Benefits of this pose ",
      children: (
        <div>
          <Image src={currentExercise?.imageUrl} />
          <p>{currentExercise?.description}</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <FaQuestion />
          <span>How to do this pose</span>
        </div>
      ),
      children: (
        <div className="max-h-[400px] overflow-auto">
          <Tutorial instructions={currentExercise?.instruction} />
        </div>
      ),
      showArrow: false,
    },
  ];

  return (
    <div class=" h-screen flex w-full">
      {contextHolder}
      <div className="h-full flex flex-col justify-between">
        <div className="w-full flex gap-4 items-center p-2">
          <button
            className="rounded-xl border-[1px] p-2 text-2xl"
            onClick={() => {
              stop();
            }}
          >
            <FiArrowLeft />
          </button>

          <div>
            <span className="border-[1px] rounded-xl p-2 m-2">
              Level {currentExercise.level}
            </span>
            <span className="text-sky-400 border-[1px] rounded-xl p-2 m-2">
              +{currentExercise.point} care points
            </span>
            <span className="text-red-400 border-[1px] rounded-xl p-2 m-2">
              {formatTime(currentExercise.duration)}
            </span>
          </div>
        </div>
        <div class="rounded-xl px-24 w-auto h-full  flex items-center justify-center">
          <div
            className="relative"
            style={{
              borderRadius: "10px",
              width: "640px",
              height: "480px",
            }}
          >
            {isLoading && (
              <div className="absolute z-[99] flex-col gap-4 w-full h-full bg-[rgba(255,255,255,.2)] rounded-xl flex items-center justify-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                <div className="bg-white p-4 rounded-xl">Đang tải mô hình</div>
              </div>
            )}

            <div className={`${isLoading ? "hidden" : ""}`}>
              <Webcam
                width="640px"
                height="480px"
                id="webcam"
                ref={webcamRef}
                style={{
                  borderRadius: "10px",
                  position: "absolute",
                  padding: "0px",
                }}
              />
              <canvas
                ref={canvasRef}
                id="my-canvas"
                width="640px"
                height="480px"
                style={{
                  borderRadius: "10px",
                  position: "absolute",
                  zIndex: 1,
                }}
              ></canvas>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col h-full  ">
        <div className="p-4  flex justify-center gap-4">
          <>
            <Countdown duration={totalTimer} original={initialTime} />

            <div className="shadow-sm border-[1px] bg-white w-full p-4 rounded-xl flex  items-center justify-center gap-4">
              <div
                className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-200 border-[1px] rounded-xl p-2"
                onClick={() => {
                  setShowVideoModal(true);
                }}
              >
                <button className="p-2 text-2xl rounded-xl ">
                  <FaChalkboardTeacher />
                </button>
                <span>Tutorial</span>
              </div>
              <div
                onClick={() => {
                  skip();
                }}
                className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-200 border-[1px] rounded-xl p-2"
              >
                <button className="p-2 text-2xl rounded-xl ">
                  <FiSkipForward />
                </button>
                <span>Skip </span>
              </div>
            </div>
          </>
        </div>
        <Modal
          title={`Tutorial: ${currentExercise.name} (Team prepared video - Source: Youtube)`}
          centered
          width={"auto"}
          open={showVideoModal}
          onOk={() => setShowVideoModal(false)}
          onCancel={() => setShowVideoModal(false)}
        >
          <ReactPlayer
            className="rounded-xl"
            url={currentExercise.videoUrl}
            controls
          />
        </Modal>
        <div className="">
          <div className="w-full px-4">
            <Collapse defaultActiveKey={["1"]} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YogaExercise;
