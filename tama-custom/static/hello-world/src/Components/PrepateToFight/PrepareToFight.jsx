import React, {useEffect, useRef, useState} from 'react';
import CountDown from "./CountDown";

const PrepareToFight = () => {
    const [showComponent, setShowComponent] = useState(true);
    const toRef = useRef()
    useEffect(() => {
        if (showComponent) {
             toRef.current = setTimeout(() => {
                setShowComponent(false);
            }, 4000);
        }
        return () => clearTimeout(toRef.current)
    }, []);
    return (
        <div>
            {showComponent ? <CountDown gametime={3} fight={'Fight!'}/> : false}
        </div>
    );
};

export default PrepareToFight;