import React, {useState, useEffect, useRef} from 'react';
import swal from 'sweetalert';
import api, {route} from "@forge/api";
import {requestJira} from '@forge/bridge';
import {Image, ProgressBar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Game.css';
import {Character} from "./character";

//icons
import {GrGamepad} from 'react-icons/gr';
import {IoFastFoodOutline} from 'react-icons/io5';
import {MdOutlineHealthAndSafety} from 'react-icons/md';
import {BiTime} from 'react-icons/bi';
import {GiLaurelsTrophy} from 'react-icons/gi';
import {MdOutlineAdsClick} from 'react-icons/md';
import {getElement} from "bootstrap/js/src/util";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Box, Rating, Typography} from "@mui/material";
import {StyledEngineProvider} from "@mui/styled-engine-sc";
import CharRating from './Rating';
import {PopUpEdit} from "./PopUp";
import ToggleButtonGroupControlled from './PopUp';

const AsyncReq = async () => {
    const response = await requestJira('/rest/api/3/groups/picker');
    console.log(await response.text());
}
// Components
const TamagoshiImage = ({strength, health}) => {
    let tamagoshiImage = 'project_example_1.png';
    return <Image style={{maxWidth: "350px", maxHeight: "300px"}} src={tamagoshiImage} alt="Tamagoshi"/>;
}


export const Game = () => {


    let timer = null;
    const [direction, setDirection] = useState('left');
    const [containerWidth, setContainerWidth] = useState(100);
    const [charRating, setCharRating] = useState(1);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const [strength, setStrength] = useState(0);
    const [tasks, setTaskCount] = useState(0);
    const [health, setHealth] = useState(0);
    // const [record, setRecord] = useState(0);
    const [showGif, setShowGif] = useState(false);
    const [gif, setGif] = useState(null);
    const projectID = 'test-cront';

    const displayGif = () => {
        setShowGif(true);
        setTimeout(() => {
                setShowGif(false);
            }, 3000
        );
    };
    const getUsers = async () => {
        const response = (await requestJira('/rest/api/3/users/search?'));
        const data = await response.json();
        return (data[0].accountId);
    }

    async function getHealth(userID) {
        // const userID = await getUsers();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectID}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const result = await response.json();
        console.log(result["health"])
        return result["health"];
    }

    const checkHealth = async () => {
        const userID = await getUsers();
        setHealth(await getHealth(userID));
        useInterval(async () => {
            setHealth(await getHealth(userID));
        }, 60000);

    }

    checkHealth();


    const toggleEdit = () => {
        setIsEditVisible(!isEditVisible);
    }

    function startMove() {
        timer = setInterval(() => {
            setDirection(direction === 'right' ? 'left' : 'right');
            setContainerWidth(Math.floor(Math.random() * 101));
        }, 1200)

    }

    function stopMove() {
        clearTimeout(timer);
    }

    return (
        <div className="egg">
            <h1 className="character-name">TaskoGotchi</h1>
            <h2 className="character-age"><BiTime/> Tasks Eaten: {tasks}</h2>

            <div className="stats">
                <Image className="stat-icons" src={"strength.svg"}/>
                <ProgressBar now={strength} className="stat-progress" variant="danger" label={`${strength}%`}/>
                <Image className="stat-icons" style={{marginTop: "10px"}} src={"game-icons_health-potion.svg"}/>
                <ProgressBar now={health} style={{marginTop: "10px"}} className="stat-progress" variant="success"
                             label={`${health}%`}/>
                <CharRating rate={charRating} starClicked={charRating}/>
            </div>
            <div className="square" style={{width: containerWidth + '%'}}>
                {/*COMMENT FOR MOVING CHARACTER*/}
                {/*<div className={'square-content ' + direction} id="character">*/}
                <div className='square-content' id="character">
                    {/*<StyledEngineProvider injectFirst>*/}

                    {isEditVisible && < PopUpEdit toggleEdit={toggleEdit}/>}
                    {/*</StyledEngineProvider>*/}
                    <button className="editButton" id="EditButton" style={{left: "-20%"}} onClick={toggleEdit}><img
                        src="edit.svg"
                        className="edit-img"/>
                    </button>
                    {/* Show the GIF if showGif is true and show the tamagoshi if showGif is false */}
                    {showGif ? <img draggable="false" className='gif' src={gif} alt="Gif"/> :
                        <Character costumeImg1={localStorage.getItem("costumeImg")}
                                   hatImg1={localStorage.getItem("hatImg")}
                                   weaponImg1={localStorage.getItem("weaponImg")}/>}
                    <button className="feed" onClick={() => {
                        setStrength(Math.min(strength + 10, 100));
                        setGif('giphy0.webp');
                        displayGif();
                    }}><img draggable="false" src="cat-food.svg" className="feed-img"/></button>
                </div>

            </div>

            <div>
                {/*test request to JIRA API*/}
                <button id="test" class="asdasd" onClick={AsyncReq}>TEST</button>
                <button onClick={getHealth}>GET</button>
                <button onClick={() => {
                    stopMove();
                    window.stop = stop;
                    window.start = start;
                }}>Stop
                </button>
                <button onClick={() => {
                    const link = window.parent.document.getElementsByClassName("css-178ag6o")[4];
                    // const test = document.getElementsByClassName("asdasd");
                }}>Fight
                </button>
                <div className="buttons">

                    <button onClick={() => {
                        setHealth(Math.min(health + 10, 100));
                        setGif('tumblr_n0w505oIli1ru09vqo1_500.gifv');
                        displayGif();
                    }}>

                        <MdOutlineHealthAndSafety/> Heal
                    </button>
                </div>
            </div>
        </div>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}