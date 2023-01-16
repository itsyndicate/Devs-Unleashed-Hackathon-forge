import React, {useState} from 'react';
import './WaitingRoom.css'
import backg from '../../images/backgr.png'
import FightingGame from "./FightingGame";
import CountDown from "../PrepateToFight/CountDown";
import {useEffectOnce} from "../../effects";
let simpleStyle = {
    backgroundImage: `url(${backg})`,
    display: 'block'
}
let waitingForOpponent = 'Waiting for opponent'
let opponentDeniedRequest = 'Opponent denied request'
let fightInfo
const WaitingRoom = (props) => {
    const [showGame, setShowGame] = useState(false)
    const [gameStatus, setGameStatus] = useState(waitingForOpponent)
    function toggleFight(){
        setShowGame(true)
    }
    function resultTie(){
        document.getElementsByClassName('waiting_room')[0].style.display = 'none'
        toggleFight()
    }

    let interval
    const getFight = async (account_id) => {
        const getUserFight = await fetch(`https://backend.guard-lite.com/api/v1/fight?account_id=${account_id}`,{
            method: "GET",
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        if (!getUserFight.ok){
            setGameStatus(opponentDeniedRequest)
            setShowGame(false)
            clearInterval(interval)
        } else if ((await getUserFight.json()).status === "AC"){
            let fight = {
                account_id: props.account_id,
                project_id: props.project_id,
                action: "start",
            }
            const response = await fetch(`https://backend.guard-lite.com/api/v1/fight/`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fight)
            });
            return await response.json()
        }
    }

    useEffectOnce(() =>{
        interval = setInterval(async () => {
            fightInfo = await getFight(props.account_id)
            if (fightInfo) clearInterval(interval)

        }, 1000)
        let timout = setTimeout(resultTie,  20 * 1000)
        if (fightInfo) {
            clearTimeout(timout)
            resultTie()
        }
    })

    return (
        <>
            <div className='waiting_room' style={simpleStyle}>
                <CountDown gametime={20} status={gameStatus} fight={''}>/</CountDown>
            </div>
            {showGame && fightInfo ? <FightingGame account_id={props.account_id}
                                      fightInfo={fightInfo}
            /> : ''}
        </>
    );
};

export default WaitingRoom;