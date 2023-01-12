import React, {useState, useEffect, useRef} from 'react';
import swal from 'sweetalert';
import api, {route} from "@forge/api";
import {requestJira} from '@forge/bridge';
import {Image, ProgressBar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Game.css';
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
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import CharRating from './Rating';
import {PopUpEdit, PopUpFeed, PopUpFight} from "./PopUp";
import ToggleButtonGroupControlled from './PopUp';
import GameWindow from "./GameFolder/GameWindow";
import FightingGame from "./GameFolder/FightingGame";
import WaitingRoom from "./GameFolder/WaitingRoom";

const AsyncReq = async () => {
    const response = await requestJira('backend.guard-lite.com');
    console.log(await response.text());
}




async function getServ() {
    try {
        const response = await fetch('https://backend.guard-lite.com/api/v1/available-opponents?account_id=635fbb7bf7ad721e784f0156&project_id=test-cront', {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}
getServ();
const TamagoshiImage = ({strength, health}) => {
    let tamagoshiImage = 'project_example_1.png';
    // //si hambre es menor o igual a 30 o felicidad es menor o igual a 30 o salud es menor o igual a 30
    // if (strength <= 30 || health <= 30) {
    //     tamagoshiImage = 'project_example_1.png';
    // }
    // //si hambre es igual a 0 o felicidad es igual a 0 o salud es igual a 0
    // else if (strength === 0 || health === 0) {
    //     tamagoshiImage = 'project_example_1.png';
    // }
    // //si hambre es mayor a 90 o felicidad es mayor a 90 o salud es mayor a 90
    // else if (strength > 95 && health > 90) {
    //     tamagoshiImage = 'kQooJxm.png';
    // }
    // //si hambre es mayor a 80 y felicidad es mayor a 80 y salud es mayor a 80
    // else if (strength > 80 && health > 80) {
    //     tamagoshiImage = 'wWoMWxA.png';
    // }
    // //si hambre es mayor a 30 y felicidad es mayor a 30 y salud es mayor a 30
    // else if (strength > 30 && health > 30) {
    //     tamagoshiImage = 'EHOnPps.png';
    // }
    return <Image style={{maxWidth: "350px", maxHeight: "300px"}} src={tamagoshiImage} alt="Tamagoshi"/>;
}


export const Game = () => {
    // Estados para los parámetros de Tamagoshi
    const [strength, setStrength] = useState(50);
    // const [tasks, setTaskCount] = useState(0);
    const [health, setHealth] = useState(100);
    // const [record, setRecord] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    // Agrega la variable showGif y establece su valor inicial en false
    const [showGif, setShowGif] = useState(false);
    const [gif, setGif] = useState(null);
    const [users,setUsers] = useState([])
    const [tasks,setTasks] = useState(0)
    // Modifica la función showGif para que cambie el valor de showGif a true
    // y establezca un temporizador para que vuelva a cambiar el valor de showGif a false
    // después de 3 segundos
    const getUsers = async () => {
        const response = await requestJira('/rest/api/3/users/search?').then(res => res.json()).then(res => setUsers(res))
    }
    const getTasks = async () => {
        const response = await requestJira('/rest/api/2/search?jql=status+in+%28+done%29+order+by+status')
            .then(res => res.json())
            .then(res => setTasks(res['total']))
    }


    const [jiraUserID, setJiraUserID] = useState('')
    const [jiraUserName, setJiraUserName] = useState('')
    const [jiraProjectID, setJiraProjectID] = useState('')
    const [jiraProjectName, setJiraProjectName] = useState('')
    const getJiraInfo = async () => {
        await requestJira('/rest/api/3/users/search?')
            .then(res => res.json())
            .then(res => setJiraUserID(res[0].accountId))

        await requestJira('/rest/api/3/users/search?')
            .then(res => res.json())
            .then(res => setJiraUserName(res[0].displayName))

        await requestJira('/rest/api/2/project')
            .then(res => res.json())
            .then(res => setJiraProjectName(res[0].name))

        await requestJira('/rest/api/2/project')
            .then(res => res.json())
            .then(res => setJiraProjectID(res[0].id))
    }
    getJiraInfo()



    let newUser = {}
    const registerPlayer = async (newUser) => {
        const response = await fetch('https://backend.guard-lite.com/api/v1/register-player/', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;

    }
    if(jiraUserID !== '' && jiraUserName !== '' && jiraProjectID !== '' && jiraProjectName !== ''){
        newUser =  {
            player_name: jiraUserName,
            account_id: jiraUserID,
            project_id: jiraProjectID,
            project_name: jiraProjectName
        }
        registerPlayer(newUser)
    }


    const displayGif = () => {
        setShowGif(true);
        setTimeout(() => {
                setShowGif(false);
            }, 3000
        );
    };
    useInterval(() => {
        setElapsedTime(elapsedTime + 1);
    }, 1000); // Actualiza cada segundo
    // Función para actualizar el estado de hambre del Tamagoshi
    useInterval(() => {
        setStrength(strength - 1);
        if (strength === 0) {
            swal({
                title: 'Kirby is weak',
                text: 'Do you want to reset the game?',
                icon: 'warning',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 2000);
    // Función para actualizar el estado de salud del Tamagoshi
    useInterval(() => {
        setHealth(health - 1);
        if (health === 0) {
            swal({
                title: 'Kirby has died of illness',
                text: 'Do you want to reset the game?',
                icon: 'warning',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 3000);

    // localStorage.setItem('record', age);
    // Formatea el tiempo de juego
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const isMoving = true;
    // window.onload = func;
    // Agrega un 0 a la izquierda si el número es menor a 10
    const elapsedTimeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    // useEffect(updateRecord, [age, record]);
    // useEffect(() => {
    // const storedRecord = localStorage.getItem('record');
    // if (storedRecord) {
    //     setRecord(parseInt(storedRecord));
    // }
    // }, []);


    const [direction, setDirection] = useState('left');
    const [containerWidth, setContainerWidth] = useState(100);
    let timer = null;
    const [charRating, setCharRating] = useState(1);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isFightVisible, setIsFightVisible] = useState(false);
    const [isFeedVisible, setIsFeedVisible] = useState(false);
    const [isFightGameVisible, setIsFightGameVisible] = useState(false);

    const toggleEdit = () => {
        setIsEditVisible(!isEditVisible);
    }
    const toggleFight = () => {
        setIsFightVisible(!isFightVisible)
        getUsers()
    }
    const toggleFightGame = () => {
        setIsFightGameVisible(!isFightGameVisible)
    }
    const toggleFeed = () => {
        setIsFeedVisible(!isFeedVisible)
        getTasks()
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

                    <div className="editAndFight">
                        {isEditVisible && < PopUpEdit toggleEdit={toggleEdit}/>}
                        {/*</StyledEngineProvider>*/}
                        <button className="editButton" style={{left: "-50%"}} onClick={toggleEdit}><img src="edit.svg" className="edit-img"/>

                        </button>
                        {isFightVisible && <PopUpFight
                            users={users}
                            jiraUserId={jiraUserID}
                            jiraProjectID={jiraProjectID}
                            toggleFight={toggleFight}
                            toggleFightGame={toggleFightGame}
                        />}
                        <button className="fight" onClick={toggleFight}>
                            <img draggable="false" src="fight.png" className="fight-img"/>
                        </button>
                    </div>
                    {/* Show the GIF if showGif is true and show the tamagoshi if showGif is false */}
                    {showGif ? <img draggable="false" className='gif' src={gif} alt="Gif"/> :
                        <TamagoshiImage strength={strength} health={health}/>}

                    {isFightGameVisible && <WaitingRoom/>}

                    {isFeedVisible && <PopUpFeed tasks={tasks} toggleFeed={toggleFeed}/>}
                    <button className="feed" onClick={toggleFeed}>
                        <img draggable="false" src="cat-food.svg" className="feed-img"/>
                    </button>
                </div>

            </div>

            <div>
                {/*test request to JIRA API*/}
                <button id="test" class="asdasd" onClick={AsyncReq}>TEST</button>
                <button onClick={startMove}>Move</button>
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