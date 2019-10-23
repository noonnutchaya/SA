import React, { Component } from 'react';
import TableReportStatus from './component/TableReportStatus';
import firebase from './firebase.js';
import {Redirect, } from "react-router-dom";
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
      <div >
        <h1>Work State Report Table</h1>
        <TableReportStatus></TableReportStatus>
        {/* <button onClick={() => this.logout()}></button> */}
      </div>
    );
  }
}
export default ReportOrderPage;