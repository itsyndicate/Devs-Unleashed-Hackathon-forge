import 'bootstrap/dist/css/bootstrap.css';
import  FAQ  from './Components/FAQ';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { Game } from './Components/Game';
import {Image} from "react-bootstrap";


const TamagoshiGame = () => {
  const [isFAQVisible, setIsFAQVisible] = useState(false);

  const toggleFAQ = () => {
    setIsFAQVisible(!isFAQVisible);
  }

  return (
    <>
      <div className='fondo'>
        {/* Tamagoshi */}
        {/* <Egg /> */}
        <Game />

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
