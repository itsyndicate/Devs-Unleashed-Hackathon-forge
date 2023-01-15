import React, {useState} from 'react';
import GameWindow from "./GameWindow";
import './FightingGame.css'
const FightingGame = (props) => {
    const [newGame, setNewGame] = useState(true)
    return (
        <div>
            {newGame ? <div className="game">
                <GameWindow newGame={newGame} setNewGame={setNewGame} account_id={props.account_id} fightInfo={props.fightInfo}/>
            </div> : false}
        </div>
    );
};

export default FightingGame;