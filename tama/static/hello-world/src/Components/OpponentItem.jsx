import React, {useEffect, useState} from 'react';
import button from "bootstrap/js/src/button";
const OpponentItem = (props) => {
    const [fight, setFight] = useState()
    let newFight
    if (props.account_id !== '' && props.opponent_id !== '' && props.project_id !== ''){
        newFight = {
            project_id: props.project_id,
            account_id: props.account_id,
            opponent_id: props.opponent_id
        }
    }
    useEffect(() =>{
        createFight()
        socket.onopen = () => {
            console.log('connection established')
        }
    },[])
    const getFight = async () => {
        await fetch('https://backend.guard-lite.com/api/v1/fight/'),{
            method: "GET",
            mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
            },
        }
    }
    const createFight = async () => {
        await fetch('https://backend.guard-lite.com/api/v1/fight/', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFight)
        });
    }

    const socket = new WebSocket(`wss://backend.guard-lite.com/ws/fight/${props.account_id}`)
    // socket.onopen = () => {
    //     console.log('connection established')
    // }
    return (
        <div className="opponent">
            <div className="opponent_container">
                <div className="opponent_name">
                    <p>{props.user}</p>
                </div>

                <button className='opponent_btn' onClick={props.toggleFightGame}>Invite</button>
            </div>
        </div>
    );
};

export default OpponentItem;