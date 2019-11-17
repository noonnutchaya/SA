import React, { Component } from 'react';
import firebase from './firebase';
import {
    Form,
    Input,
    Icon,
    Button,
    message,
  } from 'antd';


  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

 class LogInWithCheck extends React.Component {
    
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
      };

      getEmail = (email) => {
        console.log("this -> " , email)
    }


      login = (email, password) => {
        console.log(this.state)
    
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                message.success('Login success');
                console.log(email);
                console.log('Successfully Logged In: ', data.user.uid);

                this.getEmail(email);

                // console.log('userLogin : ',userLogin);
                // this.props.returnUser(userLogin);

                 window.location.href = "/Order"

            })
            .catch((err) => {
                message.error('Login Failed');
                console.log('Error: ' + err.toString());
            })

             this.props.returnUser(email);
    }
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.login(values.email, values.password);

            }
        });
    };
    
      handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
      };
     
    
      render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
    
        const formItemLayout = {};
        const tailFormItemLayout = {};
        
     
        return (
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
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
              })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-mail"
              />)}
            </Form.Item>
            <Form.Item label="Password" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  }
                ],
              })(<Input.Password prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"/>)}
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                
              <Button type="primary" htmlType="submit">
              Log in
              </Button>
            </Form.Item>
    
          </Form>
        );
      }
    }
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LogInWithCheck);
export default Form.create()(WrappedNormalLoginForm);