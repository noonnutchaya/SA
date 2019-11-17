import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../CSS/table.css';
import * as firebase from 'firebase';
import { conditionalExpression } from '@babel/types';

const db = firebase.firestore();
const collection = db.collection("Users");

class TableCustomerList extends Component {

    constructor() {
        super() 
          this.state = {
              data: []
          }
     }
  
     componentDidMount(){
          db.collection("Users").orderBy("name").onSnapshot(querySnapshot => {
              let userDataList = [];
              querySnapshot.forEach((doc) => {
                  userDataList.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    phoneNumber: doc.data().phoneNumber
                  })
              });
              this.setState({ data: userDataList });
          })  
     }

   
    renderTableHeader() {
        return <tr>
            <th> ชื่อ </th>
            <th> Email </th>
            <th> เบอร์โทรศัพท์ </th>
            <th> รายการสั่งงาน </th>
        </tr>
    }

    renderTableData() {
        return this.state.data.map((user, index) => {
            const { name, email, phoneNumber } = user //destructuring
            return (
                <tr>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phoneNumber}</td>
                    <td>
                        <Link
                            to={{
                                pathname: "/showOrder",
                                data: email // your data array of objects
                            }}
                        >
                            <button>Show</button>
                        </Link>
                    </td>
                </tr>
            )
        })
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
         </div>
      )
   }
}

export default TableCustomerList 