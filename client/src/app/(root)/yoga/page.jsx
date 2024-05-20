"use client";
import FILE from "@/app/root/yoga/model.json";
import "@tensorflow/tfjs-backend-webgpu";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import "./Yoga.css";
import { POINTS, keypointConnections } from "@/constants/detector";
import { drawPoint, drawSegment } from "@/lib/utils";

let skeletonColor = "rgb(255,255,255)";

let flag = false;

function Yoga() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
  };

  const main = async () => {
    let interval;
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel("/ml/model.json");

    interval = setInterval(() => {
      detectPose(detector, poseClassifier);
    }, 100);
    function get_center_point(landmarks, left_bodypart, right_bodypart) {
      let left = tf.gather(landmarks, left_bodypart, 1);
      let right = tf.gather(landmarks, right_bodypart, 1);
      const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
      return center;
    }

    function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
      let hips_center = get_center_point(
        landmarks,
        POINTS.LEFT_HIP,
        POINTS.RIGHT_HIP
      );
      let shoulders_center = get_center_point(
        landmarks,
        POINTS.LEFT_SHOULDER,
        POINTS.RIGHT_SHOULDER
      );
      let torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
      let pose_center_new = get_center_point(
        landmarks,
        POINTS.LEFT_HIP,
        POINTS.RIGHT_HIP
      );
      pose_center_new = tf.expandDims(pose_center_new, 1);

      pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
      // return: shape(17,2)
      let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
      let max_dist = tf.max(tf.norm(d, "euclidean", 0));

      // normalize scale
      let pose_size = tf.maximum(
        tf.mul(torso_size, torso_size_multiplier),
        max_dist
      );
      return pose_size;
    }

    function normalize_pose_landmarks(landmarks) {
      let pose_center = get_center_point(
        landmarks,
        POINTS.LEFT_HIP,
        POINTS.RIGHT_HIP
      );
      pose_center = tf.expandDims(pose_center, 1);
      pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
      landmarks = tf.sub(landmarks, pose_center);

      let pose_size = get_pose_size(landmarks);
      landmarks = tf.div(landmarks, pose_size);
      return landmarks;
    }

    function landmarks_to_embedding(landmarks) {
      // normalize landmarks 2D
      landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
      let embedding = tf.reshape(landmarks, [1, 34]);
      return embedding;
    }
    const detectPose = async (detector, poseClassifier) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        let notDetected = 0;
        const video = webcamRef.current.video;
        const pose = await detector.estimatePoses(video);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        try {
          const keypoints = pose[0].keypoints;
          let input = keypoints.map((keypoint) => {
            if (keypoint.score > 0.4) {
              if (
                !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
              ) {
                drawPoint(ctx, keypoint.x, keypoint.y, 8, "rgb(255,255,255)");
                let connections = keypointConnections[keypoint.name];
                try {
                  connections.forEach((connection) => {
                    let conName = connection.toUpperCase();
                    drawSegment(
                      ctx,
                      [keypoint.x, keypoint.y],
                      [
                        keypoints[POINTS[conName]].x,
                        keypoints[POINTS[conName]].y,
                      ],
                      skeletonColor
                    );
                  });
                } catch (err) {}
              }
            } else {
              notDetected += 1;
            }
            return [keypoint.x, keypoint.y];
          });
          if (notDetected > 4) {
            skeletonColor = "rgb(255,255,255)";
            return;
          }
          const processedInput = landmarks_to_embedding(input);
          const classification = poseClassifier.predict(processedInput);

          classification.array().then((data) => {
            const classNo = CLASS_NO["Tree"];
            let rate = data[0][classNo];
            if (rate > 0.97) {
              skeletonColor = "rgb(0,255,0)";
            } else {
              skeletonColor = "rgb(255,255,255)";
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    };
  };

  useEffect(() => {
    // Set the backend to WebGPU and wait for the module to be ready.
    tf.setBackend("webgpu").then(() => main());
  }, []);

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
