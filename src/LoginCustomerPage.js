import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginCustomerComponent from "./component/LoginCustomerComponent";
import './CSS/VendorPage.css';

class LoginCustomerPage extends Component {
  render() {
    return (
      <div className="layout">
        <h1 className="title"> ยืนยันตัวตนลูกค้า </h1>
        <LoginCustomerComponent />
        <div className="regis-form">
            <Link to = "/regisCustomer">     
                <a>Register Account</a>
            </Link>
        </div>
      </div>
    );
  }
}

export default LoginCustomerPage;

