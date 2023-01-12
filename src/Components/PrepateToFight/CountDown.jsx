import React, {useEffect, useRef, useState} from 'react';
import './CountDown.css'

const CountDown = (props) => {
    const [time, setTime] = useState(props.gametime)
    const timeID = useRef()
    useEffect(()=>{
        timeID.current = setInterval(() => {
            if (time > 0){
                setTime(time => time - 1 )
            }
        }, 1000)
        return() => clearInterval(timeID.current)
    },[])
    if (time === 0){
        clearInterval(timeID.current)
    }
    return (
        <div className='count_down'>
            <span>{props.status}</span>
            <p>{time < 1 ? props.fight : time}</p>
        </div>
    );
};

export default CountDown;