"use client";
import React, { useEffect, useState } from "react";
import { HiBackspace, HiPause } from "react-icons/hi";
import Webcam from "react-webcam";
import useYogaDetector from "@/hooks/useYogaDetector";
import Countdown from "@/components/Countdown";
import Tick from "@/hooks/useTicktimer";
import { formatTime } from "@/lib/utils";
import { Pause, PlayCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  FiArrowLeft,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiVideo,
} from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox";
function Yoga() {
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
  ] = useYogaDetector();
  const initialTime = 10;

  useEffect(() => {
    if (totalTimer == initialTime) {
      setIsDone(true);
    }
  }, [totalTimer]);

  return (
    <div class=" h-screen flex w-full">
      <div className="h-full flex flex-col justify-between">
        <div className="w-full flex gap-4 items-center p-2">
          <button className="rounded-xl border-[1px] p-2 text-2xl">
            <FiArrowLeft />
          </button>

          <div>
            <span className="border-[1px] rounded-xl p-2 m-2">Level 1</span>
            <span className="text-sky-400 border-[1px] rounded-xl p-2 m-2">
              +500 care points
            </span>
            <span className="text-red-400 border-[1px] rounded-xl p-2 m-2">
              30 seconds
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
            <Countdown
              duration={initialTime - totalTimer}
              original={initialTime}
            />
            <div className="shadow-sm border-[1px] bg-white w-full p-4 rounded-xl flex  items-center justify-center gap-4">
              <div className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-200 border-[1px] rounded-xl p-2">
                <button className="p-2 text-2xl rounded-xl ">
                  <FiPause />
                </button>
                <span>Dừng lại </span>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-200 border-[1px] rounded-xl p-2">
                <button className="p-2 text-2xl rounded-xl ">
                  <FiSkipForward />
                </button>
                <span>Bỏ qua </span>
              </div>
            </div>
          </>
        </div>
        <div className="">
          <div className="w-full px-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Bài tập này giúp gì cho mình?
                </AccordionTrigger>
                <AccordionContent>
                  Nó giúp bạn giải tỏa được căng thẳng ở bên trong tâm hồn mình
                  nhiều hơn.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="w-full flex">
            <ScrollArea className="h-[200px] m-2 flex rounded-md border p-4">
              {[...new Array(40)].map((item, _i) => (
                <div className="p-2 border-[1px] rounded-xl m-2 hover:bg-blue-100 cursor-pointer transition-all ease-in-out duration-50 ">
                  Step: {_i}. Đứng thẳng, hai chân hơi hẹp hơn vai, hai tay duỗi
                  thẳng
                </div>
              ))}
            </ScrollArea>
            <div className="m-2 flex items-center">
              <div className="flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-200 border-[1px] h-full rounded-xl p-2">
                <button className="text-2xl rounded-xl ">
                  <PlayCircle />
                </button>
                <span className="text-center">Video hướng dẫn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Yoga;
