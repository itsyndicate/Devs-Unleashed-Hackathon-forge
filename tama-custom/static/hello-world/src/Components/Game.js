import React, {useState, useEffect, useRef} from 'react';
import swal from 'sweetalert';
import {Image, ProgressBar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Game.css';
//icons
import {GrGamepad} from 'react-icons/gr';
import {IoFastFoodOutline} from 'react-icons/io5';
import {MdOutlineHealthAndSafety} from 'react-icons/md';
import {BiTime} from 'react-icons/bi';
import {GiLaurelsTrophy} from 'react-icons/gi';
import {MdOutlineAdsClick} from 'react-icons/md';
import {getElement} from "bootstrap/js/src/util";

// Components
const TamagoshiImage = ({hunger, health}) => {
    let tamagoshiImage;
    //si hambre es menor o igual a 30 o felicidad es menor o igual a 30 o salud es menor o igual a 30
    if (hunger <= 30 || health <= 30) {
        tamagoshiImage = 'Okh86g4.png';
    }
    //si hambre es igual a 0 o felicidad es igual a 0 o salud es igual a 0
    else if (hunger === 0 || health === 0) {
        tamagoshiImage = '29jrgnP.png';
    }
    //si hambre es mayor a 90 o felicidad es mayor a 90 o salud es mayor a 90
    else if (hunger > 95 && health > 90) {
        tamagoshiImage = 'kQooJxm.png';
    }
    //si hambre es mayor a 80 y felicidad es mayor a 80 y salud es mayor a 80
    else if (hunger > 80 && health > 80) {
        tamagoshiImage = 'wWoMWxA.png';
    }
    //si hambre es mayor a 30 y felicidad es mayor a 30 y salud es mayor a 30
    else if (hunger > 30 && health > 30) {
        tamagoshiImage = 'EHOnPps.png';
    }
    return <Image src={tamagoshiImage} alt="Tamagoshi"/>;
}


export const Game = () => {
    // Estados para los parámetros de Tamagoshi
    const [hunger, setHunger] = useState(50);
    const [age, setAge] = useState(0);
    const [health, setHealth] = useState(100);
    const [record, setRecord] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    // Agrega la variable showGif y establece su valor inicial en false
    const [showGif, setShowGif] = useState(false);
    const [gif, setGif] = useState(null);

    // Modifica la función showGif para que cambie el valor de showGif a true
    // y establezca un temporizador para que vuelva a cambiar el valor de showGif a false
    // después de 3 segundos
    const displayGif = () => {
        setShowGif(true);
        setTimeout(() => {
                setShowGif(false);
            }, 3000
        );
    };


    // Function to update the age of the Tamagoshi
    useInterval(() => {
        setAge(age + 1);
        if (age === 99) {
            swal({
                title: 'Kirby has had a long life, congratulations!',
                text: 'Do you want to reset the game?',
                icon: 'Success',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 30000);
    // Función para actualizar el tiempo de juego
    useInterval(() => {
        setElapsedTime(elapsedTime + 1);
    }, 1000); // Actualiza cada segundo
    // Función para actualizar el estado de hambre del Tamagoshi
    useInterval(() => {
        setHunger(hunger - 1);
        if (hunger === 0) {
            swal({
                title: 'Kirby has starved to death',
                text: 'Do you want to reset the game?',
                icon: 'warning',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 2000);
    // Función para actualizar el estado de salud del Tamagoshi
    useInterval(() => {
        setHealth(health - 1);
        if (health === 0) {
            swal({
                title: 'Kirby has died of illness',
                text: 'Do you want to reset the game?',
                icon: 'warning',
                buttons: ['Cancel', 'OK'],
                dangerMode: true,
                content: {
                    element: 'div',
                    attributes: {
                        className: 'custom-swal-text, custom-swal'
                    }
                }
            }).then((result) => {
                if (result) {
                    // Restart the game
                    window.location.reload();
                } else {
                    // Close the page
                    window.close();
                }
            });
        }
    }, 3000);
    // Función para actualizar el record de edad
    const updateRecord = () => {
        if (age > record) {
            setRecord(age);
            localStorage.setItem('record', age);
        }
    }
    // Formatea el tiempo de juego
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const isMoving = true;
    // window.onload = func;
    // Agrega un 0 a la izquierda si el número es menor a 10
    const elapsedTimeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    // Actualiza el record de edad cuando cambia la edad
    useEffect(updateRecord, [age, record]);
    // Carga el record de edad desde el localStorage
    useEffect(() => {
        // Código que utiliza la variable "record"
        const storedRecord = localStorage.getItem('record');
        if (storedRecord) {
            setRecord(parseInt(storedRecord));
        }
    }, []);

    return (
        <div className="egg">
            <h1 className="character-name">Kirby</h1>
            <h2 className="character-age"><BiTime/> Age: {age} Years</h2>
            <h2 className="character-age"><GiLaurelsTrophy/> Record: {record} Years</h2>

            <div className="stats">
                Hungry: <ProgressBar now={hunger} variant="warning" label={`${hunger}%`}/>
                Health: <ProgressBar now={health} variant="info" label={`${health}%`}/>
            </div>
            <div className="square" id="character">
                <div className="square-content">
                    {/* Muestra el GIF si showGif es true y muestra el tamagoshi si showGif es false */}
                    {showGif ? <img className='gif' src={gif} alt="Gif"/> :
                        <TamagoshiImage hunger={hunger} health={health}/>}

                </div>
            </div>

            <div>
                <div className="buttons">
                    <button onClick={() => {
                        setHunger(Math.min(hunger + 10, 100));
                        setGif('giphy0.webp');
                        displayGif();
                    }}>
                        <IoFastFoodOutline/> Feed
                    </button>
                    <button onClick={() => {
                        setHealth(Math.min(health + 10, 100));
                        setGif('tumblr_n0w505oIli1ru09vqo1_500.gifv');
                        displayGif();
                    }}>

                        <MdOutlineHealthAndSafety/> Heal
                    </button>
                    <button className="buttons" onClick={() => {
                    }}>stop
                    </button>
                </div>
            </div>
        </div>
    )
}
function makeNewPosition(){

    // Get viewport dimensions (remove the dimension of the div)
    let h = window.height() - 50;
    let w = window.width() - 50;

    let nh = Math.floor(Math.random() * h);
    let nw = Math.floor(Math.random() * w);

    return [nh,nw];

}
function Move(){
    let isMoving = true;
    let newq = makeNewPosition();
    while (isMoving){
        let tama = document.getElementById("character");
        tama.animate({top: newq[0], left: newq[1]}, 1000);
    }
}
function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
