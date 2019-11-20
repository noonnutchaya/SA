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
import RegistrationForm from './RegistrationForm';
import TestCollectDataToEmail from './TestCollectDataToEmail';
import TestUserProfile from './TestUserProfile';
import ShowInfoUser from './ShowInfoUser';
import ChangePassword from './ChangePassword';
import HomePageCustomer from './HomePageCustomer';
import CheckCustomerOrderPage from './CheckCustomerOrderPage';
import ShowHomePage from './ShowHomePage';
import AdminWelcome from './AdminWelcome';
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
  // <div><RegistrationForm/></div>
  // <div><TestCollectDataToEmail/></div>
  //  <div><TestUserProfile/></div>
  //  <div><ShowInfoUser/></div>
    //  <div><ChangePassword/></div>
    //  <div><LogOut/></div>
    // // <div><CheckCustomerOrderPage/></div>
    //     <div><AdminWelcome/></div>



      <Router> 
        <Switch>
          
          <Route exact path='/'   component = {ShowWelcomePage} />
          <Route path='/Login'     component = {LogInWithCheck} />
          <Route path='/Home'     component = {ShowWelcomePage} />
          <Route path='/HomePage'     component = {HomePageCustomer} />
          {/* <Route path='/HomePage'     component = {ShowHomePage} /> */}
          <Route path='/Order'    component = {OrderFormWithCheck} />
          {/* <Route path='/Confirm'  component = {ShowSeccessPage} />
          <Route path='/Check'  component = {DownloadFile} /> */}
          <Route path='/UserAccount'  component = {TestUserProfile} />
          <Route path='/OrderList'  component = {CheckCustomerOrderPage} />

        </Switch>
      </Router>




  );
}

export default App;
