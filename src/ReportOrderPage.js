import React, { Component } from 'react';
import TableReportStatus from './component/TableReportStatus';

class ReportOrderPage extends React.Component {

  render() {
    return (
      <div >
        <h1>Work State Report Table</h1>
        <TableReportStatus></TableReportStatus>
      </div>
    );
  }
}
export default ReportOrderPage;