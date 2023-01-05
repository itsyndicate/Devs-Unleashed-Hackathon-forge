import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import '../css/FAQ.css';
import {Image} from "react-bootstrap";

let tamagoshiImage = 'project_example_1.png';

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
export const PopUpEdit = ({toggleEdit}) => {
    return (
        <div className="editMenu">
            <div className="editNavigation">
                <button className="editNavigationButtons">Character</button>
                <button className="editNavigationButtons">Hand</button>

            </div>
            <div className="edit-menu-content">

                <Image src={tamagoshiImage} alt="Tamagoshi"/>
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
