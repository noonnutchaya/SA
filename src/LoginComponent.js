import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import firebase from './firebase'

import './CSS/LoginBar.css';

const auth = firebase.auth();

class LoginComponent extends Component{

    login = e => {
        e.preventDefault();
        const form = document.querySelector('.form-login form');
        const email = form["email"].value;
        const pass = form["password"].value;

        window.alert(email+pass)

        auth.signInWithEmailAndPassword(email, pass).then(function(snapshot){
            console.log(snapshot.data().code);
            window.alert('yes');
        }).catch(function(error){
            console.log(error);
        })
    }

    cancel = e => {
        let test = window.confirm("Do you want to exit from login?");
        if(test){
            return  <Redirect  to="/Home" />
        }
    }

    render(){
        return(
            <div className="form-login">
                <form action="">
                    <div className="little-space">
                        <label htmlFor="" className="desc-label"> Username </label> <br/>
                        <input type="text" id="email"/> <br/>
                    </div>
                    <div className="little-space">
                        <label htmlFor="" className="desc-label"> Password </label> <br/>
                        <input type="password" id="password"/> <br/> 
                    </div>
                    <div className="form-button little-space">
                        <input type="submit" onClick={this.login} className="btn btn-outline-primary"/>
                        <button className="btn btn-outline-danger" onClick={this.cancel}> Cancel </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginComponent;