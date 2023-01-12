import React, {useEffect, useRef, useState} from 'react';

const Timer = (props) => {
    return (
        <div className="timer" id='timer'>
            {props.time}
        </div>
    );
};

export default Timer;