import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import TableReportStatus from "./component/TableReportStatus";
import './CSS/VendorPage.css';

class ShowOrderListPage extends Component {


  render() {
    const { data } = this.props.location
    return (
      <div className="layout">
        <h1 className="title"> แสดงรายการสั่งงาน </h1>
        <h1>{data}</h1>
        <TableReportStatus email={data}/>
      </div>
    );
  }
}

export default ShowOrderListPage;

