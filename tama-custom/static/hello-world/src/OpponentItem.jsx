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
    const createFight = async (newFight) => {
        await fetch('https://backend.guard-lite.com/api/v1/fight/', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFight)
        });
    }


    function createAndDraw(){
        props.toggleFightGame()
        createFight(newFight)
    }
    return (
        <div className="opponent">
            <div className="opponent_container">
                <div className="opponent_name">
                    <p>{props.user.profile.player.name}</p>
                </div>

                <button className='opponent_btn' onClick={createAndDraw}>Invite</button>
            </div>
        </div>
    );
};

export default OpponentItem;