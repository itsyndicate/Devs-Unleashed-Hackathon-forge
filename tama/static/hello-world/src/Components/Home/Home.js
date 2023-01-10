import React from 'react';
import './Home.css';
import HandTracker from "../HandTracker/HandTracker";


const Home = () =>{
    return(
        <div className="home-container">
            <h1>Welcome to the Hand Tracking App!</h1>
            <HandTracker/>
        </div>
        
    );
}

export default Home;