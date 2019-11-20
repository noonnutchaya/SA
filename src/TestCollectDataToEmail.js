
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './CSS/setNumberInput.css';
import './index.css';
import { Modal, Button,Form,Input,InputNumber,message } from 'antd';

var pricePerOrder = [];
var showOrder = [];

var totalForThisOrder = 0;
var showAllPrice = 0 ;

var check_orderType = -1 ;
var check_copy = -1 ;
var check_unit = -1 ;
var check_unitPrice = -1 ;
var check_totalForEachOrder = -1 ;
var check_orderNum = -1 ;

const success = () => {
  message
    .loading('กำลังบันทึกรายการ', 0.4)
    .then(() => message.success('ทำรายการสำเร็จ', 0.5))
};
const fail = () => {
  message.warning('กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน',1.5);
};
const showTotalPriceFromAllOrder = () => {
  message.info('รวมราคา ' + showAllPrice + " บาท",1.8 );
};


class TestCollectDataToEmail extends React.Component {
    state = {
        loading: false,
        visible: false,
        onfirmDirty: false,
      };
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      };
    
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      validateToOrderType= (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('orderType').length  < 5) {
          check_orderType = 0 ;
          callback('กรุณากรอกอย่างน้อย 5 ตัวอักษร');
        }
        else {
           check_orderType = 1 ; 
        }
        
        // Test
        console.log('check_orderType',check_orderType);
        callback();
      };
    
      validateToCopy = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('copy').length < 1) {
          callback('กรุณากรอกหมายเลข');
          check_copy = 0 ;
        }
        else {
          check_copy = 1 ;
          var unitNum = form.getFieldValue('copy');
          var pricePerUnit = form.getFieldValue('unitPrice');
          var total = unitNum*pricePerUnit;
            if (total >= 1) {
              this.props.form.setFieldsValue({
              totalForEachOrder: total,     }); 
              totalForThisOrder = total ;
            }
        }
        console.log('check_copy',check_copy);
        callback();
      };
    
      validateToUnit= (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('unit').length  < 3) {
          callback('กรุณากรอกอย่างน้อย 3 ตัวอักษร');
          check_unit = 0 ;
        }
        else {
          check_unit = 1 ;  
        }
        
        console.log('check_unit',check_unit);
        callback();
      };
    
      validateToUnitPrice = (rule, value, callback) => {
        const { form } = this.props;
    
        if (form.getFieldValue('unitPrice').length < 1) {
          check_unitPrice = 0 ;
          callback('กรุณากรอกหมายเลข');
        }
    
        else {
          check_unitPrice = 1 ;
          var unitNum = form.getFieldValue('copy'); 
          var pricePerUnit = form.getFieldValue('unitPrice');
          var total = unitNum*pricePerUnit;
          if (total >= 1) {
            this.props.form.setFieldsValue({
            totalForEachOrder: total,     }); 
            totalForThisOrder = total ;
          }
        }
        console.log('check_unitPrice',check_unitPrice);
        callback();
      };
    
      validateTototalForEachOrder = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('totalForEachOrder') != totalForThisOrder) {
          this.props.form.setFieldsValue({
            totalForEachOrder: totalForThisOrder,     }); 
            check_totalForEachOrder = 1
        }
        check_totalForEachOrder = 1 ;  
        
        console.log('check_totalForEachOrder',check_totalForEachOrder);
        callback();
      };

      validateToOrderNum = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('orderNum').length != 10) {
          check_orderNum = 0 ;
          callback('กรุณากรอกหมายเลขคำสั่งซื้อให้ครบ 10 ตัว');
        }
        else {
          check_orderNum = 1 ;  
        }
        console.log('check_totalForEachOrder',check_totalForEachOrder);
        callback();
      };
    
    
    
      addOrder = e => {
        e.preventDefault();
        const { form } = this.props;
        var sentOrder = form.getFieldValue('orderType');
        var sentCopyNum = form.getFieldValue('copy');
        var sentUnitName = form.getFieldValue('unit');
        var sentPricePerUnit = form.getFieldValue('unitPrice');
        var sentPerOrder = "รายการ: " + sentOrder + " จำนวน: " + sentCopyNum
                            + " " + sentUnitName + " (ราคา " + sentPricePerUnit + " บาทต่อ"
                            + sentUnitName + ") ";
    
                            console.log('check_totalForEachOrder',check_totalForEachOrder);

        if (check_orderType == 1 && check_copy == 1 && check_unit == 1 && 
          check_unitPrice == 1 && check_orderNum == 1  ) {
                       
        // Test
        console.log('check',sentPerOrder);
        console.log('totalForThisOrder',totalForThisOrder);
    
        showOrder.push(sentPerOrder) ;
        pricePerOrder.push(totalForThisOrder);
    
        // Test
        console.log('showOrder.length',showOrder.length);
        console.log('pricePerOrder.length',pricePerOrder.length);
    
    
        for (var i = 0 ; i < pricePerOrder.length ; i++) {
          console.log('arrayPrint - pricePerOrder == ',pricePerOrder[i]);
          console.log('arrayPrint - showOrder == ',showOrder[i]);
        }
      
        this.props.form.setFieldsValue({
          orderType: "", 
          copy: "",  
          unit: "",
          unitPrice: "",
          totalForEachOrder:""
        }); 
        
        check_orderType = -1 ;
        check_copy = -1 ;
        check_unit = -1 ;
        check_unitPrice = -1 ;
        success();
      }
    
      else {
        fail();
      }
      };
    
      calAllPrice = e => {
        e.preventDefault();
        showAllPrice = 0 ;
        const { form } = this.props;
    
        for (var i = 0 ; i <= pricePerOrder.length-1 ; i++) {
          showAllPrice += pricePerOrder[i] ;
        }
    
        showTotalPriceFromAllOrder();
    
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
        
        console.log('showAllPrice',showAllPrice);
      
    
      };
    
    
      render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, loading } = this.state;
        return (
          <div>
            <Button type="default" onClick={this.showModal}>
              ตีราคา
            </Button>
            <Modal
              visible={visible}
              title="ตีราคา"
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[]}
            >
              <Form>

              { <Form.Item label="เลขคำสั่งซื้ิอ" hasFeedback>
              {getFieldDecorator('orderNum', {
                rules: [
                  
                  {
                    required: true,
                    validator: this.validateToOrderNum,
                  },
                ],
              })(<Input type="number" onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault() } />)}
            </Form.Item> }
    
                  <Form.Item label = "รายการ" >
                    {getFieldDecorator('orderType', {
                    rules: [
                      {
                        required: true,
                        validator: this.validateToOrderType,
                      },
                    ],
                    })(<Input />)}
                  </Form.Item>
                
                  <Form.Item label = "จำนวน">
                    {getFieldDecorator('copy', {
                    rules: [{
                        required: true,
                        validator: this.validateToCopy
                      },],
                    })(<InputNumber type="number"  min={1} max={1000} defaultValue={1} decimalSeparator />)}
                  </Form.Item>
    
                  <Form.Item label = "หน่วย" >
                    {getFieldDecorator('unit', {
                    rules: [{ required: true, validator: this.validateToUnit}],
                    })(<Input />)}
                  </Form.Item>
    
                  <Form.Item label = "ราคา/หน่วย" >
                    {getFieldDecorator('unitPrice', {
                    rules: [{ required: true, validator: this.validateToUnitPrice}],
                    })(<InputNumber type ="number" min={1} max={100000} defaultValue={100} />)}
                  </Form.Item>
    
                  <Form.Item label = "ราคารวมต่อรายการ" >
                    {getFieldDecorator('totalForEachOrder', {
                    rules: [{ required: true, validator: this.validateTototalForEachOrder}],
                    })(<Input />)}
                  </Form.Item> 
    
              <Form >
                <Button type="danger" shape="round" onClick={this.addOrder}  size={'default'}  > ADD </Button>
                <Button type="danger"  shape="round" onClick={this.calAllPrice} size={'default'} > CALCULATE </Button>
              </Form>
            </Form>
          </Modal>
        </div>
        );
      }
    }

const testEmail = Form.create({ name: 'testEmail_' })( TestCollectDataToEmail);
export default Form.create()(testEmail);

