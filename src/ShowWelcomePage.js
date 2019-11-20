import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import welcomePage from './images/customerWelcome.png';
import footWelcomePage from './images/customerWelcome2.png';
import welcomeIcon from './images/welcomeIcon.png';
import './CSS/setImg.css';



class ShowWelcomePage extends React.Component {

    render() {

        return (
            <div class="setBGCustomer">

                <img src={welcomePage} id="setBG" />
                <Link to="/Login"> <img src={welcomeIcon} id="logoWelcomeCustomer" />  </Link>
                <img src={footWelcomePage} id ="setBG" />


            </div>

        );
    }

}

export default ShowWelcomePage;