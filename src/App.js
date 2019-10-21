import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import InputInfo from './InputInfo';
import FileUpload from './FileUpload';
import HomePage from './HomePage';
import ShowWelcomePage from './ShowWelcomePage';
import firebase from './firebase';
import ShowSeccessPage from './ShowSeccessPage';
import seccessPage from './images/seccessPage.png';
import DownloadFile from './DownloadFile';
import './CSS/setImg.css';
import SignUp from './SignUp';
import VendorPage from './VendorPage';
import ReportOrderPage from './ReportOrderPage';

function App() {
  return (
      //  <div><InputInfo/></div>
      //  <div><FileUpload/></div>
      //  <img src={seccessPage} id="setBG" />
      //  <div><ShowSeccessPage/></div>
      //  <div><HomePage/></div>

            //  <div><ShowWelcomePage/></div>
            //  <div><DownloadFile/></div>


      <Router>
        <Switch>
          <Route exact path='/'   component = {ShowWelcomePage} />
          <Route path='/home'     component = {HomePage} />
          <Route path='/order'    component = {InputInfo} />
          <Route path='/confirm'  component = {ShowSeccessPage} />
          <Route path='/signup' component = {SignUp} />
          <Route path='/check'  component = {DownloadFile} />
          <Route path='/vendor' component = {VendorPage} />
          <Route path="/reportOrderPage" component = {ReportOrderPage} />
        </Switch>
       </Router>


  );
}

export default App;
