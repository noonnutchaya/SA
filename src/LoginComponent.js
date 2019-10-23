import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import firebase from './firebase'

import './CSS/LoginBar.css';

const auth = firebase.auth();

class LoginComponent extends Component{

    constructor(){
        super();
        this.state={
            redirect:false,
        }
    }

    login = e => {
        e.preventDefault();
        const form = document.querySelector('.form-login form');
        const email = form["email"].value;
        const pass = form["password"].value;

        auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log("kak"+errorCode+errorMessage)
        });

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
              window.location = '/reportOrderPage'; 
            }
          });
    }

    cancel = e => {
        let test = window.confirm("Do you want to exit from login?");
        this.setState({
            redirect: test,
        });
        // if(this.state.redirect){
        //     window.location.href = "/Order";
        // }
    }

    goOrder = () => {
    if (this.state.redirect) {
        return <Redirect to='/Order' />
    }
    }

    render(){
        return(
            <div className="form-login">
                {this.goOrder()}
                <form action="#">
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