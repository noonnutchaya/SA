import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import welcomeBGAdmin from './images/welcomeBGAdmin.png';
import homeIcon from './images/homeIcon.png';
import welcomeIcon from './images/enterPageGreen.png';
import welcomeBGAdmin2 from './images/welcomeBGAdmin2.png';
import './CSS/setImg.css';
class AdminWelcome extends React.Component {

    render() {
        
        return (
            <div class = "setGreenBG" >

                {/* <div id="SetTopic"> ร้านน้องหนุน </div>
                <div id="SetSent"> หน้าเว็บไซต์สำหรับ Admin </div> */}
                 <img src={welcomeBGAdmin} id ="setBG" />
                
                <Link to=""> <img src={welcomeIcon} id="logoWelcome" />  </Link>

                <img src={welcomeBGAdmin2} id ="setBG" />

            </div>

        );
    }

}

export default AdminWelcome;