import React, { Component } from 'react';
import '../CSS/table.css';
import * as firebase from 'firebase';
import { conditionalExpression } from '@babel/types';
const db = firebase.firestore();
const collection = db.collection("CustomerDBtest");

class TableReportStatus extends Component {
   constructor() {
      super() 
        this.state = {
            data: []
        }
   }

   componentDidMount(){
        db.collection("CustomerDBtest").onSnapshot(querySnapshot => {
            let userDataList = [];
            querySnapshot.forEach((doc) => {
                userDataList.push({
                    Name: doc.data().Name,
                    Info: doc.data().Info,
                    Phone: doc.data().Phone,
                    Price: doc.data().Price,
                    StateWork: doc.data().stateWork,
                    Id: doc.data().idDoc
                })
            });
            this.setState({ data: userDataList });
        })  
   }

   clkUpdate = (word) =>{
        db.collection("CustomerDBtest").where("stateWork", "==", word)
        .onSnapshot((querySnapshot) => {
        const userDataList = [];
        querySnapshot.forEach((doc) => {
            const userData = {
                Name: doc.data().Name,
                Info: doc.data().Info,
                Phone: doc.data().Phone,
                Price: doc.data().Price,
                StateWork: doc.data().stateWork,
                Id: doc.data().idDoc
            }
            userDataList.push(userData);
        });
        this.setState({ data: userDataList })
        });
    }

    renderTableHeader() {
        return <tr>
            <th> Name </th>
            <th> Info </th>
            <th> Phone </th>
            <th> Price </th>
            <th> StateWork </th>
        </tr>
    }

    renderTableData() {
        return this.state.data.map((student, index) => {
            const { Id, Name, Info, Phone, Price, StateWork } = student //destructuring
            return (
                <tr key={Id}>
                    <td>{Name}</td>
                    <td>{Info}</td>
                    <td>{Phone}</td>
                    <td>{Price}</td>
                    <td>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {StateWork}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={this.selectState( 1, Id)}> Doing </a>
                                <a className="dropdown-item" onClick={this.selectState( 2, Id)}> Done </a>
                                <a className="dropdown-item" onClick={this.selectState( 3, Id)}> Received </a>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    selectState = (status, idOrder) => {
        return function () {
            switch (status) {
                case 1:
                    collection.doc(idOrder).update(
                        {stateWork: "Doing"}
                    )
                    break;
                case 2:
                    collection.doc(idOrder).update(
                        {stateWork: "Done"}
                    )
                    break;
                case 3:
                    collection.doc(idOrder).update(
                        {stateWork: "Received"}
                    )
                    break;
                
                default:
                    break;
            }
        }
    }

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