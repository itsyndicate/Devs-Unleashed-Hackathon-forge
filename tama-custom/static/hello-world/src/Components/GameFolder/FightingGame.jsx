import React, {useState} from 'react';
import GameWindow from "./GameWindow";
import './FightingGame.css'
const FightingGame = (props) => {
    const [isGameDraw, setIsGameDraw] = useState(true)
    const toggleDrawGame = () =>{
        setIsGameDraw(!isGameDraw)
    }
    return (
        <div>
            {isGameDraw ? <div className="game">
                <GameWindow account_id={props.account_id} fightInfo={props.fightInfo}
                            toggleDrawGame={toggleDrawGame}/>
            </div> : false}
        </div>
    );
};

export default FightingGame;