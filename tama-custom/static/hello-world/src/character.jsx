import './css/character.css';
import mrr from './assets/Mrrr.wav'
import {wait} from "@testing-library/user-event/dist/utils";

let initNum = 0;

export const Character = ({costumeImg1, weaponImg1, hatImg1}) => {
    const runMrr = () => {
        if (document.getElementById('mrr')) {
            if (initNum === 0) {
                const audio = new Audio(mrr);
                const pet = document.getElementById('mrr');
                pet.addEventListener('mouseover', () => {
                    audio.play();
                }, false);
                initNum++;
            }

        } else {
            wait(1).then(() => {
                runMrr();
            });

        }
    }
    runMrr();
    return (
        <div className="container">

            <div className="character-hats">
                <img src={hatImg1}/>

            </div>
            <div className="character-face">
                <img src="./face/face-01-01.svg"/>
            </div>
            <div className="character-weapon">
                <img src={weaponImg1}/>

            </div>

            <div className="character-arm-left">
                <img src="./arm_left/arm_left-01-01.svg"/>

            </div>

            <div className="character-arm-right">
                <img src="./arm_right/arm_right-01-01.svg"/>

            </div>

            <div className="character-sleeve-left">
                <img src="./arm_left/sleeve_left_cost1-01-01.svg"/>

            </div>
            <div className="character-sleeve-right">
                <img src="./arm_right/sleeve_right_cost1-01-01.svg"/>

            </div>

            {/*<div className="character-traus-left">*/}
            {/*    <img src="./leg_left/traus_left_cost1-01-01.svg" />*/}

            {/*</div>*/}
            {/*<div className="character-traus-right">*/}
            {/*    <img src="./leg_right/traus_left_cost1-01-01.svg"/>*/}
            {/*</div>*/}

            <div className="character-leg-left">
                <img src="./leg_left/leg_left-01-01.svg"/>

            </div>
            <div className="character-leg-right">
                <img src="leg_right/leg_right-01-01.svg"/>

            </div>

            <div className="character-shadow">
                <img src="./shadow/shadow-01.svg"/>

            </div>

            <div className="character-tail">
                <img src="./tail/tail-01.svg"/>

            </div>

            <div className="character-body">
                <img src="./body/body-01.svg"/>
            </div>

            <div className="character-costume">
                <img src={costumeImg1}/>
            </div>
            <div id="mrr" style={{
                position: "fixed",
                width: "200px",
                height: "100px",
                background: "blueviolet",
                border: "1px solid black"
            }}></div>
        </div>
    );
}