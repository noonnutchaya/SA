import React, { Component } from "react";

import LoginComponent from "./LoginComponent";
import './CSS/VendorPage.css';

class VendorPage extends Component {
  render() {
    return (
      <div className="layout">
        <h1 className="title"> ยืนยันตัวตนแม่ค้า </h1>
        <LoginComponent />
      </div>
    );
  }
}

export default VendorPage;