import React from 'react';

import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
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
} from 'antd';

const { TextArea } = Input;
const db = firebase.firestore();
var checkSendOrder = -1 ;
var documentId ;
var customerName ;

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

const fail = () => {
  message.warning('กรุณาเติมข้อมูลให้ครบทุกช่อง',3);
  };

function onPressEnter(value) {
  console.log('changed', value);
}

class OrderFormWithCheck extends React.Component {

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
         
        }
    }

    fileLink = (url) =>{
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
    
      validateToDetail = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('detail').length < 5) {
          checkSendOrder = 0 ;
          callback('Please input at least 5 character');
        }
        else {
          checkSendOrder = 1 ;
        }
        console.log('check', checkSendOrder);
        callback();
      };
    
      validateToCopy = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('copy').length < 1) {
          checkSendOrder = 0 ;
          callback('Please input integer');
        }
        else {
          checkSendOrder = 1 ;
        }
        console.log('check', checkSendOrder);
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


      addOrderInDB = e=> {
          if (checkSendOrder == 1) {
            // console.log(email);
            e.preventDefault();
            const { form } = this.props;
            console.log(form.getFieldValue('detail'));
        db.collection('testInputFormWithCheck').add({
            emailUser: this.state.emailUser,
            detailOrder:this.state.detailOrder,
            idDoc:this.state.idDoc,
            // workLink:this.state.url,
            Price:this.state.Price,
            phoneNum:this.state.phoneNum,
            stateWork:this.state.stateWork,
            quotationNum:this.state.quotationNum,
            copies:this.state.copies,
            orderDate:this.state.orderDate,

            // sort date
            days:this.state.days,
            months:this.state.months,
            years:this.state.years

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

            db.collection('testInputFormWithCheck').doc(documentId).update({detailOrder: detailFromUser});
            db.collection('testInputFormWithCheck').doc(documentId).update({idDoc: documentId});
            db.collection('testInputFormWithCheck').doc(documentId).update({quotationNum: timeStampQuotation});
            db.collection('testInputFormWithCheck').doc(documentId).update({phoneNum: phoneFromUser});
            db.collection('testInputFormWithCheck').doc(documentId).update({copies: copiesFromUser});
            db.collection('testInputFormWithCheck').doc(documentId).update({emailUser: customerName});
            db.collection('testInputFormWithCheck').doc(documentId).update({orderDate: calDate});
            db.collection('testInputFormWithCheck').doc(documentId).update({days: date});
            db.collection('testInputFormWithCheck').doc(documentId).update({months: month});
            db.collection('testInputFormWithCheck').doc(documentId).update({years: year});
         
            success();
           
        })  
          }
          else if (checkSendOrder == 0 || checkSendOrder == -1) {
            fail();          }
      }

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
              })(<Input type="number" />)}
            </Form.Item> }

            <div>
                <Button type="dashed" shape="round" onClick={this.addOrderInDB} class="btn btn-primary">SUBMIT</Button>
            </div>
    
          </Form>


          // <div>  </div>

        );
      }
    }
    
const OrderFormWithCheck_ = Form.create({ name: 'normal_order' })(OrderFormWithCheck);
export default Form.create()(OrderFormWithCheck_);