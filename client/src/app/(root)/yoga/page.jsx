"use client";
import "@tensorflow/tfjs-backend-webgpu";
import React from "react";
import Webcam from "react-webcam";
import "./Yoga.css";
import useYogaDetector from "@/hooks/useYogaDetector";

function Yoga() {
  const [webcamRef, canvasRef] = useYogaDetector();

  return (
    <div className="yoga-container">
      <div>
        <Webcam
          width="640px"
          height="480px"
          id="webcam"
          ref={webcamRef}
          style={{
            position: "absolute",
            left: 120,
            top: 100,
            padding: "0px",
          }}
        />
        <canvas
          ref={canvasRef}
          id="my-canvas"
          width="640px"
          height="480px"
          style={{
            position: "absolute",
            left: 120,
            top: 100,
            zIndex: 1,
          }}
        ></canvas>
      </div>
    </div>
  );
}

export default Yoga;
