import 'bootstrap/dist/css/bootstrap.css';
import  FAQ  from './Components/FAQ';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { PopUp } from "./Components/PopUp";
import { Game } from './Components/Game';
import {Image} from "react-bootstrap";
import button from "bootstrap/js/src/button";


const TamagoshiGame = () => {
  const isNewUser = true;
  const [isFAQVisible, setIsFAQVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(isNewUser);

  const toggleFAQ = () => {
    setIsFAQVisible(!isFAQVisible);
  }

  const toggleLogin = () => {
    setIsLoginVisible(!isLoginVisible);
  }

  return (

    <>
      <div className='fondo'>
        {/* Tamagoshi */}
        {/* <Egg /> */}
        <Game />
        {isLoginVisible && < PopUp toggleLogin={toggleLogin}/>}
        {/* FAQ */}
        {isFAQVisible && <FAQ toggleFAQ={toggleFAQ} />}
        <button style={{ backgroundColor: '#080c51', color: 'white' }} onClick={toggleFAQ}>
          <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
        </button>

      </div>
      </>
  );
};

export default TamagoshiGame;
