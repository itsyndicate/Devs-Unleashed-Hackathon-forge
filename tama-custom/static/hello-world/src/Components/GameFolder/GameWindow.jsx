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
import {useEffectOnce} from "../../effects";


const GameWindow = (props) => {
    let socket
    let onOpen = false
    let intervalWaiting
    useEffectOnce(() =>{
        socket = new WebSocket(`wss://backend.guard-lite.com/ws/fight/${props.account_id}`);
        socket.onopen = function (e) {
            onOpen = true
             intervalWaiting = setInterval(()=>{
                socket.send(JSON.stringify({
                    account_id: props.account_id,
                    action: "waiting"
                }))
            },1000)
        };
        socket.onmessage = function (event){
            const eventData = JSON.parse(event.data)
            if (eventData.message === "game_started"){
                setTimer(JSON.parse(event.data).fight.fight_timer.duration)
                clearInterval(intervalWaiting)
                animate()
            }
            if (eventData.message === 'game_over'){
                setTimer(0)
                player.dead = true
                enemy.dead = true
                window.cancelAnimationFrame(windowAnimate)
            }
            if (eventData.data){
                const data = JSON.parse(eventData.data)
                console.log("data action ", data.action)
                if (data.action === 'move'){
                    enemy.position.x = data.playerPosX
                }
                if (data.action === 'jump'){
                    console.log("ENEMY JUMPED")
                    if (data.playerVelY === 0){
                        console.log('Enemy jumped')
                        enemy.velocity.y = -20
                        console.log(enemy)
                    }
                }
                if (data.action === 'waiting'){
                    socket.send(JSON.stringify({
                        account_id: props.account_id,
                        action: "start_game"
                    }))
                    waitingPlayer()
                }
                if (data.action === 'punch' || data.action === 'kick'){
                    console.log('Enemy ATTACK')
                    enemy.attack()
                    if (props.account_id === eventData.fight.player1.health)
                    {
                        player.health = eventData.fight.player1.health

                    } else {
                        player.health = eventData.fight.player2.health
                    }
                    gsap.to('#playerHealth',{
                        width: player.health + "%"
                    })
                }
            }

        }
    })


    const screenHeight = 1273
    const screenWidth = 541

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [playerHealth, setPlayerHealth] = useState(1)
    const [enemyHealth, setEnemyHealth] = useState(1)
    const [playerName, setPlayerName] = useState("Player 1")
    const [enemyName, setEnemyName] = useState("Player 2")

    const [time, setTimer] = useState(1000)

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

            const canvas = canvasRef.current
            const ratio = 1

            canvas.width = screenHeight * ratio
            canvas.height = screenWidth * ratio

            canvas.style.width = `${screenHeight}px`
            canvas.style.height = `${screenWidth}px`

            const context = canvas.getContext("2d")
            contextRef.current = context
            setTimeout(changeOpacity('dark'),0)
            setTimeout(changeOpacity,4000)

            // animate()
        setPlayerName(player.name)
        setEnemyName(enemy.name)
    }, [])
    let healthPlayer
    let healthOpponent
    let namePlayer
    let nameOpponent
    if (props.account_id === props.fightInfo.initiator.player.account_id)
    {
        healthPlayer = props.fightInfo.initiator_health
        healthOpponent = props.fightInfo.opponent_health
        namePlayer = props.fightInfo.initiator.player.name
        nameOpponent = props.fightInfo.opponent.player.name

    } else {
        healthPlayer = props.fightInfo.opponent_health
        healthOpponent = props.fightInfo.initiator_health
        namePlayer = props.fightInfo.opponent.player.name
        nameOpponent = props.fightInfo.initiator.player.name
    }
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
        name: namePlayer,
        imageSrc: playerImage,
        color: '#7B23EB',
        health: healthPlayer
    })
    gsap.to('#playerHealth',{
        width: player.health + "%"
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
        name: nameOpponent,
        imageSrc: enemyImage,
        color: '#FF7D1F',
        health: healthOpponent
    })
    gsap.to('#enemyHealth',{
        width: enemy.health + "%"
    })
    function startGame(){
        player.dead = false
        enemy.dead = false
    }
    setTimeout(startGame, 4000)


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
    function waitingPlayer(){
        // contextRef.current.fillStyle = 'black'
        // contextRef.current.fillRect(0,0, canvas.width, canvas.height)
        contextRef.current.fillRect(0,0, screenWidth, screenHeight)
        background.update()
        player.update()
    }
    let windowAnimate
    function animate(){
        let hitType


        contextRef.current.fillStyle = 'black'
        // contextRef.current.fillRect(0,0, canvas.width, canvas.height)
        contextRef.current.fillRect(0,0, screenWidth, screenHeight)

        background.update()
        player.update()
        enemy.update()

        player.velocity.x = 0
        enemy.velocity.x = 0


        // движение игрока
        if(keys.a.pressed && player.lastKey === 'a' && player.position.x > 0 ){
            player.velocity.x = -7
            socket.send(JSON.stringify({
                account_id: props.account_id,
                action: "move",
                playerPosX: player.position.x
            }))
        } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x < 992){
            player.velocity.x = 7
            socket.send(JSON.stringify({
                account_id: props.account_id,
                action: "move",
                playerPosX: player.position.x
            }))
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
                            socket.send(JSON.stringify({
                                account_id: props.account_id,
                                action: "jump",
                                playerVelY: player.position.y
                            }))
                        }
                        break
                    // удар рукой
                    case 'i':
                        player.attack()
                        hitType = 'punch'
                        break
                    // удар ногой
                    case 'k':
                        player.attack()
                        hitType = 'kick'
                        break
                }
            }
        })
        // попадание в хитбокс игрока

        // gsap.to('#playerHealth',{
        //     width: player.health + "%"
        // })
        if ( rectangularCollision({
                rectangle1: player,
                rectangle2: enemy,
            })
            && player.isAttacking) {
            socket.send(JSON.stringify({
                account_id: props.account_id,
                action: hitType,
            }))
            player.isAttacking = false
            enemy.health -= 10
            gsap.to('#enemyHealth',{
                width: enemy.health + "%"
            })
        }
        window.addEventListener('keyup', (event)=> {
            // игрок
            switch (event.key) {
                case 'd':
                    keys.d.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
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
        setTimeout(resultTie,  time * 1000 + 4000)
        // animate()
        windowAnimate = window.requestAnimationFrame(animate)
    }
    const gameResult = (playerHealth, enemyHealth, timerID) => {
        clearInterval(timerID.current)
        if (playerHealth === enemyHealth){
            return (<Result playerName={''} result={'TIE'} toggleDrawGame={props.toggleDrawGame}/>)
        } else if (playerHealth > enemyHealth){
            return (<Result playerName={playerName} result={' Wins'} toggleDrawGame={props.toggleDrawGame}/>)
        } else if (playerHealth < enemyHealth){
            return (<Result playerName={enemyName} result={' Wins'} toggleDrawGame={props.toggleDrawGame}/>)
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