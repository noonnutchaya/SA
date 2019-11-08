import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button } from 'antd';
import firebase from './firebase';
const db = firebase.firestore();


class TestErrorInput extends React.Component {
    state = {
        firstName: "",
        firstNameError: "",
        
      };
    
      change = e => {
        this.props.onChange({ [e.target.name]: e.target.value });
        this.setState({
          [e.target.name]: e.target.value
        });
      };
    
      validate = () => {
        let isError = false;
        const errors = {
          firstNameError: "",
          
        };
    
        if (this.state.firstName.length < 5) {
          isError = true;
          errors.usernameError = "Username needs to be atleast 5 characters long";
        }
    }

        render() {
            return (
              <form>
                <input
                  name="firstName"
                  hintText="First name"
                  floatingLabelText="First name"
                  value={this.state.firstName}
                  onChange={e => this.change(e)}
                  errorText={this.state.firstNameError}
                  floatingLabelFixed
                />
                
              </form>
            );
}
}


const WrappedAppInput = Form.create({ name: 'input' })(TestErrorInput);

export default Form.create()(WrappedAppInput);