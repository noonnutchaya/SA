
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

import 'antd/dist/antd.css';
import './index.css';
import {
  Form,
  Input,
  Button,
} from 'antd';


var checkSendOrder = -1 ;
var auth = firebase.auth();
var db = firebase.firestore();

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
        checkSendOrder = 0 ;
    } else {
        checkSendOrder = 1 ;
        callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  validateToName = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('customerName').length < 5) {
        checkSendOrder = 0 ;
        callback(' ');
    }
    else {
        checkSendOrder = 1 ;
    }
    callback();
  };

  validateToPhone = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('phone').length < 9) {
      checkSendOrder = 0 ;
      callback('Please input 9 or 10 digits');
    }
    else if (form.getFieldValue('phone').length >= 11) {
      checkSendOrder = 0 ;
      callback('Please input 9 or 10 digits');
    }
  else {
    checkSendOrder = 1 ;
  }
    console.log('check', checkSendOrder);
    callback();
  };

  addCustomer = e=> {
    if (checkSendOrder == 1) {
        console.log('up');
        const { form } = this.props;    
        let email = form.getFieldValue('email');
        let password = form.getFieldValue('confirm');
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
        });

        db.collection("Users").add({
            name: form.getFieldValue('customerName'),
            email: email,
            phoneNumber: form.getFieldValue('phone')
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    else if (checkSendOrder == 0 || checkSendOrder == -1) { 
        console.log('XXXXXX');
    }
}

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form  onSubmit={this.handleSubmit}>

        <Form.Item label="ชื่อ - นามสกุล">
          {getFieldDecorator('customerName', {
            rules: [
              {
                required: true,
                validator: this.validateToName,
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        { <Form.Item label="เบอร์โทรศัพท์" hasFeedback >
              {getFieldDecorator('phone', {
                rules: [
                  
                  {
                    required: true,
                    validator: this.validateToPhone,
                  },
                ],
              })(<Input type="number" />)}
            </Form.Item> }

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        
        <Button type="primary" onClick={this.addCustomer} htmlType="submit">
            Register
          </Button>
        
      </Form>
    );
  }
}

const registerPage = Form.create({ name: 'normal_register' })( RegistrationForm);
export default Form.create()(registerPage);