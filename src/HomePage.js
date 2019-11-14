import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import checkIcon from './images/checkIcon.png';
import orderIcon from './images/orderIcon.png';
import headerPink from './images/headerPink.png';
import shopName from './images/shopName.png';
import footPink from './images/footWelcomePage.png';
import './CSS/setImg.css';

class HomePage extends React.Component {

    render() {
        
        return (
            
            <div id = "allBgColor" >

                <img src={headerPink} id ="setBG" />

                <Link to = "/portalCustomer">      <img src={orderIcon} id = "logoOrder" />  </Link>
                <Link to = "/vendor"> <img src={checkIcon} id = "logoCheck" />  </Link>

                <img src = {footPink} id = "setBG" />

            </div>

        );
    }

}

export default HomePage;