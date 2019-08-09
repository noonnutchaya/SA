import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import welcomePage from './images/welcomePage.png';
import footWelcomePage from './images/footWelcomePage.png';
import welcomeIcon from './images/welcomeIcon.png';
import './CSS/setImg.css';

import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
  } from 'antd';

class ShowWelcomePage extends React.Component {

    render() {
        
        return (
            <div id = "allBGWelcome">

                <img src={welcomePage} id ="setBG" />
                <Link to="/Home"> <img src={welcomeIcon} id="logoWelcome" />  </Link>
                <img src={footWelcomePage} id ="setBG" />


            </div>

        );
    }

}

export default ShowWelcomePage;