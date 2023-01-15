import React, {useEffect, useRef, useState} from 'react';
import './GameWindow.css'
import Fighter from "../../Fighter";
import Sprite from "../../Sprite";
import HealthBar from "../HealthBar/HealthBar";
import Result from "../Result/Result";
import PrepareToFight from "../PrepateToFight/PrepareToFight";
import gsap from "gsap"

import backgroundImage from '../../images/backgr.png'
import playerImage from '../../images/player.png'
import enemyImage from '../../images/enemy.png'
import '../PrepateToFight/CountDown.css'

const GameWindow = (props) => {

    const container = document.getElementsByClassName("body");
    const screenWidth = container[0].clientWidth;
    const screenHeight = container[0].clientHeight;

    const gameDuration = 30

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [playerHealth, setPlayerHealth] = useState(100)
    const [enemyHealth, setEnemyHealth] = useState(100)
    const [playerName, setPlayerName] = useState("Player 1")
    const [enemyName, setEnemyName] = useState("Player 2")

    const [time, setTimer] = useState(gameDuration)
    const timerID = useRef()
    const timeID = useRef()
    function startTimer(){
        clearTimeout(timeID.current)
        timerID.current = setInterval(() => {
            if (time > 0){
                setTimer(time => time - 1 )
            }
        }, 1000)
        return() => clearInterval(timerID.current)
    }
    useEffect(()=>{
        timeID.current = setTimeout(startTimer, 4000)
    },[])

    function changeOpacity(mode){
        if (mode === 'dark'){
            contextRef.current.globalAlpha = 0.4;
        } else {
            contextRef.current.globalAlpha = 1;
        }
    }
    useEffect(()=>{
            // const ratio = Math.ceil(window.devicePixelRatio)
            const ratio = 1

            const canvas = canvasRef.current

            canvas.width = screenHeight * ratio
            canvas.height = screenWidth * ratio

            canvas.style.width = `${screenHeight}px`
            canvas.style.height = `${screenWidth}px`

            const context = canvas.getContext("2d")
            contextRef.current = context
            setTimeout(changeOpacity('dark'),0)
            setTimeout(changeOpacity,4000)
        const background = new Sprite(contextRef,
                {
                    position: {
                        x: 0,
                        y: 0,
                    },
                    imageSrc: backgroundImage
                })
            const player = new Fighter(contextRef,{
                position:{
                    x: screenHeight - screenHeight,
                    y: 100
                },
                velocity:{
                    x: 0,
                    y: 0
                },
                offset:{
                    x: 0,
                    y: 0
                },
                name: "Bruce",
                imageSrc: playerImage,
                color: '#7B23EB'
            })
            const enemy = new Fighter(contextRef,{
                position:{
                    x: screenHeight - 320,
                    y: 100
                },
                velocity:{
                    x: 0,
                    y: 0
                },
                offset:{
                    x: -70,
                    y: 0
                },
                name: "Alice",
                imageSrc: enemyImage,
                color: '#FF7D1F'
            })
            function startGame(){
                player.dead = false
                enemy.dead = false
            }
            setTimeout(startGame, 4000)
            setPlayerName(player.name)
            setEnemyName(enemy.name)

            const keys ={
                a:{
                    pressed: false
                },
                d:{
                    pressed: false
                },
                w:{
                    pressed: false
                },
                ArrowLeft:{
                    pressed: false
                },
                ArrowRight:{
                    pressed: false
                },
            }
            function animate(){
                window.requestAnimationFrame(animate)
                contextRef.current.fillStyle = 'black'
                contextRef.current.fillRect(0,0, canvas.width, canvas.height)

                background.update()
                player.update()
                enemy.update()

                player.velocity.x = 0
                enemy.velocity.x = 0

                // движение игрока
                if(keys.a.pressed && player.lastKey === 'a' && player.position.x > 0 ){
                    player.velocity.x = -7
                } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x < 992){
                    player.velocity.x = 7
                }

                // движение врага
                if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > 0){
                    enemy.velocity.x = -7
                } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x < 992){
                    enemy.velocity.x = 7
                }

                // попадание в хитбокс игрока
                if ( rectangularCollision({
                        rectangle1: player,
                        rectangle2: enemy,
                    })
                    && player.isAttacking) {
                    player.isAttacking = false
                    enemy.health -= 20
                    gsap.to('#enemyHealth',{
                        width: enemy.health + "%"
                    })
                }
                // попадание в хитбокс врага
                if ( rectangularCollision({
                        rectangle1: enemy,
                        rectangle2: player,
                    })
                    && enemy.isAttacking) {
                    enemy.isAttacking = false
                    player.health -= 20
                    gsap.to('#playerHealth',{
                        width: player.health + "%"
                    })
                }
                function rectangularCollision({rectangle1, rectangle2}){
                    return (
                        rectangle1.hitBox.position.x + rectangle1.hitBox.width >= rectangle2.position.x
                        && rectangle1.hitBox.position.x <= rectangle2.position.x + rectangle2.width
                        && rectangle1.hitBox.position.y + rectangle1.hitBox.height >= rectangle2.position.y
                        && rectangle1.hitBox.position.y <= rectangle2.position.y + rectangle2.height
                    )
                }
                window.addEventListener('keydown', (event)=> {
                    if (!player.dead && !enemy.dead) {
                        switch (event.key) {
                            case 'd':
                                keys.d.pressed = true
                                player.lastKey = 'd'
                                break
                            case 'a':
                                keys.a.pressed = true
                                player.lastKey = 'a'
                                break
                            case 'w':
                                if (player.velocity.y === 0){
                                    player.velocity.y = -20
                                }
                                break
                            // удар рукой
                            case 'i':
                                player.attack()
                                break
                            // удар ногой
                            case 'k':
                                player.attack()
                                break
                            // движение врага
                            case 'ArrowRight':
                                keys.ArrowRight.pressed = true
                                enemy.lastKey = 'ArrowRight'
                                break
                            case 'ArrowLeft':
                                keys.ArrowLeft.pressed = true
                                enemy.lastKey = 'ArrowLeft'
                                break
                            case 'ArrowUp':
                                if (enemy.velocity.y === 0){
                                    enemy.velocity.y = -20
                                }
                                break
                            case 'ArrowDown':
                                enemy.attack()
                                break
                        }
                    }
                })
                window.addEventListener('keyup', (event)=> {
                    // игрок
                    switch (event.key){
                        case 'd':
                            keys.d.pressed = false
                            break
                        case 'a':
                            keys.a.pressed = false
                            break
                    }
                    // враг
                    switch (event.key){
                        case 'ArrowRight':
                            keys.ArrowRight.pressed = false
                            break
                        case 'ArrowLeft':
                            keys.ArrowLeft.pressed = false
                            break
                    }
                })

                setEnemyHealth(num => enemy.health)
                if (enemy.health === 0){
                    enemy.dead = true
                }
                setPlayerHealth(num => player.health)
                if (player.health === 0){
                    player.dead = true
                }
                function resultTie(){
                    if (enemyHealth === playerHealth){
                        player.dead = true
                        enemy.dead = true
                    }
                }
                setTimeout(resultTie,  gameDuration * 1000 + 4000)

            }
            animate()
    }, [])
    const gameResult = (playerHealth, enemyHealth, timerID) => {
        clearInterval(timerID.current)
        if (playerHealth === enemyHealth){
            return (<Result playerName={''} result={'TIE'} newGame={props.newGame} setNewGame={props.setNewGame}/>)
        } else if (playerHealth > enemyHealth){
            return (<Result playerName={playerName} result={' Wins'} newGame={props.newGame} setNewGame={props.setNewGame}/>)
        } else if (playerHealth < enemyHealth){
            return (<Result playerName={enemyName} result={' Wins'} newGame={props.newGame} setNewGame={props.setNewGame}/>)
        }
    }
    return (
        <div className="window_container">
            <PrepareToFight/>
            <HealthBar time={time} playerName={playerName} enemyName={enemyName}/>
            {playerHealth === 0 || enemyHealth === 0 || time === 0 ? gameResult(playerHealth, enemyHealth, timerID) : false}
            <canvas className="canvas_container" ref={canvasRef}></canvas>
        </div>
    );
};

export default GameWindow;