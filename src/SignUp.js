import React, { Component } from "react";

import firebase from "./firebase";

const auth = firebase.auth();

class SignUp extends Component {
  submitSignUpEventListen = e => {
    e.preventDefault();
    const form = document.querySelector("form");
    const email = form["email"].value;
    const pass = form["password"].value;
    window.alert(email + pass);
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
      console.log(cred);
    }).catch(error => {
      console.log("sign in unsuccess!");
    });
  };

  render() {
    return (
      <div>
        <h1> sign up page </h1>
        <form action="">
          <label htmlFor=""> Sign up with Email and your password </label>{" "}
          <br />
          <label htmlFor=""> Email : </label>
          <input type="text" id="email" /> <br />
          <label htmlFor=""> password must at least 6 charector </label> <br />
          <label htmlFor=""> Password : </label>
          <input type="password" id="password" /> <br />
          <input type="submit" onClick={this.submitSignUpEventListen} />
        </form>
      </div>
    );
  }
}

export default SignUp;
