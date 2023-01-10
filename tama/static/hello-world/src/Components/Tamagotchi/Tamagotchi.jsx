import React, { useState } from "react"
import './Tamagotchi.css'
import healthIcon from '../../images/healthIcon.png'
import staminaIcon from '../../images/staminaIcon.png'
import star from '../../images/star.png'
import tama from '../../images/tama.png'
const Tamagotchi = () => {
  const [tasks, setTasks] = useState(36)
  return (
      <div className="tama_container">
        <div className="tama_tasks">
          Task eaten: {tasks}
        </div>
        <div className="tama_stats">

          <div className="health_stat">
            <div className="health_icon">
              <img src={healthIcon} alt="" />
            </div>
            <div className="health_bar"></div>
            <div className="health_back" id='tamaHealth'></div>
          </div>

          <div className="stamina_stat">
            <div className="stamina_icon">
              <img src={staminaIcon} alt="" />
            </div>
            <div className="stamina_bar"></div>
            <div className="stamina_back" id='tamaStamina'></div>
          </div>

          <div className='star_stat'>
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
          </div>

        </div>
        <div className="tama">
          <img src={tama} alt="" />
        </div>
      </div>
  )
}

export default Tamagotchi