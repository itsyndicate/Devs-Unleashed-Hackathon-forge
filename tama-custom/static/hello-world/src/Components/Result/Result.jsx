import React, {useState} from 'react';
import './Result.css'

const Result = (props) => {
    function closeGame() {
        props.toggleDrawGame()
    }

    return (
        <div className='result' id='result'>
            {props.playerName + props.result}
            <div className='result_btns'>
                <button onClick={closeGame}>Exit</button>
            {/*    <button onClick={newGame}>Rematch</button>*/}
            </div>
        </div>
    );
};

export default Result;