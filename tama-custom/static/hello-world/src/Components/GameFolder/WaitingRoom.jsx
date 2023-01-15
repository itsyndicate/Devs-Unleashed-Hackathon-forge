import React, {useState} from 'react';
import './WaitingRoom.css'
import backg from '../../images/backgr.png'
import FightingGame from "./FightingGame";
import CountDown from "../PrepateToFight/CountDown";

const container = document.getElementsByClassName("body");
const screenWidth = container[0].clientWidth;
const screenHeight = container[0].clientHeight;
console.log(container[0].clientWidth);
console.log(container[0].clientHeight);

let simpleStyle = {
    backgroundImage: `url(${backg})`,
    display: 'block',
    width: screenWidth,
    height: screenHeight
}
let waitingForOpponent = 'Waiting for opponent'
let opponentDeniedRequest = 'Opponent denied request'
const WaitingRoom = (props) => {
    const [showGame, setShowGame] = useState(false)

    function toggleFight() {
        setShowGame(true)
    }

    function resultTie() {
        document.getElementsByClassName('waiting_room')[0].style.display = 'none'
        toggleFight()
    }

    const getFight = async (account_id) => {
        const getUserFight = await fetch(`https://backend.guard-lite.com/api/v1/fight?account_id=${account_id}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    setInterval(() => {
        getFight(props.account_id)
    }, 1000)
    setTimeout(resultTie, 60000)
    return (
        <>
            <div className='waiting_room' style={simpleStyle}>
                <CountDown gametime={60} status={waitingForOpponent} fight={''}>/</CountDown>
            </div>
            {showGame ? <FightingGame/> : ''}
        </>
    );
};

export default WaitingRoom;