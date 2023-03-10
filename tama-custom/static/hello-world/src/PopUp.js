import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import './css/FAQ.css';
import * as PropTypes from "prop-types";
import {Image} from "react-bootstrap";
import button from "bootstrap/js/src/button";
import './css/generateTable.css';
import OpponentsList from "./opponentsList";
import './Components/HandTracker/HandTracker.css'
import HandTracker from "./Components/HandTracker/HandTracker";
import Home from "./Components/Home/Home";

let tamagoshiImage = 'project_example_1.png';
import {Game} from "./Game";
import FAQ from "./FAQ";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useState} from "react";
import {Character} from "./character";
import {requestJira} from "@forge/bridge";
import toggleClickBtn from "./assets/clickInEdit.wav";


// const activeStyle = {
//     background: 'hotpink',
//     color: 'white'
// };
// const [activeStyle, setActiveStyle] = useState("blue")
let countState = 0;
export const PopUp = ({toggleLogin}) => {
    return (
        <div className="loginMenu" style={{height: '50%'}}>
            <div className="menu-popup">
                <button onClick={toggleLogin} style={{position: 'absolute', top: '10px', right: '10px'}}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <button>Submit</button>
            </div>
        </div>
    );
}


export const CharTable = () => {
    const [count, setCount] = React.useState("1");

    const bodies = [
        {src: './body/body-01.svg'}
    ]


    const hats = [
        {src: './hat/hat_1.1-01-01.svg'}, {src: './hat/hat_1.2-01-01.svg'}, {src: './hat/hat_1.3-01-01.svg'}, {src: './hat/hat_2.1-01-01.svg'},
        {src: './hat/hat_2.2-01-01.svg'}, {src: './hat/hat_2.3-01-01.svg'}, {src: './hat/hat_2.4-01-01.svg'}, {src: './hat/hat_3.1-01-01.svg'},
        {src: './hat/hat_3.2-01-01.svg'}, {src: './hat/hat_3.3-01-01.svg'}, {src: './hat/hat_4.1-01-01.svg'}, {src: './hat/hat_4.2-01-01.svg'},
        {src: './hat/hat_4.3-01-01.svg'}, {src: './hat/hat_5.1-01-01.svg'}, {src: './hat/hat_5.2-01-01.svg'}, {src: './hat/hat_5.3-01-01.svg'},
        {src: './hat/hat_5.4-01-01.svg'}, {src: './hat/hat_6.1-01-01.svg'}, {src: './hat/hat_6.2-01-01.svg'}, {src: './hat/hat_6.3-01-01.svg'}
    ]
    const weapons = [
        {src: './weapon/weapon_1.1-01-01.svg'}, {src: './weapon/weapon_1.2-01-01.svg'}, {src: './weapon/weapon_1.3-01-01.svg'}, {src: './weapon/weapon_1.4-01-01.svg'},
        {src: './weapon/weapon_2.1-01-01.svg'}, {src: './weapon/weapon_2.2-01-01.svg'}, {src: './weapon/weapon_2.3-01-01.svg'}, {src: './weapon/weapon_2.4-01-01.svg'},
        {src: './weapon/weapon_2.5-01-01.svg'}, {src: './weapon/weapon_2.6-01-01.svg'}, {src: './weapon/weapon_2.7-01-01.svg'}, {src: './weapon/weapon_2.8-01-01.svg'},
        {src: './weapon/weapon_2.9-01-01.svg'}
    ]

    const costumes = [
        {src: './costume/costume_1.1-01-01.svg'}, {src: './costume/costume_1.2-01-01.svg'}, {src: './costume/costume_1.3-01-01.svg'}, {src: './costume/costume_1.4-01-01.svg'},
        {src: './costume/costume_2.1-01-01.svg'}, {src: './costume/costume_2.2-01-01.svg'}, {src: './costume/costume_2.3-01-01.svg'}, {src: './costume/costume_2.4-01-01.svg'},
        {src: './costume/costume_2.5-01-01.svg'}, {src: './costume/costume_3.1-01-01.svg'}, {src: './costume/costume_3.2-01-01.svg'}, {src: './costume/costume_3.3-01-01.svg'},
        {src: './costume/costume_3.4-01-01.svg'}, {src: './costume/costume_3.5-01-01.svg'}, {src: './costume/costume_3.6-01-01-01.svg'}, {src: './costume/costume_4.1-01-01.svg'},
    ]

    // const items = [
    //     {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'},
    //     {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'},
    //     {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'},
    //     {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'}
    // ]
    const handleChar = (event, newValue) => {
        setCount(newValue);
    };
    const [costumeImg, setCostumeImg] = useState("./body/body-01.svg");
    global.costumeImg = costumeImg;
    const [hatImg, setHatImg] = useState("./hat/hat_4.1-01.png");
    global.hatImg = hatImg;
    const [weaponImg, setWeaponImg] = useState("./weapon/weapon_1.2-01.png");
    global.weaponImg = weaponImg;
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [notificationImage, setNotificationImage] = React.useState("mdi_notifications.svg");
    const [musicImage, setMusicImage] = React.useState("ph_music-notes-fill.svg");
    const [soundImage, setSoundImage] = React.useState("sound.svg");
    let [health, setHealth] = useState(100);


    const toggleNotification = () => {
        setNotificationImage(notificationImage === 'mdi_notifications.svg' ? 'mdi_notifications-off.svg' : 'mdi_notifications.svg');
    }
    const toggleMusic = () => {
        setMusicImage(musicImage === 'ph_music-notes-fill.svg' ? 'mdi_music-off.svg' : 'ph_music-notes-fill.svg');
    }
    const toggleSound = () => {
        setSoundImage(soundImage === 'sound.svg' ? 'teenyicons_sound-off-solid.svg' : 'sound.svg');
    }

    const getUsers = async () => {
        const response = await requestJira('/rest/api/3/users/search?');
        const data = await response.json();
        return (data[0].accountId);
    }
    const getProject = async () => {
        const response = (await requestJira('/rest/api/3/project'));
        const data = await response.json();
        return (data[0].key);
    }

    async function getTama() {
        const userID = await getUsers();
        const projectId = await getProject();

        // const userID = await getUsers();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectId}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const result = await response.json();
        // console.log(result["image"]);
        setHatImg(result["image"].hatImg)
        setCostumeImg(result["image"].costumeImg)
        setWeaponImg(result["image"].weaponImg)
    }
    if (countState === 0){
        getTama();
        countState++;
    }

    const changeImage = (sourceImg, catalog) => {
        if (isAudioOn) {
            new Audio(toggleClickBtn).play()
        }
        console.log(catalog)
        if (catalog === "costume") {
            setCostumeImg(sourceImg);
            global.costumeImg = setCostumeImg(sourceImg);

        }
        if (catalog === "hat") {
            setHatImg(sourceImg);
            global.hatImg = setHatImg(sourceImg);


        }
        if (catalog === "weapon") {
            setWeaponImg(sourceImg);
            global.weaponImg = setWeaponImg(sourceImg);

        } else {
            console.log("no catalog received")
        }


    }


    const splitArray = (inputArray, perChunk = 4) => {
        return inputArray.items.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perChunk)

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray
        }, []);
    }

    const GenerateItemsTable = (items) => {
        console.log(items.ItemsName);
        const rows = splitArray(items).map((row, index) => {
            return (<div className="arsenal-row" key={index}>{row.map(({src}, idx) => {
                return (<div className="arsenal-data" key={index.toString() + idx}>
                    <button className="eqItemsButton" onClick={() => changeImage(src, items.ItemsName)}><img src={src}
                                                                                                             alt=""/>
                    </button>
                </div>);
            })}</div>);
        });

        return (
            <div className="arsenal">
                {rows}
            </div>
        );
    }
    return (
        <div className="Items" style={{display: "flex", justifyContent: "center", position: "relative"}}>
            <div className="items-table">
                <Tabs
                    defaultActiveKey="body"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="body" title="Costumes" onClick={handleChar} count="1" style={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                        height: "600px",
                        border: "2px solid #0f6af2;"
                    }}>
                        <GenerateItemsTable value="body" items={costumes} ItemsName="costume"/>
                    </Tab>
                    <Tab eventKey="Hats" title="Hats" onClick={handleChar} count="2" style={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                        height: "600px",
                        border: "2px solid #0f6af2;"
                    }}>
                        <GenerateItemsTable items={hats} value="hat" ItemsName="hat"/>

                    </Tab>
                    <Tab eventKey="Weapons" title="Weapons" onClick={handleChar} count="3" style={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                        height: "600px",
                        border: "2px solid #0f6af2;"
                    }}>
                        <GenerateItemsTable value="legs" items={weapons} ItemsName="weapon"/>

                    </Tab>
                </Tabs>
            </div>
            <div>

            </div>
            <Character costumeImg1={costumeImg} hatImg1={hatImg} weaponImg1={weaponImg}/>

            {/*<button className="soundButton" onClick={toggleSound}><img src={soundImage} style={{*/}
            {/*    position: "fixed",*/}
            {/*    top: "200px",*/}
            {/*    left: "-400px"*/}
            {/*}}*/}
            {/*                                                           className="edit-img"/>*/}
            {/*</button>*/}
            {/*<button className="musicButton" onClick={toggleMusic}><img src={musicImage} style={{*/}
            {/*    position: "fixed",*/}
            {/*    top: "200px",*/}
            {/*    left: "-400px"*/}
            {/*}}*/}
            {/*                                                           className="edit-img"/>*/}
            {/*</button>*/}
            {/*<button className="notificationButton" onClick={toggleNotification}*/}
            {/*        style={{position: "fixed", top: "200px", left: "-400px"}}><img*/}
            {/*    src={notificationImage}*/}
            {/*    className="edit-img"/></button>*/}
        </div>
    );
};


export const PopUpEdit = ({toggleLogin, login}) => {

    return (
        <div className="editMenu">
            <ToggleButtonGroupControlled/>


            <div className="edit-menu-content">
                <button onClick={toggleLogin} className="loginButtons"
                        style={{
                            position: "fixed",
                            top: "14px",
                            width: "50px",
                            left: "95%"
                        }}>X
                </button>
                <button onClick={() => {
                    login(costumeImg, hatImg, weaponImg);
                }}
                        style={{width: '200px', height: '50px', position: 'fixed', left: "50%",}}
                        id="saveChar">Save
                </button>
            </div>

        </div>
    );
}

export const PopUpFight = (props) => {

    return (
        <div className="fightMenu">
            <OpponentsList opponents={props.opponents}
                           jiraUserId={props.jiraUserId}
                           jiraProjectID={props.jiraProjectID}
                           toggleFightGame={props.toggleFightGame}/>

            <div className="fight-menu-content">
                <button onClick={props.toggleFight} className="crossBtnFight">
                    <img src='cross.png' alt=""/>
                </button>

            </div>
        </div>
    );
}
export const PopUpFeed = (props) => {
    return (
        <div className='hand-tack'>
            <HandTracker tasks={props.tasks}
                         strength={props.strength}
                         health={props.health}
                         account_id={props.jiraUserID}
                         project_id={props.jiraProjectID}
                costumeImg1={props.costumeImg1}
                hatImg1={props.hatImg1}
                weaponImg1={props.weaponImg1}
            />

            <div className="feed-menu-content">
                <button onClick={props.toggleFeed} style={{
                        top: 0,
                        right: 0,
                        width: "50px",
                        height: "50px",
                        position: "fixed"
                }} className="crossBtnFeed">
                    <img src='cross.png' alt=""/>
                </button>

            </div>

        </div>
    );
}


function ToggleButtonGroupControlled() {
    const [value, setValue] = useState([1, 3]);

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);

    return (
        <div>

            <div className="Tabs" style={{display: "table", margin: "27px auto 0px auto"}}>

                <Tabs
                    defaultActiveKey="Character"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fixed="bottom"


                >
                    <Tab eventKey="Character" id="Editor" title="" onClick={handleChange} value="1">
                        <CharTable/>
                    </Tab>
                </Tabs>
            </div>

        </div>
    );
}


//GENERATE TABLE
