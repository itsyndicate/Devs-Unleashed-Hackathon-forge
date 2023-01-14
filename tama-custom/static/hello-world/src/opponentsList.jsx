import React from 'react';
import OpponentItem from "./OpponentItem";

const OpponentsList = (props) => {
    let opponent_id = ''
    return (
        <div className='opponentsList'>
            <div className='opponents_container'>
                {props.opponents.filter(opponent => opponent.in_fight === false)
                    .map(opponent => {
                        return <OpponentItem user={opponent}
                                             opponent_id={opponent.profile.player.account_id}
                                             project_id={props.jiraProjectID}
                                             account_id={props.jiraUserId}
                                             toggleFightGame={props.toggleFightGame}
                        />
                    })}
            </div>
        </div>
    )
};
export default OpponentsList;