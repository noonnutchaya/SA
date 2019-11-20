import React, { Component } from 'react';
import firebase from './firebase';
import {
  Form,
  Input,
  Icon,
  Button,
  message,
} from 'antd';
import footPage from './images/testfoot.png';
import headerLogin from './images/headerLogin.png';
import './CSS/setImg.css';
import './CSS/fieldInput.css';

var checkEmail = -1;
var checkPass = -1;


function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const fail = () => {
  message.warning('กรุณาตรวจสอบความถูกต้องของ E-mail และรหัสผ่าน', 3);
};

const success = () => {
  message
    .then(() => message.success('ลงชื่อเข้าใช้สำเร็จ', 1.8))
    .then(() => window.location.href = "/HomePage");
};

class LogInWithCheck extends React.Component {

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  getEmail = (email) => {
    console.log("this -> ", email)
  }


  login = (email, password) => {
    console.log(this.state)

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        // message.success('ลงชื่อเข้าใช้สำเร็จ', 3);
        console.log(email);
        console.log('Successfully Logged In: ', data.user.uid);
        this.getEmail(email);
        message.success('ลงชื่อเข้าใช้สำเร็จ', 2)
        .then(() => window.location.href = "/HomePage");
      })
      .catch((err) => {
        message.error('กรุณาลงชื่อเข้าใช้อีกครั้ง');
        console.log('Error: ' + err.toString());
      })

    this.props.returnUser(email);
  }

  handleSubmit = e => {
    e.preventDefault();

    if (checkPass == 1 && checkEmail == 1) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.login(values.email, values.password);
        }
      });
    }

    else {
      fail();
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToEmail = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('email').includes("@") == true && form.getFieldValue('email').includes(".") == true) {
      checkEmail = 1;
      console.log('.....@@@@@');
    }
    else {
      callback('กรุณากรอก E-mail ให้ถูกต้อง');
      checkEmail = 0;
    }
    console.log(checkEmail);
    callback();
  };

  validateToPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('password').length > 0) {
      checkPass = 1;
    }
    else {
      callback('กรุณากรอกรหัสผ่านให้ถูกต้อง');
      checkPass = 0;
    }
    console.log(checkPass);
    callback();
  };



  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    const tailFormItemLayout = {};

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };


    return (
      <div>
        <div>
          <img src={headerLogin} id="setBG" />
        </div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <div id="emailLogin" >
            <Form.Item label="E-mail" validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    validator: this.validateToEmail,
                    required: true,
                  },
                ],
              })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="E-mail"
              />)}
            </Form.Item>
          </div>

          <div id="passLogin">
            <Form.Item label="Password" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    validator: this.validateToPassword,
                  }
                ],
              })(<Input.Password prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password" />)}
            </Form.Item> </div>

          <Form.Item {...tailFormItemLayout}>
            <div id="Login">
              <Button type="danger" htmlType="submit">
                Login
              </Button></div>
          </Form.Item>

        </Form>

        <div>
          <img src={footPage} id="setBG" />
        </div>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LogInWithCheck);
export default Form.create()(WrappedNormalLoginForm);