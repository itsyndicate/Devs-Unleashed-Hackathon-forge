import React from 'react';
import './HealthBar.css'
import playerIcon from "../../images/playerIcon.png";
const PlayerHealth = (props) => {
    return (
        <div>
            <div className='player_container'>
                <div className='player_icon'>
                    <img src={playerIcon} alt=""/>
                </div>
                <div className='player'>
                    <div className='playerHealth'></div>
                    <div className='playerBack'id='playerHealth'></div>

                </div>
            </div>
            <p className='playerName'>{props.playerName}</p>
        </div>
    );
};

export default PlayerHealth;