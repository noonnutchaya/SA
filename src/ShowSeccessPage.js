import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import seccessPage from './images/seccessPage.png';
import homeIcon from './images/homeIcon.png';
import './CSS/setImg.css';
class ShowSeccessPage extends React.Component {

    render() {
        
        return (
            <div>
                <img src={seccessPage} id="setBG" />
                {/* <img src={homeIcon} id="setHomeIcon"/> */}

                <Link to="/Home"><img src={homeIcon} id="setHomeIcon" /></Link>

            </div>

        );
    }

}

export default ShowSeccessPage;