import React from 'react';
import './AcceptOrDeny.css'
const AcceptOrDeny = (props) => {
    let action
    async function acceptFight() {
        action = {
            project_id: props.project_id,
            account_id: props.account_id,
            action: "accept",
        }
        await fetch('https://backend.guard-lite.com/api/v1/fight/', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action)
        });
        props.toggleFightInvite()
    }

    async function denyFight() {
        action = {
            project_id: props.project_id,
            account_id: props.account_id,
            action: "cancel",
        }
        await fetch('https://backend.guard-lite.com/api/v1/fight/', {
            method: "PUT",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action)
        });
        props.toggleFightInvite()
    }

    return (
        <div className='startordeny'>
            <p>Start fight?</p>
            <div className="bnts">
                <button onClick={acceptFight}>Accept</button>
                <button onClick={denyFight}>Deny</button>
            </div>
        </div>
    );
};

export default AcceptOrDeny;