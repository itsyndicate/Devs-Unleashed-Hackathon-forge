import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from 'react';
import {PopUpEdit} from "./PopUp";
import {Game} from './Game';
import {requestJira} from "@forge/bridge";
import wakeUp from "./assets/wakeup.wav"

const TamagoshiGame = () => {
    let [isNewUser, setIsNewUser] = useState(false);

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
        new Audio(wakeUp).play();
        firstLogin++;

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
    // toggleLogin();
    return (

        <div className='fondo'>
            <Game/>
        </div>
    );
};

export default TamagoshiGame;
