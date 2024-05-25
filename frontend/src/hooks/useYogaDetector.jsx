import { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-webgpu";

import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import { POINTS, keypointConnections } from "../constants/detector";
import useTicktimer from "./useTicktimer";

export function drawSegment(ctx, [mx, my], [tx, ty], color) {
  ctx.beginPath();
  ctx.moveTo(mx, my);
  ctx.lineTo(tx, ty);
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function drawPoint(ctx, x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

export const formatTime = (time) => {
  // Format time in seconds to MM:SS
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const convertToPercentage = (value, min, max) => {
  let percent = ((value - min) / (max - min)) * 100;
  // map percent to range 0-100
  // percentage is 0 to 1 in the range
  // multiple by 100 to get percentage
  return Math.min(100, Math.max(0, percent));
};

let skeletonColor = "rgb(255,255,255)";
let flag = false;

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

let interval;

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

export const ID_TO_CLASS = {
  1: "Chair",
  2: "Cobra",
  3: "Dog",
  4: "No_Pose",
  5: "Shoulderstand",
  6: "Traingle",
  7: "Tree",
  8: "Warrior",
};

const useYogaDetector = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [accuracy, setAccuracy] = useState(0);
  const [totalTimer, startTimer, pauseTimer, resetTimer, isTiming] =
    useTicktimer();

  const [isDone, setIsDone] = useState(false);

  const [currentPose, setCurrentPose] = useState("Tree");
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);

  useEffect(() => {
    // if isDone then pause the timer
    if (isDone) {
      pauseTimer();
    }
  }, [isDone]);

  useEffect(() => {
    if (accuracy > 0.97) {
      if (!flag) {
        if (!isTiming && !isDone) startTimer();
        setStartingTime(new Date(Date()).getTime());
        flag = true;
      }
      setCurrentTime(new Date(Date()).getTime());
      skeletonColor = "rgb(0,255,0)";
    } else {
      if (isTiming) {
        pauseTimer();
      }
      flag = false;
      skeletonColor = "rgb(255,255,255)";
    }
  }, [accuracy]);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
    resetTimer();
  }, [currentPose]);
  const [isLoading, setIsLoading] = useState(true);

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
          const classNo = CLASS_NO[currentPose];
          let rate = data[0][classNo];
          setAccuracy(rate);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const main = async () => {
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    const poseClassifier = await tf.loadLayersModel("/ml/model.json");
    setIsLoading(false);

    let interval = setInterval(() => {
      detectPose(detector, poseClassifier);
    }, 100);
  };

  useEffect(() => {
    tf.setBackend("webgpu").then(() => {
      main();
    });
  }, []);
  return [
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
  ];
};

export default useYogaDetector;
