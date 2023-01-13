import 'bootstrap/dist/css/bootstrap.css';
import FAQ from './FAQ';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {PopUp, PopUpEdit} from "./PopUp";
import {Game} from './Game';
import {Image} from "react-bootstrap";
import {requestJira} from "@forge/bridge";
import Alert from 'react-bootstrap/Alert';


const TamagoshiGame = () => {
    let [isNewUser, setIsNewUser] = useState(false);
    const [isFAQVisible, setIsFAQVisible] = useState(false);
    let count = 0;

    const getProject = async () => {
        const response = (await requestJira('/rest/api/3/project'));
        const data = await response.json();
        return (data[0].id);
    }
    const getUsers = async () => {
        const response = (await requestJira('/rest/api/3/users/search?'));
        const data = await response.json();
        return (data[0].accountId);
    }

    const toggleLogin = async () => {
        console.log("start executing toggleLogin!!");
        console.log(isNewUser);

        const userID = await getUsers();
        const projectID = await getProject();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectID}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = response.status;
        if (result === 404) {
            setIsNewUser(true);
            count++;


        } else {
            setIsNewUser(false);
            count = 0;
        }

        if (count > 0) {
            alert("Please save character to proceed!");
        }

        console.log(isNewUser);


    }
    window.onload = toggleLogin();
    return (

        <>
            <div className='fondo'>
                {/* Tamagoshi */}
                {/* <Egg /> */}
                <Game/>
                {isNewUser && <PopUpEdit toggleLogin={toggleLogin}/>}

            </div>
        </>
    );
};

export default TamagoshiGame;
