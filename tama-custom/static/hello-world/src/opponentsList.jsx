import React from 'react';
import OpponentItem from "./OpponentItem";

const OpponentsList = (props) => {
    let opponent_id = ''
    return (
        <div className='opponentsList'>
            <div className='opponents_container'>
                {props.users.filter(user => user.accountType === "atlassian")
                    .filter(user => user.accountId !== props.jiraUserId)
                    .map(user => {
                        opponent_id = user.accountId
                        return user.displayName
                    }).map(user => {
                    return <OpponentItem user={user}
                                         opponent_id={opponent_id}
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