import React, { Component } from 'react';
import firebase from './firebase.js';
import work from './images/work.png';
import work1 from './images/1.png';
import work2 from './images/2.png';
import work3 from './images/3.png';
import footPage from './images/testfoot.png';
import './CSS/setImg.css';
import './CSS/fieldInput.css';
import { Modal, Button, Form, Input, Menu, message, Icon, Carousel } from 'antd';
const auth = firebase.auth();
const firestore = firebase.firestore();
const db = firebase.firestore();

var userMail = "";
var checkConfirmPassword = -1;
var stateMessageUpdatePass = -1;
var checkPassword = -1;

var nameUser, emailUser, phoneUser;

const success = () => {
    message.success('ดำเนินการเสร็จสิ้น');
};
const warning = () => {
    message.warning('กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ถูกต้องและครบถ้วน');
};
const error_ = () => {
    message.error('กรุณาลองเปลี่ยนรหัสผ่านอีกครั้ง');
};

// ----------------------------------------------------------

const successTapbar = () => {
    message.success('ลงชื่อออกสำเร็จ');
  };
  
  const errorLogOut = () => {
    message.error('การลงชื่อออกผิดพลาด');
  };


const { SubMenu } = Menu;

class HomePageCustomer extends React.Component {

    state = {
        loading: false,
        visible: false,
        onfirmDirty: false,
        emailUser_: "",
        nameUser_: "",
        phoneUser_: "",
        current: ""
    };

    constructor(props) {
        super(props)
        this.showUser()

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                window.location = '/Home';
            } else {
                const email = auth.currentUser.email
                let emailVendor = []

                firestore.collection("EmailVendor").onSnapshot(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        emailVendor.push(doc.data().email)
                    });
                })
                console.log(emailVendor, emailVendor.length)

                let isAuthorize = false
                for (let i = 0; i <= emailVendor.length; i++) {
                    if (email === emailVendor[i]) {
                        isAuthorize = true
                    }
                    console.log(isAuthorize)
                }
                // if(!isAuthorize){
                //   window.location = '/home'
                // }
            }
        });
    }

    logout = () => {
        firebase.auth().signOut().then(function () {
          successTapbar();
          window.location = '/Home'
        }).catch(function (error) {
          console.log(error)
          errorLogOut();
        });
      }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            visible: true,
        });
        const { form } = this.props;
        if (checkConfirmPassword == 1 && checkPassword == 1) {
            this.setState({ loading: true });
            setTimeout(() => {
                this.setState({ loading: false, visible: false });
            }, 1200);

            console.log(form.getFieldValue('password'));
            var newPassword = form.getFieldValue('password');

            firebase.auth().currentUser.updatePassword(newPassword).then(function () {
                // Update successful.
                console.log("Update successful.");
                stateMessageUpdatePass = 1;
                success();
            }).catch(function (error) {
                // An error happened.
                console.log("error");
                stateMessageUpdatePass = 0;
                error_();
            });


            // ล้างกล่องอินพุต
            this.props.form.setFieldsValue({
                password: "",
                confirm: "",
            });
        }

        else {
            warning();
        }
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            current: ""
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password') && form.getFieldValue('confirm').length >= 1) {
            checkConfirmPassword = 0;
            callback('กรุณายืนยันรหัสผ่านให้ถูกต้อง');
        }

        if (value && value === form.getFieldValue('password') && form.getFieldValue('confirm').length >= 6) {
            checkConfirmPassword = 1;
        }
        callback();
        console.log("checkConfirmPassword", checkConfirmPassword);
    };


    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        if (form.getFieldValue('password').length < 6) {
            callback('กรุณากรอกรหัสที่มีอย่างน้อย 6 ตัวอักษร');
            checkPassword = 0;
        }
        else if (form.getFieldValue('password').length >= 6) {
            checkPassword = 1;
        }

        callback();
    };

    showUser = () => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user.email);
            db.collection("Users").where('email', '==', user.email).get().then(
                (querySnapshot) => {
                    const data = querySnapshot.docs.map(doc => doc.data());
                    data.forEach(
                        (userInfo) => {
                            // console.log(userInfo.name) ;
                            // console.log(userInfo.email) ;
                            // console.log(userInfo.phoneNumber) ;
                            nameUser = userInfo.name;
                            emailUser = userInfo.email;
                            phoneUser = userInfo.phoneNumber;

                            this.setState({ emailUser_: userInfo.email });
                            this.setState({ nameUser_: userInfo.name });
                            this.setState({ phoneUser_: userInfo.phoneNumber });

                            console.log("nameUser", nameUser);
                            console.log("emailUser", emailUser);
                            console.log("phoneUser", phoneUser);

                        }
                    );
                }
            );
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div >

                <Menu mode="horizontal">
                    <Menu.Item >
                        <a href="http://localhost:3000/HomePage" rel="noopener noreferrer">
                            <span><Icon type="shopping-cart" style={{ color: '#B22222' }}/> </span>    </a>
                    </Menu.Item>

                    <Menu.Item >
                        <a href="http://localhost:3000/Order" rel="noopener noreferrer">
                            <span> <Icon type="file-add"  style={{ color: '#B22222' }}/> <span> สั่งงาน </span> </span>
                        </a>
                    </Menu.Item>

                    <Menu.Item >
                        <a href="http://localhost:3000/OrderList" rel="noopener noreferrer">
                            <span> <Icon type="file-search"  style={{ color: '#B22222' }}/> <span> ตรวจสอบงาน </span> </span>
                        </a>
                    </Menu.Item>

                    <SubMenu
                        title={
                            <span className="submenu-title-wrapper">
                                <Icon type="setting"  style={{ color: '#B22222' }}/>   </span>} >

                        <Menu.Item
                            key="0"
                            onClick={(e) => this.setState({ current: e.key })} >
                            <span> <Icon type="user" style={{ color: '#F08080' }}/> บัญชีผู้ใช้  </span>
                        </Menu.Item>

                        <Menu.Item
                            key="1"
                            onClick={(e) => this.setState({ current: e.key })}>
                            <span> <Icon type="key" style={{ color: '#F08080' }}/>แก้ไขรหัสผ่าน  </span>
                        </Menu.Item>

                        <Menu.Item
                            key="2"
                            onClick={this.logout}>
                            <span> <Icon type="logout"style={{ color: '#F08080' }} />ลงชื่อออก</span>
                        </Menu.Item>

                    </SubMenu>
                </Menu>

                <Modal

                    visible={this.state.current === "0"}
                    title="ข้อมูลบัญชีผู้ใช้"
                    onCancel={this.handleCancel} footer={[
                        <Button key="back" onClick={this.handleCancel}>   Done  </Button>,]}>

                    <div>{this.state.nameUser_}</div>
                    <div>{this.state.emailUser_}</div>
                    <div>{this.state.phoneUser_}</div>

                </Modal>

                <Modal
                    visible={this.state.current === "1"}
                    title="แก้ไขรหัสผ่าน"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOk}>  SUBMIT  </Button>
                    ]} >

                    <Form>
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'กรุณากรอกรหัสผ่าน',
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
                                        message: 'กรุณายืนยันรหัสผ่าน',
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </Form.Item>
                    </Form>
                </Modal>

                <div id="SetCarousel">
                    <Carousel autoplay>
                        <div>   <img src={work} />  </div>
                        <div>   <img src={work2} />  </div>
                        <div>   <img src={work1} />  </div>
                        <div>   <img src={work3} />  </div>
                    </Carousel>
                </div>
                <img src={footPage} id ="setBG" />
            </div>
        );
    }
}


const HomePageCustomer_ = Form.create({ name: 'HomePage_Customer' })(HomePageCustomer);
export default Form.create()(HomePageCustomer_);