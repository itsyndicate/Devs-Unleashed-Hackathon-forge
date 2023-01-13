import React from 'react';
import './Home.css';
import { Link } from "react-router-dom"

const Home = () =>{
    return(
        <div className="home-container">
            <h1>Welcome to the Hand Tracking App!</h1>
            <Link className="button" to='/hand-tracker'>HandTracker</Link>
        </div>
        
    );
}

export default Home;