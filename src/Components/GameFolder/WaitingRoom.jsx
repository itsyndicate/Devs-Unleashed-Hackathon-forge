import React, {useState} from 'react';
import './WaitingRoom.css'
import backg from '../../images/backgr.png'
import FightingGame from "./FightingGame";
import CountDown from "../PrepateToFight/CountDown";
let simpleStyle = {
    backgroundImage: `url(${backg})`,
    display: 'block'
}
let status = 'Waiting for opponent'
const WaitingRoom = () => {
    const [showGame, setShowGame] = useState(false)
    function toggleFight(){
        setShowGame(true)
    }
    function resultTie(){
        document.getElementsByClassName('waiting_room')[0].style.display = 'none'
        toggleFight()
    }
    setTimeout(resultTie,  10000)
    return (
        <>
            <div className='waiting_room' style={simpleStyle}>
                <CountDown gametime={10} status={status} fight={''}>/</CountDown>
            </div>
            {showGame ? <FightingGame/> : ''}
        </>
    );
};

export default WaitingRoom;