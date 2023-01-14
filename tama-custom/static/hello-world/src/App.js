import 'bootstrap/dist/css/bootstrap.css';
import FAQ from './FAQ';
import React, {useEffect, useState} from 'react';
import {PopUp, PopUpEdit} from "./PopUp";
import {Game} from './Game';
import {Image} from "react-bootstrap";
import {requestJira} from "@forge/bridge";
import {getObjects} from "./utils/near.js";
import {handleMint} from "./utils/actions.js";
import wakeUp from "./assets/wakeup.wav"

const TamagoshiGame = () => {
    const [isSigned, setIsSigned] = useState(true);
    let [isNewUser, setIsNewUser] = useState(false);
    const [isFAQVisible, setIsFAQVisible] = useState(false);
    let count = 0;
    let firstLogin = 0;

    const getProject = async () => {
        const response = (await requestJira('/rest/api/3/project'));
        const data = await response.json();
        return (data[0].id);
    }
    const getUsers = async () => {
        const response = (await requestJira('/rest/api/3/users/search?'));
        const data = await response.json();
        return (data[0].accountId);
    }

    const toggleLogin = async () => {
        const audio = new Audio(wakeUp)
        audio.play();
        firstLogin++;
        console.log("start executing toggleLogin!!");
        console.log(isNewUser);

        const userID = await getUsers();
        const projectID = await getProject();
        const response = await fetch(`https://backend.guard-lite.com/api/v1/taskogotchi?account_id=${userID}&project_id=${projectID}`, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = response.status;
        if (result === 404) {
            setIsNewUser(true);
            count++;


        } else {
            setIsNewUser(false);
            count = 0;
        }

        if (count > 0) {
            alert("Please save character to proceed!");
        }

        console.log(isNewUser);


    }
    //
    // useEffect(() => {
    //     getObjects().then(r => {
    //         const {wallet} = r;
    //         setIsSigned(wallet.isSignedIn());
    //     });
    // }, []);
    //
    // const signIn = () => {
    //     const nftContractName = "nft-tamagotchi.testnet";
    //     getObjects().then(r => {
    //         const {wallet} = r;
    //         wallet.requestSignIn(nftContractName, "NFT Tamagotchi");
    //     })
    // };
    //
    // const signOut = () => {
    //     getObjects().then(r => {
    //         const {wallet} = r;
    //         wallet.signOut();
    //         setIsSigned(false);
    //     })
    // };
    //
    // const mint = () => {
    //     getObjects().then(r => {
    //         const {wallet} = r;
    //         handleMint(wallet.getAccountId(), "", "", "", "")
    //     })
    // }
    window.onload = toggleLogin();
    return (

        <>
            <div className='fondo'>
                {/* Tamagoshi */}
                {/* <Egg /> */}
                <Game/>
                {isNewUser && <PopUpEdit toggleLogin={toggleLogin}/>}
                {isSigned ? <>
                        <button onClick={() => signOut()}>Sign out</button>
                        <button onClick={() => mint()}>Mint</button>
                    </>
                    :
                    <button className="signInButton" onClick={() => signIn()}>Sign in</button>
                }
            </div>
        </>
    );
};

export default TamagoshiGame;
