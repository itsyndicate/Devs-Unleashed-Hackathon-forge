import React, { useState } from "react"
import './HandTracker.css';
import Webcam from 'react-webcam';
import {Hands} from '@mediapipe/hands'; 
import * as handss from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import {useRef, useEffect} from 'react';
import { drawLandmarks } from '@mediapipe/drawing_utils';
import Tamagotchi from "../Tamagotchi/Tamagotchi"
import handDefault from '../../images/handDefault.png'
import handGrabb from '../../images/handGrab.png'
import taskk from  '../../images/task.png'
// import handJS from '../hand'
function HandTracker(props) {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  const numberOfTips = 21;
  const tipIds = [8, 12, 16, 20];
  const tipIds2 = [5, 9, 13, 17];

  const handHeight = 300;
  const handWidth = 150;

  const taskWidth = 150;
  let taskCoordinates = {x: 1000, y: 50};

  let isTaskTaken = false;
  let difference_between_centers = {x: 0, y: 0}
  let camera = null;
  const onResults = (results)=>{
    // const videoWidth = webCamRef.current.video.videoWidth;
    // const videoHeight = webCamRef.current.video.videoHeight;
    const videoWidth = 1273;
    const videoHeight = 541;
    //Sets height and width of canvas 
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement =  canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    const handDef = new Image
    handDef.src = handDefault
    const handGrab = new Image
    handGrab.src = handGrabb
    const task = new Image
    task.src = taskk

    canvasCtx.save();
    canvasCtx.clearRect(0,0,canvasElement.width,canvasElement.height);

    let handClosed = false;
    if(results.multiHandLandmarks){
      let xs = 0;
      let ys = 0;
      for(const landmarks of results.multiHandLandmarks) {
        //drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS,
          //{color: "#00FF00", lineWidth: 2});
        //drawLandmarks(canvasCtx, landmarks, {color: "#00ffd0", lineWidth: 1}); //#5d0db8 purple
        for (const landmark of landmarks) {
          xs += landmark.x;
          ys += landmark.y;
        }

        handClosed = isHandClosed(landmarks)
      }
      xs = (numberOfTips - xs) * canvasRef.current.width / numberOfTips;
      ys *= canvasRef.current.height / numberOfTips;

      canvasCtx.fillStyle = "blue";
      if (handClosed) {
        const handCenter = {
          x: xs - handWidth / 2,
          y: ys - handWidth / 4,
        }

        canvasCtx.drawImage(handGrab,handCenter.x, handCenter.y);
        if (isTaskTaken) {
          taskCoordinates = {
            x: handCenter.x - difference_between_centers.x,
            y: handCenter.y - difference_between_centers.y
          }
        } else {
          setIsTaskTaken({
            x: taskCoordinates.x - taskWidth / 2,
            y: handCenter.y - (taskCoordinates.y - taskWidth / 2)
          }, handCenter)

          difference_between_centers = {
            x: handCenter.x - (taskCoordinates.x),
            y: handCenter.y - (taskCoordinates.y),
          }
        }
      } else {
        canvasCtx.drawImage(handDef, xs - handWidth / 2, ys - handHeight / 2);
        isTaskTaken = false;
      }
    }
    const numOfTasks = props.tasks
    canvasCtx.fillStyle = "red";
    canvasCtx.drawImage(task,taskCoordinates.x, taskCoordinates.y);

    canvasCtx.restore();
  }
  const isHandClosed = (landmarks) => {
    for (let i = 0; i < 4; i++) {
      if (landmarks[tipIds[i]].y < landmarks[tipIds2[i]].y) {
        return false;
      }
    }

    return true;
  }
  const setIsTaskTaken = (taskCenter, handCenter) => {
    let distance = Math.sqrt(Math.pow(taskCenter.x - handCenter.x, 2) + Math.pow(taskCenter.y - handCenter.y, 2)) - 100
    console.log(distance)
    isTaskTaken = distance <= handWidth / 2 + taskWidth / 2;
  }
  useEffect(()=> {
      // const hands = new Hands({
      //   locateFile:(file)=>{
      //     return handss + file;
      //   },
      // });
    // const hands = new Hands(handss)

    const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }});


    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.7
    });

    hands.onResults(onResults);
    if (typeof webCamRef.current !== 'undefined' && webCamRef.current !== null) {
      camera = new cam.Camera(webCamRef.current.video, {
        onFrame: async () => {
          await hands.send({image: webCamRef.current.video})
        }
      });
      camera.start()
    }
  },[])
  return(
    <div className="container-hand-tracker">
      <div className="main-container">
        <h1>Please Use One Hand</h1>
        <Webcam ref={webCamRef} />
        <div className='canvas'>
          <div className="canvas_container">
            <Tamagotchi/>
            <canvas
              ref={canvasRef}
              className="output-canvas"
            >
            </canvas>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HandTracker;