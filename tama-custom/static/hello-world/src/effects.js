import {useRef, useEffect, useState} from "react";

export let useEffectOnce = function (effect) {
    let destroyFunc = useRef();
    let effectCalled = useRef(false);
    let renderAfterCalled = useRef(false);
    let _a = useState(0), val = _a[0], setVal = _a[1];
    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }
    useEffect(function () {
        // only execute the effect first time around
        if (!effectCalled.current) {
            destroyFunc.current = effect();
            effectCalled.current = true;
        }
        // this forces one render after the effect is run
        setVal(function (val) { return val + 1; });
        return function () {
            // if the comp didn't render since the useEffect was called,
            // we know it's the dummy React cycle
            if (!renderAfterCalled.current) {
                return;
            }
            if (destroyFunc.current) {
                destroyFunc.current();
            }
        };
    }, []);
};