import React, {useState} from 'react';
import './AcceptOrDeny.css'
import FightingGame from "../GameFolder/FightingGame";
import {useEffectOnce} from "../../effects";

let fightInfo
const AcceptOrDeny = (props) => {
    console.log('AcceptOrDeny opened')
    let action
    let interval
    let [startGame, setStartGame] = useState(false)
    const getFight = async (account_id) => {
        while (true){
            console.log('in while')
            const response = await fetch(`https://backend.guard-lite.com/api/v1/fight?account_id=${account_id}`,{
                method: "GET",
                mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            let info = await response.json()
            if (info.status === "P"){
                return info
            }
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    // useEffectOnce(() =>{
    //     interval = setInterval(async () => {
    //         fightInfo = await getFight(props.account_id, props.project_id)
    //         if (fightInfo) {
    //             toggleFight()
    //             clearInterval(interval)
    //         }
    //
    //     }, 1000)
    //     // let timout = setTimeout(resultTie,  20 * 1000)
    //     // if (fightInfo) {
    //     //     clearTimeout(timout)
    //     // }
    // })
    async function acceptFight() {
        action = {
            project_id: props.project_id,
            account_id: props.account_id,
            action: "accept",
        }
        await fetch('https://backend.guard-lite.com/api/v1/fight/', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action)
        });
        props.toggleFightInvite()

    }
    async function someName() {
        await acceptFight()
        fightInfo = await getFight(props.account_id)

        props.setFightInfo(fightInfo)
        console.log(startGame)
    }
    // const showGame = () => {
    //     return (<FightingGame account_id={props.account_id} fightInfo={fightInfo}/>)
    // }
    async function denyFight() {
        action = {
            project_id: props.project_id,
            account_id: props.account_id,
            action: "cancel",
        }
        await fetch('https://backend.guard-lite.com/api/v1/fight/', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action)
        });
        props.toggleFightInvite()
    }

    return (
        <>
            <div className='startordeny'>
                <p>Start fight?</p>
                <div className="bnts">
                    <button onClick={someName}>Accept</button>
                    <button onClick={denyFight}>Deny</button>
                </div>
            </div>
            {/*{startGame ? showGame() : ''}*/}

        </>
    );
};

export default AcceptOrDeny;