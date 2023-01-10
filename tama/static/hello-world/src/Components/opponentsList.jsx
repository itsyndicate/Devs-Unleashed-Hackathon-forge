import React from 'react';
import button from "bootstrap/js/src/button";
import OpponentItem from "./OpponentItem";

const OpponentsList = (props) => {
    return (
        <div className='opponentsList'>
            <div className='opponents_container'>
                {/*{props.users.map(user => {*/}
                {/*    <OpponentItem user={user}/>*/}
                {/*})}*/}
                {props.users.filter(user =>  user.accountType === "atlassian").map(user => user.displayName).map(user => {
                    return <OpponentItem user={user}/>
                })}
            </div>
        </div>
    )
};

export default OpponentsList;