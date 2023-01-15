import React, { useState } from "react"
import './Tamagotchi.css'
import healthIcon from '../../images/healthIcon.png'
import staminaIcon from '../../images/staminaIcon.png'
import star from '../../images/star.png'
import tama from '../../images/tama.png'
import {Image, ProgressBar} from "react-bootstrap";
import {Character} from "../../character";

const Tamagotchi = (props) => {
  const [tasks, setTasks] = useState(36)
  return (
      <div className="tama_container">
          <div className="stats">
              <Image className="stat-icons" src={"strength.svg"}/>
              <ProgressBar now={props.strength} className="stat-progress" variant="danger" label={`${props.strength}%`}/>
              <Image className="stat-icons" style={{marginTop: "10px"}} src={"game-icons_health-potion.svg"}/>
              <ProgressBar now={props.health} style={{marginTop: "10px"}} className="stat-progress" variant="success"
                           label={`${props.health}%`}/>
          </div>
        {/*<div className="tama">*/}
        {/*  <img src={tama} alt="" />*/}
        {/*</div>*/}
        {/*  <div className="character_in_tama">*/}
{/*?              <Character*/}
{/*                         costumeImg1={props.costumeImg1}*/}
{/*                         hatImg1={props.hatImg1}*/}
{/*                         weaponImg1={props.weaponImg1}/>*/}
{/*          </div>*/}
      </div>
  )
}

export default Tamagotchi