import React from 'react';
import FileUpload from './FileUpload';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import './CSS/setNumberInput.css';
import footPage from './images/testfoot.png';
import firebase from './firebase';

import './CSS/setImg.css';
import './CSS/fieldInput.css';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  InputNumber,
  Button,
  message,
  Modal,
  Checkbox,
  Menu,
} from 'antd';


const { TextArea } = Input;
const { SubMenu } = Menu;

var OrderTable = "Orders"
var check;

const db = firebase.firestore();
var checkSendOrderCopy = -1;
var checkSendOrderDetail = -1;
var checkSendOrderPhone = -1;

var checkStateFile = -1;

var documentId;
var customerName;

var checkAllExtra = -1;
var chackExtraVatID = -1;
var chackExtraCompanyName = -1;
var chackExtraAddressCompany = -1;
var permissionExtraInput = false;
var stateCheckbox = false;

var checkConfirmPassword = -1;
var stateMessageUpdatePass = -1;
var checkPassword = -1;

var nameUser, emailUser, phoneUser;


var dateOrder = Date.now();
console.log('t', dateOrder);

var newDate = new Date()
var date = newDate.getDate();
let month = newDate.getMonth();
let year = newDate.getFullYear() + 543;
console.log('date', date);
console.log('month', month);
console.log('year', year);
var calDate = date + "/" + month + "/" + year;
console.log(calDate)


var timeStampQuotation = Math.floor(Date.now() / 1000);
const success = () => {
  message
    .loading('กำลังทำรายการ..', 2)
    .then(() => message.success('ดำเนินการเสร็จสิ้น', 1.8))
    .then(() => message.success("Order : " + timeStampQuotation, 3))
    .then(() => message.info('Thank You For Order :)', 1.8))
    .then(() => window.location.href = "/Order");
};

const successExtraInput = () => {
  message
    .loading('กำลังทำรายการ..', 0.6)
    .then(() => message.success('บันทึกข้อมูลสำหรับใบเสร็จฉบับเต็มเรียบร้อย', 1.6))
};

const fail = () => {
  message.warning('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง', 3);
};

const failFile = () => {
  message.warning('กรุณาอัพโหลดไฟล์งาน', 3);
};

const failFileAndInput = () => {
  message.warning('กรุณากรอกข้อมูลและอัพโหลดไฟล์งาน', 3);
};

const failExtraInput = () => {
  message.warning('กรุณากรอกข้อมูลสำหรับออกใบเสร็จฉบับเต็มให้ครบและถูกต้อง', 3);
};

// ----------------------------------------------------------

const successTapbar = () => {
  message.success('ลงชื่อออกสำเร็จ');
};
const warningTapbar = () => {
  message.warning('กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ถูกต้องและครบถ้วน');
};
const errorTapbar = () => {
  message.error('กรุณาลองเปลี่ยนรหัสผ่านอีกครั้ง');
};

const errorLogOut = () => {
  message.error('การลงชื่อออกผิดพลาด');
};



function onPressEnter(value) {
  console.log('changed', value);
}

class OrderFormWithCheck extends React.Component {

  state = {
    loading: false,
    visible: false,
    checked: false,
    onfirmDirty: false,
    emailUser_: "",
    nameUser_: "",
    phoneUser_: "",
    current: ""
  };

  constructor(props) {
    super(props)
    this.showUser()

    this.state = {
      emailUser: "",
      detailOrder: "",
      idDoc: "",
      phoneNum: "",
      stateWork: "order",
      Price: "รอการตีราคาจากร้านค้า",
      workLink: "",
      quotationNum: "",
      copies: "",
      orderDate: "",

      // sort order day (?)
      days: "",
      months: "",
      years: "",

      // ใบเสนอราคา
      quotationPaper: "false",
      company: "",
      vatNum: "",
      addreass: "",
    }
  }

  fileLink = (url) => {
    checkStateFile = 1;
    this.setState({ url })
  }

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

  validateToPhone = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('phone').length < 9) {
      checkSendOrderPhone = 0;
      callback('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 9 หรือ 10 หมายเลข');
    }
    else if (form.getFieldValue('phone').length >= 11) {
      checkSendOrderPhone = 0;
      callback('กรุณาตรวจสอบจำนวนเลขของหมายเลขโทรศัพท์');
    }
    else {
      checkSendOrderPhone = 1;
    }
    console.log('check', checkSendOrderPhone);
    callback();
  };

  validateToDetail = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('detail').length < 5) {
      checkSendOrderDetail = 0;
      callback('กรุณากรอกอย่างน้อย 5 ตัวอักษร');
    }
    else {
      checkSendOrderDetail = 1;
    }
    console.log('check', checkSendOrderDetail);
    callback();
  };

  validateToCopy = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('copy').length < 1) {
      checkSendOrderCopy = 0;
      callback('กรุณากรอกหมายเลข');
    }
    else {
      checkSendOrderCopy = 1;
    }
    console.log('check', checkSendOrderCopy);
    callback();
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user.email);
      customerName = user.email;
      console.log(customerName);
    });

    db.collection(OrderTable).get().then((snapshot) => {
      snapshot.forEach(doc => {
        // console.log(doc.data())
      });
    });


  }


  addOrderInDB = e => {

    //  เอาใบเสร็จ
    if (chackExtraVatID == 1 && chackExtraCompanyName == 1 && chackExtraAddressCompany == 1) { checkAllExtra = 1; }
    //  ไม่เอาใบเสร็จ
    if (chackExtraVatID == -1 && chackExtraCompanyName == -1 && chackExtraAddressCompany == -1 && stateCheckbox == false) { checkAllExtra = 1; }

    if (checkSendOrderPhone == 1 && checkSendOrderDetail == 1 && checkSendOrderCopy == 1 && checkStateFile == 1 && checkAllExtra == 1) {
      // console.log(email);
      e.preventDefault();
      const { form } = this.props;
      console.log(form.getFieldValue('detail'));
      db.collection(OrderTable).add({
        emailUser: this.state.emailUser,
        detailOrder: this.state.detailOrder,
        idDoc: this.state.idDoc,
        workLink: this.state.url,
        Price: this.state.Price,
        phoneNum: this.state.phoneNum,
        stateWork: this.state.stateWork,
        quotationNum: this.state.quotationNum,
        copies: this.state.copies,
        orderDate: this.state.orderDate,

        // sort date
        days: this.state.days,
        months: this.state.months,
        years: this.state.years,

        // ใบเสนอราคา
        quotationPaper: this.state.quotationPaper,
        company: this.state.company,
        vatNum: this.state.vatNum,
        addreass: this.state.addreass,

      })

        .then(docRef => {

          console.log("add success~")
          console.log(docRef.id)
          documentId = docRef.id
          console.log(timeStampQuotation);

          const { form } = this.props;
          var detailFromUser = form.getFieldValue('detail');
          var phoneFromUser = form.getFieldValue('phone');
          var copiesFromUser = form.getFieldValue('copy');

          var companyFromUser = form.getFieldValue('companyName');
          var vatIdFromUser = form.getFieldValue('vatID');
          var addressFromUser = form.getFieldValue('addressCompany');

          // วดป. วันสั่งงาน
          db.collection(OrderTable).doc(documentId).update({ orderDate: calDate });
          db.collection(OrderTable).doc(documentId).update({ days: date });
          db.collection(OrderTable).doc(documentId).update({ months: month });
          db.collection(OrderTable).doc(documentId).update({ years: year });


          db.collection(OrderTable).doc(documentId).update({ detailOrder: detailFromUser });
          db.collection(OrderTable).doc(documentId).update({ idDoc: documentId });
          db.collection(OrderTable).doc(documentId).update({ quotationNum: timeStampQuotation });
          db.collection(OrderTable).doc(documentId).update({ phoneNum: phoneFromUser });
          db.collection(OrderTable).doc(documentId).update({ copies: copiesFromUser });
          db.collection(OrderTable).doc(documentId).update({ emailUser: customerName });

          if (stateCheckbox == true && checkAllExtra == 1) {
            db.collection(OrderTable).doc(documentId).update({ company: companyFromUser });
            db.collection(OrderTable).doc(documentId).update({ vatNum: vatIdFromUser });
            db.collection(OrderTable).doc(documentId).update({ addreass: addressFromUser });
            db.collection(OrderTable).doc(documentId).update({ quotationPaper: "True" });
          }

          success();
          console.log("add success~")

        })
    }

    else {

      // ไม่ต้องการใบเสร็จ
      if (stateCheckbox == false) {
        // ไม่กรอกรายละเอียดงานก่อนอัพโหลดไฟล์
        if (checkSendOrderCopy == -1 || checkSendOrderDetail == -1 || checkSendOrderPhone == -1) {
          // ไม่กรอกรายละเอียด ไม่อัพไฟล์
          if (checkStateFile == -1) {
            failFileAndInput();
          }
          // ไม่กรอกรายละเอียด แต่ อัพไฟล์
          else if (checkStateFile == 1) {
            fail();
          }
          // failFile();
        }

        // กรอกรายละเอียดงานไม่ถูกต้อง
        else if (checkSendOrderCopy == 0 || checkSendOrderDetail == 0 || checkSendOrderPhone == 0) {
          fail();
        }

        // กรอกครบ ถูก ไม่อัพไฟล์
        else if (checkSendOrderCopy == 1 && checkSendOrderDetail == 1 && checkSendOrderPhone == 1) {
          if (checkStateFile == -1) {
            failFile();
          }
        }
      }

      // ต้องการใบเสร็จ เช็คช่องใบเสร็จก่อน
      else if (stateCheckbox == true) {
        // ไม่กรอก
        if (chackExtraVatID == -1 || chackExtraCompanyName == -1 || chackExtraAddressCompany == -1) {
          failExtraInput();
        }
        // กรอกผิด
        if (chackExtraVatID == 0 || chackExtraCompanyName == 0 || chackExtraAddressCompany == 0) {
          failExtraInput();
        }
        // กรอกใบเสร็จครบ แต่รายละเอียดไม่ครบ
        if (chackExtraVatID == 1 || chackExtraCompanyName == 1 || chackExtraAddressCompany == 1) {
          if (checkSendOrderCopy == 0 || checkSendOrderDetail == 0 || checkSendOrderPhone == 0 ||
            checkSendOrderCopy == -1 || checkSendOrderDetail == -1 || checkSendOrderPhone == -1) {
            if (checkStateFile == -1) {
              failFileAndInput();
            }
            // ไม่กรอกรายละเอียด แต่ อัพไฟล์
            else if (checkStateFile == 1) {
              fail();
            }
          }
        }
      }
    }
  };

  showItem = () => {
    var wholeData = [];
    db.collection(OrderTable).get().then((snapshot) => {
      snapshot.forEach(doc => {
        let temp = []
        temp.push(doc.id)
        temp.push(doc.data())
        wholeData.push(temp)
      });
      console.log(wholeData)
      this.setState({ allData: wholeData })
    })
  }

  showModalOrder = (e) => {
    stateCheckbox = e.target.checked;
    console.log(e.target.checked);
    console.log(stateCheckbox)
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
    if (e.target.checked == true) {
      this.setState({
        visible: true,
      });
      permissionExtraInput = true;
    }
    else {
      this.setState({ visible: false, });
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  onchangeTextInput = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value }, console.log(this.state))
  }

  handleOk = e => {
    console.log(e);
    if (chackExtraVatID == 1 && chackExtraCompanyName == 1 && chackExtraAddressCompany == 1) {
      this.setState({ visible: false, });
      successExtraInput();
    }
    else {
      this.setState({ visible: true, });
      failExtraInput();
    }
    stateCheckbox = true;
  };

  handleOkTabBar = () => {
    // this.setState({
    //   visible: true,
    // });

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
        successTapbar();
      }).catch(function (error) {
        // An error happened.
        console.log("error");
        stateMessageUpdatePass = 0;
        errorTapbar();
      });


      // ล้างกล่องอินพุต
      this.props.form.setFieldsValue({
        passwordTapbar: "",
        confirmTapbar: "",
      });
    }

    else {
      warningTapbar();
    }
  };


  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      checked: false,
    });
    stateCheckbox = false;
  };

  handleCancelTapBar = e => {
    console.log(e);
    this.setState({
      current: ""
    });
  };

  // --------------- tapbar_validate ----------------
  compareToFirstPasswordTapBar = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('passwordTapBar') && form.getFieldValue('confirmTapBar').length >= 1) {
      checkConfirmPassword = 0;
      callback('กรุณายืนยันรหัสผ่านให้ถูกต้อง');
    }

    if (value && value === form.getFieldValue('passwordTapBar') && form.getFieldValue('confirmTapBar').length >= 6) {
      checkConfirmPassword = 1;
    }
    callback();
    console.log("checkConfirmPassword", checkConfirmPassword);
  };

  validateToNextPasswordTapBar = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmTapBar'], { force: true });
    }
    if (form.getFieldValue('passwordTapBar').length < 6) {
      callback('กรุณากรอกรหัสที่มีอย่างน้อย 6 ตัวอักษร');
      checkPassword = 0;
    }
    else if (form.getFieldValue('passwordTapBar').length >= 6) {
      checkPassword = 1;
    }

    callback();
  };
  // --------------------------------------

  validateToVatID = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('vatID').length != 13) {
      callback('กรุณากรอกเลขประจำตัวผู้เสียภาษีให้ครบ 13 ตัว');
      chackExtraVatID = 0;
    } else {
      chackExtraVatID = 1;
      callback();
    }
    console.log(chackExtraCompanyName);
  };

  validateToCompanyName = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('companyName').length < 3) {
      chackExtraCompanyName = 0;
      callback('กรุณากรอกอย่างน้อย 3 ตัวอักษร');
    } else {
      chackExtraCompanyName = 1;
      callback();
    }
    console.log(chackExtraCompanyName);
  };

  validateToAddress = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('addressCompany').length < 5) {
      chackExtraAddressCompany = 0;
      callback('กรุณากรอกอย่างน้อย 5 ตัวอักษร');
    } else {
      chackExtraAddressCompany = 1;
      callback();
    }
    console.log(chackExtraAddressCompany);

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

  logout = () => {
    firebase.auth().signOut().then(function () {
      successTapbar();
      window.location = '/Home'
    }).catch(function (error) {
      console.log(error)
      errorLogOut();
    });
  }


  render() {

    const { getFieldDecorator } = this.props.form;
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
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Menu mode="horizontal">
            <Menu.Item >
            <a href="http://localhost:3000/HomePage" rel="noopener noreferrer">
              <span><Icon type="shopping-cart" style={{ color: '#B22222' }} /> </span>    </a>
            </Menu.Item>

            <Menu.Item >
              <a href="http://localhost:3000/Order" rel="noopener noreferrer">
                <span> <Icon type="file-add" style={{ color: '#B22222' }} /> <span> สั่งงาน </span> </span>  </a>
            </Menu.Item>

            <Menu.Item >
            <a href="http://localhost:3000/OrderList" rel="noopener noreferrer">
              <span> <Icon type="file-search" style={{ color: '#B22222' }}/> <span> ตรวจสอบงาน </span> </span>
              </a>
            </Menu.Item>

            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="setting" style={{ color: '#B22222' }}/>   </span>} >

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
                <span> <Icon type="logout" style={{ color: '#F08080' }}/>ลงชื่อออก</span>
              </Menu.Item>
            </SubMenu>
          </Menu>

          <Modal

            visible={this.state.current === "0"}
            title="ข้อมูลบัญชีผู้ใช้"
            onCancel={this.handleCancelTapBar} footer={[
              <Button key="back" onClick={this.handleCancelTapBar}>   Done  </Button>,]}>

            <div>{this.state.nameUser_}</div>
            <div>{this.state.emailUser_}</div>
            <div>{this.state.phoneUser_}</div>

          </Modal>

          <Modal
            visible={this.state.current === "1"}
            title="แก้ไขรหัสผ่าน"
            onOk={this.handleOkTabBar}
            onCancel={this.handleCancelTapBar}
            footer={[
              <Button key="submit" type="primary" onClick={this.handleOkTabBar}>  SUBMIT  </Button>
            ]} >

            <Form>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('passwordTapBar', {
                  rules: [
                    {
                      required: true,
                      message: 'กรุณากรอกรหัสผ่าน',
                    },
                    {
                      validator: this.validateToNextPasswordTapBar,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>

              <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirmTapBar', {
                  rules: [
                    {
                      required: true,
                      message: 'กรุณายืนยันรหัสผ่าน',
                    },
                    {
                      validator: this.compareToFirstPasswordTapBar,
                    },
                  ],
                })(<Input.Password />)}
              </Form.Item>
            </Form>
          </Modal>
           <div  id="SetFieldCopy">
          {<Form.Item 
            label={<span>  จำนวน  &nbsp;
                    <Tooltip title="Maximun = 1000 Copies">
                <Icon type="info-circle" theme="filled" />
              </Tooltip>
            </span>
            }>

            {getFieldDecorator('copy', {
              rules: [{ required: true, validator: this.validateToCopy, },],
            })(<InputNumber type="number" min={1} max={1000} defaultValue={1} decimalSeparator onChange={onPressEnter} />)}
          </Form.Item>
          }
          </div>

          <Form.Item label="รายละเอียดงาน" >
            {getFieldDecorator('detail', {
              rules: [
                {
                  required: true,
                  validator: this.validateToDetail,
                },
              ],
            })(<TextArea rows={6} />)}
          </Form.Item>

          {<Form.Item label="ติดต่อ (เบอร์โทรศัพท์)" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  validator: this.validateToPhone,
                },
              ],
            })(<Input type="number" onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} />)}
          </Form.Item>}

          <div>
            <div id="SetFieldQuo"><Checkbox checked={this.state.checked} onChange={this.showModalOrder}> ต้องการใบเสร็จฉบับเต็ม </Checkbox></div>
            <Modal
              title=" ข้อมูลสำหรับออกใบเสร็จฉบับเต็ม"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}    >

              <Form>
                <Form.Item label="ชื่อ - นามสุกล หรือ หน่วยงาน">
                  {getFieldDecorator('companyName', {
                    rules: [
                      {
                        required: permissionExtraInput,
                        validator: this.validateToCompanyName,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      เลขประจำตัวผู้เสียภาษี  &nbsp;
                  <Tooltip title="เลขประจำตัวผู้เสียภาษี 13 หลัก">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('vatID', {
                    rules: [{ required: permissionExtraInput, validator: this.validateToVatID, }],
                  })(<Input type="number" onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} />)}
                </Form.Item>

                <Form.Item label="ที่อยู่สำหรับออกใบเสร็จฉบับเต็ม" >
                  {getFieldDecorator('addressCompany', {
                    rules: [
                      {
                        required: permissionExtraInput,
                        validator: this.validateToAddress,
                      },
                    ],
                  })(<TextArea rows={6} />)}
                </Form.Item>

              </Form>
            </Modal>
          </div>

          <div> <FileUpload returnFileUrl={this.fileLink} /> </div>

          <div id="SetSubmitOrder">
            <Button type="dashed" shape="round" onClick={this.addOrderInDB} >SUBMIT</Button>
          </div>

        </Form>
        <img src={footPage} id ="setBG" />
      </div>

    );
  }
}

const OrderFormWithCheck_ = Form.create({ name: 'normal_order' })(OrderFormWithCheck);
export default Form.create()(OrderFormWithCheck_);