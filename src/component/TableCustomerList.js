import React, { Component } from 'react';
import '../CSS/table.css';
import * as firebase from 'firebase';
import { conditionalExpression } from '@babel/types';
const db = firebase.firestore();
const collection = db.collection("CustomerDBtest");

class TableReportStatus extends Component {
   

   render() { 
      return (
         <div>
            <table id='students'>
               <tbody>
                {this.renderTableHeader()}
                  {this.renderTableData()}
               </tbody>
            </table>
            <button className="btn btn-secondary" onClick={() => this.clkUpdate("Order")}>Order</button>
            <button className="btn btn-secondary" onClick={() =>this.clkUpdate("Doing")}>Doing</button>
            <button className="btn btn-secondary" onClick={() =>this.clkUpdate("Done")}>Done</button>
            <button className="btn btn-secondary" onClick={() =>this.clkUpdate("Received")}>Received</button>
         </div>
      )
   }
}

export default TableReportStatus 