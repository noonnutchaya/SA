import React, { Component } from 'react';
import TableReportStatus from './component/TableReportStatus';
import firebase from './firebase.js';
import {Redirect, } from "react-router-dom";
import './CSS/reportOrder.css';
import TableCustomerList from './component/TableCustomerList';
const auth = firebase.auth();
const firestore = firebase.firestore();


class ReportOrderPage extends React.Component {

  constructor(){
    super()

    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        window.location = '/home'; 
      }else{
        const email = auth.currentUser.email
        let emailVendor = []

        

        firestore.collection("EmailVendor").onSnapshot(querySnapshot => {
          querySnapshot.forEach((doc) => {
              emailVendor.push(doc.data().email)
          });
        })  
        console.log(emailVendor, emailVendor.length)
      
        let isAuthorize = false
        for(let i=0;i <= emailVendor.length;i++){
          if(email === emailVendor[i]){
            isAuthorize = true
          }
          console.log(isAuthorize)
        }
        // if(!isAuthorize){
        //   window.location = '/home'
        // }
      }
    });
  }

  logout = () => {
    firebase.auth().signOut().then(function() {
        window.location = '/home'
    }).catch(function(error) {
        console.log(error)
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Customer List Table</h1>
        <TableCustomerList/>
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    );
  }
}
export default ReportOrderPage;