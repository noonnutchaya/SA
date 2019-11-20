
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './CSS/setNumberInput.css';
import './index.css';
import firebase from './firebase';
import { Modal, Button,Form,Input,Menu,message,Icon, } from 'antd';
const db = firebase.firestore();
const auth = firebase.auth().currentUser;
const { SubMenu } = Menu;

var nameUser, emailUser, phoneUser;


class ShowInfoUser extends React.Component {
    
    state = {
        visible: false,
        onfirmDirty: false,
        emailUser_:"",
        nameUser_:"",
        phoneUser_:"",
    };

    constructor(props) {
        super(props)
        this.showUser()
    }
    
    showModal = () => {
        console.log('click');
        this.setState({
          visible: true,
        });
    };
    
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
      };

    showUser = () => {
        firebase.auth().onAuthStateChanged((user)=>{
        // console.log(user.email);
        db.collection("Users").where('email','==',"nutchaya.limp@ku.th").get().then(
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
                  this.setState({emailUser_:userInfo.email});
                  this.setState({nameUser_:userInfo.name});
                  this.setState({phoneUser_:userInfo.phoneNumber});

                  console.log("nameUser",nameUser);
                  console.log("emailUser",emailUser);
                  console.log("phoneUser",phoneUser);
                 
                }
            );
          }
        );
      });
    };
  
    render() {
        const { visible } = this.state;
        
        return (
            <Menu>
                
  
                        <Menu.Item onClick={this.showModal}>
                        <span>  <Icon type="setting" /> บัญชีผู้ใช้ </span>
                        </Menu.Item>            
                

                <Modal
                    visible={visible}
                    title="รายละเอียดบัญชีผู้ใช้"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[   <Button key="submit" type="primary"  onClick={this.handleOk}>   OK  </Button>,  ]}>

                        <div>{this.state.nameUser_}</div>
                        <div>{this.state.emailUser_}</div>
                        <div>{this.state.phoneUser_}</div>

                </Modal>
            </Menu>
      );
    }
  }
  
  const showInfoPage = Form.create({ name: 'normal_register' })(ShowInfoUser);
  export default Form.create()(showInfoPage);
  
  