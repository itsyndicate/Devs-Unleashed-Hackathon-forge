import React, {useState} from 'react';
import GameWindow from "./GameWindow";
import './FightingGame.css'
const FightingGame = () => {
    const [newGame, setNewGame] = useState(true)
    return (
        <div>
            {newGame ? <div className="game">
                <GameWindow newGame={newGame} setNewGame={setNewGame}/>
            </div> : false}
        </div>
    );
};

export default FightingGame;