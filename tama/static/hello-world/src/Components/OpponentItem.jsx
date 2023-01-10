import React from 'react';
import button from "bootstrap/js/src/button";

const OpponentItem = (props) => {

    return (
        <div className="opponent">
            <div className="opponent_container">
                <div className="opponent_name">
                    <p>{props.user}</p>
                </div>
                <button className='opponent_btn'>Invite</button>
            </div>
        </div>
    );
};

export default OpponentItem;