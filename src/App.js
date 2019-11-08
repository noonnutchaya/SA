import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import InputInfo from './InputInfo';
import OrderFormWithCheck from './OrderFormWithCheck';
import FileUpload from './FileUpload';
import Login from './Login';
import HomePage from './HomePage';
import ShowWelcomePage from './ShowWelcomePage';
import TestErrorInput from './TestErrorInput';
import LogInWithCheck from './LogInWithCheck';
import firebase from './firebase';
import ShowSeccessPage from './ShowSeccessPage';
import seccessPage from './images/seccessPage.png';
import DownloadFile from './DownloadFile';
import './CSS/setImg.css';

// var d = new Date();
// console.log(Math.floor( Date.now() / 1000 ));

function App() {
  return (
      //  <div><InputInfo/></div>
      //  <div><FileUpload/></div>
      //  <img src={seccessPage} id="setBG" />
      //  <div><ShowSeccessPage/></div>
      //  <div><HomePage/></div>

      //  <div><ShowWelcomePage/></div>
        // <div><DownloadFile/></div>
      // <div><Login/></div>
      
      //  <div><TestErrorInput/></div>

//  <div><LogInWithCheck/></div>
  // <div><OrderFormWithCheck/></div>

      <Router> 
        <Switch>
          
          <Route exact path='/'   component = {ShowWelcomePage} />
          <Route path='/Login'     component = {LogInWithCheck} />
          <Route path='/Home'     component = {HomePage} />
          <Route path='/Order'    component = {OrderFormWithCheck} />
          <Route path='/Confirm'  component = {ShowSeccessPage} />
          <Route path='/Check'  component = {DownloadFile} />

        </Switch>
      </Router>




  );
}

export default App;
