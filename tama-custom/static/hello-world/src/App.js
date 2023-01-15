import 'bootstrap/dist/css/bootstrap.css';
import FAQ from './FAQ';
import React, {useEffect, useState} from 'react';
import {PopUp, PopUpEdit} from "./PopUp";
import {Game} from './Game';
import {Image} from "react-bootstrap";
import {requestJira} from "@forge/bridge";
import {getObjects} from "./utils/near.js";
import {handleMint} from "./utils/actions.js";

const TamagoshiGame = () => {
    const [isSigned, setIsSigned] = useState(true);
    let [isNewUser, setIsNewUser] = useState(false);
    const [isFAQVisible, setIsFAQVisible] = useState(false);
    let count = 0;
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
    return (


            <div className='fondo'>
                {/* Tamagoshi */}
                {/* <Egg /> */}
                <Game/>
                {/*{isSigned ? <>*/}
                {/*        <button onClick={() => signOut()}>Sign out</button>*/}
                {/*        <button onClick={() => mint()}>Mint</button>*/}
                {/*    </>*/}
                {/*    :*/}
                {/*    <button className="signInButton" onClick={() => signIn()}>Sign in</button>*/}
                {/*}*/}
            </div>
    );
};

export default TamagoshiGame;
