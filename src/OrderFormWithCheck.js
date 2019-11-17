import React from 'react';
import FileUpload from './FileUpload';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import './CSS/setNumberInput.css';
import firebase from './firebase';

import LogInWithCheck from './LogInWithCheck';

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
} from 'antd';

const { TextArea } = Input;

var check ;

const db = firebase.firestore();
var checkSendOrderCopy = -1 ;
var checkSendOrderDetail = -1 ;
var checkSendOrderPhone = -1 ;

var checkStateFile = -1 ;

var documentId ;
var customerName ;

var checkAllExtra = -1 ;
var chackExtraVatID = -1;
var chackExtraCompanyName = -1;
var chackExtraAddressCompany = -1;
var permissionExtraInput = false ;
var stateCheckbox = false ;

var dateOrder = Date.now() ;
console.log('t', dateOrder);

var newDate = new Date()
var date = newDate.getDate();
let month = newDate.getMonth() ;
let year = newDate.getFullYear() + 543;
console.log('date', date);
console.log('month', month);
console.log('year', year);
var calDate = date + "/" + month + "/" + year;
console.log(calDate)


var timeStampQuotation = Math.floor(Date.now() / 1000) ;
const success = () => {
    message
      .loading('กำลังทำรายการ..', 2)
      .then(() => message.success('ดำเนินการเสร็จสิ้น', 1.8))
      .then(() => message.success("Order : " + timeStampQuotation, 3))
      .then(() => message.info('Thank You For Order :)', 1.8))
      .then(() => window.location.href = "/Home");
  };

const successExtraInput = () => {
    message
    .loading('กำลังทำรายการ..', 0.6)
    .then(() => message.success('บันทึกข้อมูลสำหรับใบเสร็จฉบับเต็มเรียบร้อย', 1.6))
    };

const fail = () => {
  message.warning('กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',3);
  };

const failFile = () => {
    message.warning('กรุณาอัพโหลดไฟล์งาน',3);
    };

const failFileAndInput = () => {
    message.warning('กรุณากรอกข้อมูลและอัพโหลดไฟล์งาน',3);
  };

const failExtraInput = () => {
    message.warning('กรุณากรอกข้อมูลสำหรับออกใบเสร็จฉบับเต็มให้ครบและถูกต้อง',3);
  };



function onPressEnter(value) {
  console.log('changed', value);
}

class OrderFormWithCheck extends React.Component {

  state = { visible: false, checked: false, };

    constructor(props) {
        super(props)

        this.state = {
            emailUser : "",
            detailOrder : "",
            idDoc : "",
            phoneNum : "",
            stateWork : "order",
            Price : "รอการตีราคาจากร้านค้า",
            workLink : "",
            quotationNum : "",
            copies : "",
            orderDate : "" ,

            // sort order day (?)
            days: "",
            months: "",
            years : "",

            // ใบเสนอราคา
            quotationPaper: "",
            company: "",
            vatNum: "",
            addreass:""
         
        }
    }

    fileLink = (url) =>{
      checkStateFile = 1 ;
        this.setState({url})
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
          checkSendOrderPhone = 0 ;
          callback('กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 9 หรือ 10 หมายเลข');
        }
        else if (form.getFieldValue('phone').length >= 11) {
          checkSendOrderPhone = 0 ;
          callback('กรุณาตรวจสอบจำนวนเลขของหมายเลขโทรศัพท์');
        }
      else {
        checkSendOrderPhone = 1 ;
      }
        console.log('check', checkSendOrderPhone);
        callback();
      };
    
      validateToDetail = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('detail').length < 5) {
          checkSendOrderDetail = 0 ;
          callback('กรุณากรอกอย่างน้อย 5 ตัวอักษร');
        }
        else {
          checkSendOrderDetail = 1 ;
        }
        console.log('check', checkSendOrderDetail);
        callback();
      };
    
      validateToCopy = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('copy').length < 1) {
          checkSendOrderCopy = 0 ;
          callback('กรุณากรอกหมายเลข');
        }
        else {
          checkSendOrderCopy = 1 ;
        }
        console.log('check', checkSendOrderCopy);
        callback();
      };

      componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
          console.log(user.email);
          customerName = user.email;
          console.log(customerName);
      });
      
        db.collection('testInputFormWithCheck').get().then((snapshot)=>{
            snapshot.forEach(doc=>{
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
            db.collection('testInputFormWithCheck').add({
            emailUser: this.state.emailUser,
            detailOrder:this.state.detailOrder,
            idDoc:this.state.idDoc,
            workLink:this.state.url,
            Price:this.state.Price,
            phoneNum:this.state.phoneNum,
            stateWork:this.state.stateWork,
            quotationNum:this.state.quotationNum,
            copies:this.state.copies,
            orderDate:this.state.orderDate,

            // sort date
            days:this.state.days,
            months:this.state.months,
            years:this.state.years,

            // ใบเสนอราคา
            quotationPaper:this.state.quotationPaper,
            company:this.state.company,
            vatNum: this.state.vatNum,
            addreass:this.state.addreass,

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
              db.collection('testInputFormWithCheck').doc(documentId).update({orderDate: calDate});
              db.collection('testInputFormWithCheck').doc(documentId).update({days: date});
              db.collection('testInputFormWithCheck').doc(documentId).update({months: month});
              db.collection('testInputFormWithCheck').doc(documentId).update({years: year});


              db.collection('testInputFormWithCheck').doc(documentId).update({detailOrder: detailFromUser});
              db.collection('testInputFormWithCheck').doc(documentId).update({idDoc: documentId});
              db.collection('testInputFormWithCheck').doc(documentId).update({quotationNum: timeStampQuotation});
              db.collection('testInputFormWithCheck').doc(documentId).update({phoneNum: phoneFromUser});
              db.collection('testInputFormWithCheck').doc(documentId).update({copies: copiesFromUser});
              db.collection('testInputFormWithCheck').doc(documentId).update({emailUser: customerName});

              if (stateCheckbox == true && checkAllExtra == 1) {
                db.collection('testInputFormWithCheck').doc(documentId).update({company: companyFromUser});
                db.collection('testInputFormWithCheck').doc(documentId).update({vatNum: vatIdFromUser});
                db.collection('testInputFormWithCheck').doc(documentId).update({addreass: addressFromUser});
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
           

        //   if (checkSendOrderPhone == 1 && checkSendOrderDetail == 1 && checkSendOrderCopy == 1 && checkStateFile == 1) {
        

      

 
        //     // ใบเสนอราคา
        //     console.log(stateCheckbox);
        //     db.collection('testInputFormWithCheck').doc(documentId).update({quotationPaper: stateCheckbox});

        //     if (stateCheckbox == true) {
        //       db.collection('testInputFormWithCheck').doc(documentId).update({company: companyFromUser});
        //       db.collection('testInputFormWithCheck').doc(documentId).update({vatNum: vatIdFromUser});
        //       db.collection('testInputFormWithCheck').doc(documentId).update({addreass: addressFromUser});
        //     }
            
         
        //     success();
           
        // })  
        //   }
        //   // else if (checkSendOrder == 0 || checkSendOrder == -1 || checkStateFile == -1) {
        //   //   if (checkStateFile == -1 && checkSendOrder != -1) {
        //   //       failFile();
        //   //   }

        //   //   else if (checkStateFile == -1 && checkSendOrder == -1) {
        //   //     fail(); 
        //   //   }            
            
        //   //   else {
        //   //       fail(); 
        //   //   }
        //   // }

        //   else {
        //     // console.log(e.target.checked);
        //     if ( stateCheckbox == false ) {
        //       if (checkSendOrderCopy == 1 && checkSendOrderDetail == 1 && checkSendOrderPhone == 1 && checkStateFile == -1) {
        //       failFile();
        //     }

        //     else if (checkStateFile == -1) {
        //       if (checkSendOrderCopy == 0 || checkSendOrderDetail == 0 || checkSendOrderPhone == 0) {
        //         failFileAndInput();
        //         }

        //       else if (checkSendOrderCopy == -1 || checkSendOrderDetail == -1 || checkSendOrderPhone == -1) {
        //         failFileAndInput();
        //         }
        //       }
            
        //     else if (checkStateFile == 1) {
        //       if (checkSendOrderCopy == 0 || checkSendOrderDetail == 0 || checkSendOrderPhone == 0) {
        //         fail();
        //         }
        //       }
        //     }

        //     if (stateCheckbox == true) {
        //       if (chackExtraVatID == -1 || chackExtraCompanyName == -1 || chackExtraAddressCompany == -1) {
        //         failExtraInput();
        //       }
        //       if (chackExtraVatID == 0 || chackExtraCompanyName == 0 || chackExtraAddressCompany == 0) {
        //         failExtraInput();
        //       }
        //     }
            
        //     // fail();
        //   }
      // }

      showItem = () => {
        var wholeData = [];
        db.collection('testInputFormWithCheck').get().then((snapshot)=>{
            snapshot.forEach(doc =>{
                let temp = []
                temp.push(doc.id)
                temp.push(doc.data())
                wholeData.push(temp)
            });
            console.log(wholeData)
            this.setState({allData:wholeData})
        })
    }

    state = { visible: false };
  
  showModal = (e) => {
    stateCheckbox = e.target.checked ;
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

      permissionExtraInput = true ;
    }
    else {
    this.setState({
      visible: false,
    });
    }
   
  };

  onchangeTextInput = (e) => {
    console.log(e.target.value);
    this.setState({
        [e.target.name] : e.target.value
    }, console.log(this.state))
}

  handleOk = e => {
    
    console.log(e);
    if (chackExtraVatID == 1 && chackExtraCompanyName == 1 && chackExtraAddressCompany == 1 ) {
      this.setState({ visible: false, });
      successExtraInput();
    }
    else {
      this.setState({ visible: true, });
      failExtraInput();
    }

    stateCheckbox = true ;

  };

  handleCancel = e => {
    
    console.log(e);
    this.setState({
      visible: false,
      checked: false,

    });
    stateCheckbox = false ;

    // chackExtraVatID = -1;
    // chackExtraCompanyName = -1;
    // chackExtraAddressCompany = -1;

  };

  validateToVatID = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('vatID').length  != 13) {
      callback('กรุณากรอกเลขประจำตัวผู้เสียภาษีให้ครบ 13 ตัว');
      chackExtraVatID = 0 ;
    } else {
      chackExtraVatID = 1 ;
      callback();
    }
    // console.log(chackExtraVatID);
    console.log(chackExtraCompanyName);
  };

  validateToCompanyName = (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('companyName').length  < 3) {
      chackExtraCompanyName = 0 ;
      callback('กรุณากรอกอย่างน้อย 3 ตัวอักษร');
    } else {
      chackExtraCompanyName = 1 ;
      callback();
    }
    console.log(chackExtraCompanyName);
  };

  validateToAddress= (rule, value, callback) => {
    const { form } = this.props;
    if (form.getFieldValue('addressCompany').length  < 5) {
      chackExtraAddressCompany = 0 ;
      callback('กรุณากรอกอย่างน้อย 5 ตัวอักษร');
    } else {
      chackExtraAddressCompany = 1 ;
      callback();
    }
    console.log(chackExtraAddressCompany);

  };

  

    
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
  
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            
            {<Form.Item
              label={
                <span>
                  จำนวน  &nbsp;
                  <Tooltip title="Maximun = 1000 Copies">
                    <Icon type="info-circle" theme="filled"/>
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('copy', {
                rules: [{
                  required: true,
                  validator: this.validateToCopy,
                },],
              })(<InputNumber type="number"  min={1} max={1000} defaultValue={1} decimalSeparator onChange={onPressEnter} />)}
            </Form.Item>
             }
            <Form.Item label="รายละเอียดงาน" >
              {getFieldDecorator('detail', {
                rules: [
                  {
                    required: true,
                    validator: this.validateToDetail,
                  },
                ],
              })(<TextArea rows={6}/>)}
            </Form.Item>
    
            { <Form.Item label="ติดต่อ (เบอร์โทรศัพท์)" hasFeedback>
              {getFieldDecorator('phone', {
                rules: [
                  
                  {
                    required: true,
                    validator: this.validateToPhone,
                  },
                ],
              })(<Input type="number" onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault() } />)}
            </Form.Item> }

          <div>

          <Checkbox checked = {this.state.checked}  onChange={this.showModal}> ต้องการใบเสร็จฉบับเต็ม </Checkbox> 
            
            <Modal
              title=" ข้อมูลสำหรับออกใบเสร็จฉบับเต็ม"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
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
                rules: [{ required: permissionExtraInput ,validator: this.validateToVatID,}],
              })(<Input type="number" onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault() }/>)}
            </Form.Item>
    
            <Form.Item label="ที่อยู่สำหรับออกใบเสร็จฉบับเต็ม" >
                  {getFieldDecorator('addressCompany', {
                    rules: [
                      {
                        required: permissionExtraInput,
                        validator: this.validateToAddress,
                      },
                    ],
                  })(<TextArea rows={6}/>)}
                </Form.Item>
    
              </Form>
            </Modal>
          </div>

          <div> <FileUpload returnFileUrl={this.fileLink} /> </div>

            <div>
                <Button type="dashed" shape="round" onClick={this.addOrderInDB} class="btn btn-primary">SUBMIT</Button>
            </div> 
    
            </Form>

          
        );
      }
    }
    
const OrderFormWithCheck_ = Form.create({ name: 'normal_order' })(OrderFormWithCheck);
export default Form.create()(OrderFormWithCheck_);