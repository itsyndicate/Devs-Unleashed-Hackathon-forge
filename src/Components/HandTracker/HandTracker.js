import React from "react"
import './HandTracker.css';
import Webcam from 'react-webcam';
import {useRef, useEffect} from 'react';

// do not remove this unused import, there will be an error
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Tamagotchi from "../Tamagotchi/Tamagotchi"
import handDefault from '../../images/handDefault.png'
import handGrabb from '../../images/handGrab.png'
import taskk from  '../../images/task.png'
import tamag from '../../images/player.png'

function HandTracker() {
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

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
        typeof webCamRef.current !== "undefined" &&
        webCamRef.current !== null &&
        webCamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webCamRef.current.video;
      const videoWidth = webCamRef.current.video.videoWidth;
      const videoHeight = webCamRef.current.video.videoHeight;

      // Set video width
      webCamRef.current.video.width = videoWidth;
      webCamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);

      onResults(hand)
    }
  }

  useEffect(()=>{runHandpose()},[]);

  const onResults = (hand)=>{
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
    const tamagotchi = new Image
    tamagotchi.src = tamag


    canvasCtx.save();
    canvasCtx.clearRect(0,0,canvasElement.width,canvasElement.height);

    let handClosed = false;
    if(hand.length > 0){
      let xs = 0;
      let ys = 0;

      for (const landmark of hand[0].landmarks) {
        xs += landmark[0];
        ys += landmark[1];
      }

      handClosed = isHandClosed(hand[0].landmarks)

      xs = xs * (canvasRef.current.width / webCamRef.current.video.width) / numberOfTips;
      ys = ys * (canvasRef.current.height / webCamRef.current.video.height) / numberOfTips;

      canvasCtx.fillStyle = "blue";
      if (handClosed) {
        const handCenter = {
          x: xs - handWidth / 2,
          y: ys - handWidth / 4,
        }
        canvasCtx.drawImage(tamagotchi, 70, 260)
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

    canvasCtx.fillStyle = "red";
    canvasCtx.drawImage(task,taskCoordinates.x, taskCoordinates.y);
    canvasCtx.restore();
  }

  const isHandClosed = (landmarks) => {
    for (let i = 0; i < 4; i++) {
      if (landmarks[tipIds[i]][1] < landmarks[tipIds2[i]][1]) {
        return false;
      }
    }

    return true;
  }
  const setIsTaskTaken = (taskCenter, handCenter) => {
    console.log(taskCenter)
    console.log(handCenter)
    let distance = Math.sqrt(Math.pow(taskCenter.x - handCenter.x, 2) + Math.pow(taskCenter.y - handCenter.y, 2)) - 100
    console.log(distance)
    isTaskTaken = distance <= handWidth / 2 + taskWidth / 2;
  }

  return(
      <div className="container-hand-tracker">
        <div className="main-container">
          <div className='canvas'>
            <div className="canvas_container">
              <Tamagotchi/>
              <Webcam
                  ref={webCamRef}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                  }}
              />
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