import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import '../css/FAQ.css';
import {Image} from "react-bootstrap";
import styled from 'styled-components';
import * as PropTypes from "prop-types";
import button from "bootstrap/js/src/button";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Game} from "./Game";
import FAQ from "./FAQ";


let tamagoshiImage = 'project_example_1.png';

// const activeStyle = {
//     background: 'hotpink',
//     color: 'white'
// };
// const [activeStyle, setActiveStyle] = useState("blue")

export const PopUp = ({toggleLogin}) => {
    return (
        <div className="loginMenu" style={{width: '50%', height: '50%'}}>
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
    return (
        <div style={{display: "flex", height: "250px", width: "210px"}}>
            <Image style={{maxHeight: "fit-content"}} src={tamagoshiImage} alt="Tamagoshi"/>
            <button className="diceButton"><img src="dice.svg" className="edit-img"/></button>
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
    const [value, setValue] = React.useState("1");
    const [notificationImage, setNotificationImage] = React.useState("mdi_notifications.svg");
    const [musicImage, setMusicImage] = React.useState("ph_music-notes-fill.svg");
    const [soundImage, setSoundImage] = React.useState("material-symbols_sound-detection-loud-sound.svg");

    const toggleNotification = () => {
        setNotificationImage(notificationImage === 'mdi_notifications.svg' ? 'mdi_notifications-off.svg' : 'mdi_notifications.svg');
    }
    const toggleMusic = () => {
        setMusicImage(musicImage === 'ph_music-notes-fill.svg' ? 'mdi_music-off.svg' : 'ph_music-notes-fill.svg');
    }
    const toggleSound = () => {
        setSoundImage(soundImage === 'material-symbols_sound-detection-loud-sound.svg' ? 'teenyicons_sound-off-solid.svg' : 'material-symbols_sound-detection-loud-sound.svg');
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="editMenu">
            <div
                style={{
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <Box sx={{width: "100%", typography: "body1"}}>
                    <TabContext value={value}>
                        <Box sx={{
                            borderBottom: 1,
                            borderColor: "divider"
                        }}>
                            <TabList
                                onChange={handleChange}
                            >
                                <Tab label="Character" value="1"/>
                                <Tab label="Hand" value="2"/>
                                <button className="soundButton" onClick={toggleSound}><img src={soundImage}
                                                                                           className="edit-img"/>
                                </button>
                                <button className="musicButton" onClick={toggleMusic}><img src={musicImage}
                                                                                           className="edit-img"/>
                                </button>
                                <button className="notificationButton" onClick={toggleNotification}><img
                                    src={notificationImage}
                                    className="edit-img"/></button>
                            </TabList>
                        </Box>
                        <TabPanel value="1"><CharTable/></TabPanel>
                        <TabPanel value="2">Hand</TabPanel>
                    </TabContext>
                </Box>

            </div>
            <div className="editNavigation">
                {/*<button radioGroup="navigation" className="editNavigationButtons">Character</button>*/}
                {/*<button radioGroup="navigation" className="editNavigationButtons">Hand</button>*/}
                {/*<StyledRating*/}
                {/*    name="highlight-selected-only"*/}
                {/*    defaultValue={2}*/}
                {/*    IconContainerComponent={IconContainer}*/}
                {/*    getLabelText={(value: number) => customIcons[value].label}*/}
                {/*    highlightSelectedOnly*/}
                {/*/>*/}
            </div>
            <div className="edit-menu-content">
                {/*<div style={{display: "flex", height: "350px", width: "300px"}}>*/}
                {/*    <Image style={{maxHeight: "fit-content"}} src={tamagoshiImage} alt="Tamagoshi"/>*/}
                {/*    <button className="diceButton"><img src="dice.svg" className="edit-img"/></button>*/}
                {/*</div>*/}
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


function App() {


    return (
        <div className="App">
            <div
                className="head"
                style={{
                    width: "fit-content",
                    margin: "auto",
                }}
            >
                <h1
                    style={{
                        color: "green",
                    }}
                >
                    GeeksforGeeks
                </h1>
            </div>
            <div
                style={{
                    width: "fit-content",
                    margin: "auto",
                }}
            >
                <strong>React MUI TabPanel API</strong>
            </div>
            <br/>

        </div>
    );
}

export default App;
