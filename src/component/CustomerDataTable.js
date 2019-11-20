import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../CSS/table.css';
import { object } from 'prop-types';
const db = firebase.firestore();
const collection = db.collection("CustomerDBtest");


class CustomerDataTable extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getDataCustomer();
    }

    getDataCustomer = () => {
        var emailCustomer;
        firebase.auth().onAuthStateChanged((user) => {
            emailCustomer = user.email;
            console.log(emailCustomer)

            db.collection("Orders").where("emailUser", "==", emailCustomer)
                .onSnapshot(querySnapshot => {
                    let userDataList = [];
                    querySnapshot.forEach((doc) => {
                        userDataList.push({
                            email: doc.data().emailUser,
                            Date: doc.data().orderDate,
                            days: doc.data().days,
                            months: doc.data().months,
                            years: doc.data().years,
                            OrderNumber: doc.data().quotationNum,
                            Status: doc.data().stateWork,
                            Price: doc.data().Price,
                            Id: doc.data().idDoc
                        })
                    });
                    this.setState({ data: userDataList });
                    this.sortTable();
                })
        });
    }

    sortTable = () => {
        var table, rows, switching, i, dateCus1, dateCus2 , shouldSwitch;
        var dateArrCus1 = [];
        var dateArrCus2 = [];
        var resultCus1 , resultCus2;
        table = document.getElementById("students");
        switching = true;
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                dateCus1 = (table.rows[i].cells[1].innerHTML);
                dateCus2 = (table.rows[i+1].cells[1].innerHTML);
                dateArrCus1 = dateCus1.split("/");
                dateArrCus2 = dateCus2.split("/");

                for(var j = 0 ; j < 3;j++){
                    dateArrCus1[j] = parseInt(dateArrCus1[j]);
                    dateArrCus2[j] = parseInt(dateArrCus2[j]);
                }

                resultCus1 = dateArrCus1[0] + (dateArrCus1[1] * 30) + (dateArrCus1[2] * 30 * 12 );
                resultCus2 = dateArrCus2[0] + (dateArrCus2[1] * 30) + (dateArrCus2[2] * 30 * 12 );

                if (resultCus1 < resultCus2) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        console.log("Success");
    }

    renderTableHeader() {
        return <tr>
            <th>E-mail</th>
            <th>วัน/เดือน/ปี</th>
            <th>เลข Order</th>
            <th>ราคา</th>
            <th>สถานะงาน</th>
        </tr>
    }

    renderTableData() {
        return this.state.data.map((Customer, index) => {
            const { Id, email, days , months,years, OrderNumber, Price, Status , Date } = Customer //destructuring
            return (
                <tr key={Id}>
                    <td>{email}</td>
                    <td>{days +"/" + months + "/" + years}</td>
                    <td>{OrderNumber}</td>
                    <td>{Price}</td>
                    <td>{Status}</td>
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
export default CustomerDataTable;