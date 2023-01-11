import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import '../css/FAQ.css';
import {Image} from "react-bootstrap";
import * as PropTypes from "prop-types";
import button from "bootstrap/js/src/button";
import '../css/generateTable.css';

import {Game} from "./Game";
import FAQ from "./FAQ";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {useState} from "react";
import {Character} from "./character";

let tamagoshiImage = 'project_example_1.png';

// const activeStyle = {
//     background: 'hotpink',
//     color: 'white'
// };
// const [activeStyle, setActiveStyle] = useState("blue")

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
    const items = [
        {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'},
        {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'},
        {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'},
        {src: 'cat-food.svg'}, {src: 'dice.svg'}, {src: 'edit.svg'}, {src: 'edit.svg'}
    ]
    const handleChar = (event, newValue) => {
        setCount(newValue);
    };
    const [bodyImg, setBodyImg] = useState(tamagoshiImage);
    const [hatImg, setHatImg] = useState(tamagoshiImage);
    const [legsImg, setLegImg] = useState(tamagoshiImage);

    const changeImage = (sourceImg, catalog) => {
        console.log(catalog)
        if (catalog === "body") {
            setBodyImg(sourceImg);

        }
        if (catalog === "hat") {
            setHatImg(sourceImg);


        }
        if (catalog === "weapon") {
            setLegImg(sourceImg);

        }
        else {
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
        console.log(items.ItemsName)
        const rows = splitArray(items).map((row, index) => {
            return (<div className="arsenal-row" key={index}>{row.map(({src}, idx) => {
                return (<div className="arsenal-data" key={index.toString() + idx}>
                    <button className="eqItemsButton" onClick={() => changeImage(src, items.ItemsName)}><img src={src} alt=""/>
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
                    <Tab eventKey="body" title="Body" onClick={handleChar} count="1">
                        <GenerateItemsTable value="body" items={bodies} ItemsName="body" />
                    </Tab>
                    <Tab eventKey="Hats" title="Hats" onClick={handleChar} count="2">
                        <GenerateItemsTable items={items} value="hat" ItemsName="hat" />

                    </Tab>
                    <Tab eventKey="Weapons" title="Weapons" onClick={handleChar} count="3">
                        <GenerateItemsTable value="weapon" items={items} ItemsName="body" />

                    </Tab>
                </Tabs>
            </div>
            <div>

            </div>
            <Character bodyImg1={bodyImg} armsImg1={hatImg} legsImg1={legsImg} />
            <button className="diceButton"><img src="dice.svg" className="edit-img"/>
            </button>
        </div>
    );
};


//HAND
export const handTable = () => {
    return (
        <div style={{display: "flex", height: "250px", width: "210px"}}>
            <Image style={{maxHeight: "fit-content"}} src="" alt="Tamagoshi"/>
        </div>
    );
};


export const PopUpEdit = ({toggleEdit}) => {

    return (
        <div className="editMenu">
            <ToggleButtonGroupControlled/>


            <div className="edit-menu-content">
                <button onClick={toggleEdit} className="loginButtons" style={{background: "blue", bottom: 0}}>
                    Save
                </button>
                <button onClick={toggleEdit} className="loginButtons" style={{bottom: 0}}>
                    Cancel
                </button>

            </div>

        </div>
    );
}


function ToggleButtonGroupControlled() {
    const [value, setValue] = useState([1, 3]);
    const [notificationImage, setNotificationImage] = React.useState("mdi_notifications.svg");
    const [musicImage, setMusicImage] = React.useState("ph_music-notes-fill.svg");
    const [soundImage, setSoundImage] = React.useState("sound.svg");

    const toggleNotification = () => {
        setNotificationImage(notificationImage === 'mdi_notifications.svg' ? 'mdi_notifications-off.svg' : 'mdi_notifications.svg');
    }
    const toggleMusic = () => {
        setMusicImage(musicImage === 'ph_music-notes-fill.svg' ? 'mdi_music-off.svg' : 'ph_music-notes-fill.svg');
    }
    const toggleSound = () => {
        setSoundImage(soundImage === 'sound.svg' ? 'teenyicons_sound-off-solid.svg' : 'sound.svg');
    }
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);

    return (
        <div>
            <div style={{position: "fixed", left: "80%"}}>
                <button className="soundButton" onClick={toggleSound}><img src={soundImage}
                                                                           className="edit-img"/>
                </button>
                <button className="musicButton" onClick={toggleMusic}><img src={musicImage}
                                                                           className="edit-img"/>
                </button>
                <button className="notificationButton" onClick={toggleNotification}><img
                    src={notificationImage}
                    className="edit-img"/></button>
            </div>
            <div className="Tabs" style={{display: "table", margin: "27px auto 0px auto"}}>
                <Tabs
                    defaultActiveKey="Character"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    fixed="top"
                >
                    <Tab eventKey="Character" title="Character" onClick={handleChange} value="1">
                        <CharTable/>
                    </Tab>
                    <Tab eventKey="Hand" title="Hand" onClick={handleChange} value="2">
                        <h1>hand</h1>
                    </Tab>
                </Tabs>
            </div>

        </div>
    );
}


//GENERATE TABLE
