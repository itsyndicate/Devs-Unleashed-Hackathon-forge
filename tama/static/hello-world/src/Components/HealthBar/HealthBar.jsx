import React from 'react';
import PlayerHealth from "./PlayerHealth";
import Timer from "./Timer";
import EnemyHealth from "./EnemyHealth";
import './HealthBar.css'
const HealthBar = (props) => {
    return (
        <div className="HealthBar">
            <PlayerHealth playerName={props.playerName}/>
            <Timer time={props.time}/>
            <EnemyHealth enemyName={props.enemyName}/>
        </div>
    );
};

export default HealthBar;