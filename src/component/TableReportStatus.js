import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/table.css';
import * as firebase from 'firebase';
import { conditionalExpression } from '@babel/types';
import TestCollectDataToEmail from '../TestCollectDataToEmail';
const db = firebase.firestore();
const storage = firebase.storage();
const dataCollectionName = "testInputFormWithCheck";
const collection = db.collection(dataCollectionName);

class TableReportStatus extends Component {
   constructor() {
      super() 
        this.state = {
            data: []
        }
   }

   componentDidMount(){
        db.collection(dataCollectionName).where("emailUser", "==", this.props.email).onSnapshot(querySnapshot => {
            let userDataList = [];
            querySnapshot.forEach((doc) => {
                userDataList.push({
                    Price: doc.data().Price,
                    addreass: doc.data().addreass ? doc.data().addreass:"-",
                    company: doc.data().company ? doc.data().company:"-",
                    copies: doc.data().copies,
                    days: doc.data().days,
                    detailOrder: doc.data().detailOrder,
                    emailUser: doc.data().emailUser,
                    months: doc.data().months,
                    orderDate: doc.data().orderDate,
                    phoneNum: doc.data().phoneNum,
                    quotationNum: doc.data().quotationNum,
                    quotationPaper: doc.data().quotationPaper,
                    vatNum: doc.data().vatNum ? doc.data().vatNum:"-",
                    years: doc.data().years,
                    stateWork: doc.data().stateWork,
                    Id: doc.data().idDoc,
                    workLink: doc.data().workLink
                });
            });
            this.setState({ data: userDataList });
        })  
   }

   sortByDate = (data) => {
       let sorted = [];

       return null
   }

   clkUpdate = (word) =>{
        db.collection(dataCollectionName).where("stateWork", "==", word)
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
            <th> วันที่สั่งงาน </th>
            <th> หมายเลขใบเสนอราคา </th>
            <th> รายละเอียดงาน </th>
            <th> จำนวนชุด </th>
            <th> เบอร์โทรศัพท์ </th>
            <th> ที่อยู่ </th>
            <th> ชื่อบริษัท </th>
            <th> หมายเลขกำกับภาษี </th>
            <th> ราคารวม </th>
            <th> สถานะงาน </th>
            <th> Download File </th>
        </tr>
    }

    downloadFile = (url) =>{
        return function(){
            var httpsReference = storage.refFromURL(url);
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
        }
    }

    renderContentTableOrder(){
        return this.state.data.map((orderItem, index) => {
            const { orderDate, quotationNum, detailOrder
                , copies, phoneNum, addreass
            , company, vatNum, Price, stateWork, Id, workLink} = orderItem 
            return (
                <tr>
                    <td>{orderDate}</td>
                    <td>{quotationNum}</td>
                    <td>{detailOrder}</td>
                    <td>{copies}</td>
                    <td>{phoneNum}</td>
                    <td>{addreass}</td>
                    <td>{company}</td>
                    <td>{vatNum}</td>
                    <td>{Price}</td>
                    <td>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {stateWork}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={this.selectState( 1, Id)}> Doing </a>
                                <a className="dropdown-item" onClick={this.selectState( 2, Id)}> Done </a>
                                <a className="dropdown-item" onClick={this.selectState( 3, Id)}> Received </a>
                                <a className="dropdown-item" onClick={this.selectState( 4, Id)}> abort </a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <button className="btn btn-secondary" onClick={this.downloadFile(workLink)}> Download </button>
                    </td>
                </tr>
            )
        })
    }

    renderTableData() {
        if(this.state.data.length == 0){
            return (
                <tbody>
                    {this.renderTableHeader()}
                    <tr> 
                        <td colSpan="11">--No Data--</td>
                    </tr>
                </tbody>
            );
        }else{
            return(
                <tbody>
                    {this.renderTableHeader()}
                    {this.renderContentTableOrder()}
                </tbody>
            );
        }


        
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
                case 4:
                    collection.doc(idOrder).delete().then(function() {
                        alert("Delete this order complete.");
                    }).catch(function(error){
                        console.log("Delete incomplete!");
                    })
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
                    {this.renderTableData()}
                </table>
                <button className="btn btn-secondary" onClick={() => this.clkUpdate("Order")}>Order</button>
                <button className="btn btn-secondary" onClick={() =>this.clkUpdate("Doing")}>Doing</button>
                <button className="btn btn-secondary" onClick={() =>this.clkUpdate("Done")}>Done</button>
                <button className="btn btn-secondary" onClick={() =>this.clkUpdate("Received")}>Received</button>
                <TestCollectDataToEmail title="ตีราคา" email={this.props.email}/>
                <form action="http://localhost:4000/submit" method="POST">
                    <input type="hidden" name="email" value={this.props.email}/>
                    <button type="submit">send</button>
                </form>
            </div>
      )
   }
}

export default TableReportStatus 