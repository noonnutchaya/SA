import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import welcomePage from './images/welcomePage.png';
import footWelcomePage from './images/footWelcomePage.png';
import welcomeIcon from './images/welcomeIcon.png';
import './CSS/setImg.css';



class ShowHomePage extends React.Component {

    render() {
        
        return (
            <div id = "allBGWelcome">

                <img src={welcomePage} id ="setBG" />
                {/* <Link to="/Login"> <img src={welcomeIcon} id="logoWelcome" />  </Link> */}
                <img src={footWelcomePage} id ="setBG" />


            </div>

        );
    }

}

export default ShowHomePage;