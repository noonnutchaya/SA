import React from 'react';
import firebase from '../firebase.js';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import '../css/signin.css'

class Signin extends React.Component {

    login = (email, password) => {
        console.log(this.state)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                message.success('Login success');
                console.log('Successfully Logged In: ', data.user.uid);
                //Go to next Page
            })
            .catch((err) => {
                message.error('Login Failed');
                console.log('Error: ' + err.toString());
            })
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign in
                  </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Signin);

export default Form.create()(WrappedNormalLoginForm);