
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

var checkConfirmPassword = -1 ;
var checkPassword = -1 ;
var stateMessageUpdatePass = -1;

const success = () => {
    message.success('ดำเนินการเสร็จสิ้น');
  };
const warning = () => {
    message.warning('กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ถูกต้องและครบถ้วน');
  };
const error_ = () => {
    message.error('กรุณาลองเปลี่ยนรหัสผ่านอีกครั้ง');
  };


class ChangePassword extends React.Component {
    state = {
       
        visible: false,onfirmDirty: false,
        
      };
      showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleCancel = () => {
        this.setState({ visible: false });
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

                firebase.auth().currentUser.updatePassword(newPassword).then(function() {
                    // Update successful.
                    console.log("Update successful.");
                    stateMessageUpdatePass = 1 ;
                    success();
                }).catch(function(error) {
                    // An error happened.
                    console.log("error");
                    stateMessageUpdatePass = 0 ;
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

      compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password') && form.getFieldValue('confirm').length >= 1) {
            checkConfirmPassword = 0 ;
          callback('กรุณายืนยันรหัสผ่านให้ถูกต้อง');
        } 
        
        if (value && value === form.getFieldValue('password') && form.getFieldValue('confirm').length >= 6) {
            checkConfirmPassword = 1 ;
        }
            callback();
            console.log("checkConfirmPassword",checkConfirmPassword);
      };
    
    //   validateToNextPassword = (rule, value, callback) => {
    //     const { form } = this.props;
    //     if (value && this.state.confirmDirty) {
    //       form.validateFields(['confirm'], { force: true });
    //     }

    //     if (form.getFieldValue('confirm').length < 6) {
    //         callback('กรุณากรอกรหัสที่มีอย่างน้อย 6 ตัวอักษร');
    //         checkPassword = 0 ;
    //     } 

    //     else if (form.getFieldValue('confirm').length >= 6) {
    //         checkPassword = 1 ;
    //     }
    //     callback();
    //   };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true }); }
          if (form.getFieldValue('password').length < 6) {
                callback('กรุณากรอกรหัสที่มีอย่างน้อย 6 ตัวอักษร');
                checkPassword = 0 ;
            } 
            else if (form.getFieldValue('password').length >= 6) {
                checkPassword = 1 ;
            }
        
        callback();
      };

    

    
  
    render() {
        const { visible } = this.state;
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Menu >
    

                        <Menu.Item onClick={this.showModal}>
                        <span>  <Icon type="key" /> เปลี่ยนรหัสผ่าน </span>
                    </Menu.Item>
               

                <Modal
              visible={visible}
              title="แก้ไขรหัสผ่าน"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="submit" type="primary"  onClick={this.handleOk}>  SUBMIT  </Button>
              ]}
            >
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
          })(<Input.Password  />)}
        </Form.Item>
            </Form>
          </Modal>
             </Menu>
              
      );
    }
  }
  
  const ChangePassword_ = Form.create({ name: 'ChangePassword__' })(ChangePassword);
  export default Form.create()(ChangePassword_);
  
  