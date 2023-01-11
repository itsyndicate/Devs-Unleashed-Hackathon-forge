import 'bootstrap/dist/css/bootstrap.css';
import FAQ from './Components/FAQ';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {PopUp, PopUpEdit} from "./Components/PopUp";
import {Game} from './Components/Game';
import {Image} from "react-bootstrap";
import {requestJira} from "@forge/bridge";


const TamagoshiGame = () => {
    const isNewUser = false;
    const [isFAQVisible, setIsFAQVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(isNewUser);


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
            setIsLoginVisible(true);
        } else {
            setIsLoginVisible(false)
        }

    }

    return (

        <>
            <div className='fondo'>
                {/* Tamagoshi */}
                {/* <Egg /> */}
                <Game/>
                {isLoginVisible && < PopUpEdit toggleLogin={toggleLogin}/>}

            </div>
        </>
    );
};

export default TamagoshiGame;
