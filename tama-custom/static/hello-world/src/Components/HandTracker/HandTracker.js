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
import Task from "./Task"

function HandTracker(props) {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  const numberOfTips = 21;
  const tipIds = [8, 12, 16, 20];
  const tipIds2 = [5, 9, 13, 17];

  const handHeight = 320;
  const handWidth = 300;

  const taskWidth = 150;


  let tasks = []
  for (let i = 0; i < props.tasks.length; i++){
    if (i === 0){
      tasks[i] = new Task(taskk, handWidth, {x: 1000, y: 100})
    } else if (i === 1){
      tasks[i] = new Task(taskk, handWidth, {x: 1000, y: 250})
    } else if (i === 2) {
      tasks[i] = new Task(taskk, handWidth, {x: 1000, y: 400})
    }
  }
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
    const videoHeight = 941;
    //Sets height and width of canvas
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement =  canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    const handDef = new Image
    handDef.src = handDefault
    const handGrab = new Image
    handGrab.src = handGrabb

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


      xs = canvasRef.current.width - xs * (canvasRef.current.width / webCamRef.current.video.width) / numberOfTips;
      ys = ys * (canvasRef.current.height / webCamRef.current.video.height) / numberOfTips;


      if (handClosed) {
        const handCenter = {
          x: xs - handWidth / 2,
          y: ys - handWidth / 4,
        }

        canvasCtx.drawImage(handGrab,handCenter.x, handCenter.y);
        for (let i = 0; i < props.tasks.length; i++){
          if (tasks.length > 0){
            if (tasks[i].isTaskTaken){
              // console.log('handCenterX ' + handCenter.x + 'difference_between_centersX ' + tasks[i].difference_between_centers.x)
              // console.log('handCenterY ' + handCenter.y + 'difference_between_centersY ' + tasks[i].difference_between_centers.y)
              tasks[i].taskCoordinates = {
                x: handCenter.x - tasks[i].difference_between_centers.x,
                y: handCenter.y - tasks[i].difference_between_centers.y
              }
            } else {
              tasks[i].setIsTaskTaken({
                x: tasks[i].taskCoordinates.x - taskWidth / 2,
                y: handCenter.y - (tasks[i].taskCoordinates.y - taskWidth / 2)
              }, handCenter)

              tasks[i].difference_between_centers = {
                x: handCenter.x - (tasks[i].taskCoordinates.x),
                y: handCenter.y - (tasks[i].taskCoordinates.y),
              }
            }
          }
        }

      } else {
        canvasCtx.drawImage(handDef, xs - handWidth / 2, ys - handHeight / 2);
        if (tasks.length > 0){
          for (let i = 0; i < props.tasks.length; i++){
            tasks[i].isTaskTaken = false;
          }
        }
      }


    }

    if (tasks.length > 0){
      for (let i = 0; i < props.tasks.length; i++){
        canvasCtx.fillStyle = "blue";
        canvasCtx.font = '32px serif'
        canvasCtx.fillText(props.tasks[i], tasks[i].taskCoordinates.x, tasks[i].taskCoordinates.y)
        canvasCtx.drawImage(tasks[i].image, tasks[i].taskCoordinates.x, tasks[i].taskCoordinates.y)
      }
    }
    const updateHP = async () => {
      let updatedHP = props.health + 10
      let update = {
          account_id: props.account_id,
          project_id: props.project_id,
          health: updatedHP
      }
      const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi/`, {
        method: "PUT",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(update)
      });
    }
    if (tasks.length > 0){
      if (tasks[0].taskCoordinates.x <= 270 && tasks[0].taskCoordinates.y >= 250){
        console.log('BINGO')
        tasks = []
        updateHP()
      }
    }
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

  return(
      <div className="container-hand-tracker">
        <div className="main-container">
          <div className="handWarning">
            <h1>Please Use One Hand</h1>
          </div>
          <div className='canvas'>
            <div className="canvas_container">
              <Tamagotchi strength={props.strength} health={props.health} costumeImg1={props.costumeImg1} hatImg1={props.hatImg1} weaponImg1={props.weaponImg1}/>
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