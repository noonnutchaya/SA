import React ,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from './firebase';
import headCheckPage from './images/headCheckPage.png';
import footPink from './images/footWelcomePage.png';
import homeIcon from './images/homeIcon.png';
import './CSS/setImg.css';
import './CSS/fieldInput.css';
import { Input, Tooltip, Icon } from 'antd';
import { Popconfirm, message,Button } from 'antd';
import button from 'antd/lib/button/button';

const nameCollection = "CustomerDBtest";
const db = firebase.firestore();  

function confirm(e) {
    console.log(e);
    message.error('ลบออเดอร์แล้วค่ะ ขอบคุณค่ะ');
  }
  
  function cancel(e) {
    console.log(e);
    message.info('ออเดอร์ยังดำเนินการต่อ :)');
  }


class DownloadFile extends React.Component {

    checkStateByPhone = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        }, )
        const dataList = document.getElementById('fileList');
        db.collection(nameCollection).where('Phone','==',e.target.value).get().then(
            (querySnapshot) => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data); 
                data.forEach(
                    (item) => {
                        if (item.stateWork != 'done') {
                           // var contaner = document.createElement("div");
                            var node = document.createElement("p");     
                            var node2 = document.createElement("p");              
                            //node.href = item.Name; 
                            var showStateWork = document.createTextNode(item.stateWork + " - ");       
                            var showSpace = document.createTextNode( " ");         
                            node.appendChild(showStateWork);       
                            var showPrice = document.createTextNode("  "+item.Price);        
                            node.appendChild(showPrice);                        
                            document.getElementById("fileList").appendChild(node); 
                            // document.getElementById("fileList").appendChild(node2);
                            // node.style.fontFamily = 'Georgia', 'Times New Roman', 'Times, serif'; 

                        }
                       
                    }
                );
            }
        );
    }

   
    render(){
        return (
            <div id = "allBGWelcome">
                <img src={headCheckPage}  id ="setBG" />

                <div className="form-container">

                    <div className="wrap-input">
                        <Input 
                            onChange={this.checkStateByPhone}  
                            name="Phone" 
                            placeholder="Enter your telephone number"
                            className="m-icon-size"   
                            prefix={
                                <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={    
                                <Tooltip title="เบอร์โทรที่ได้ลงทะเบียนงานไว้">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)'  }} />
                                </Tooltip>  }    
                        />
                    </div>
                    <a id = "fileList" ></a> 

                    <Popconfirm
    title="ต้องการจะยกเลิกออเดอร์นี้หรือไม่ ?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button type="danger" size={"large"} href="#">
    CANCEL ORDER  </Button>
  </Popconfirm>

                    <Link to="/Home"><img src={homeIcon} className="m-icon-size onFooter"/></Link>
                    
                </div>

                <img src = {footPink}   id ="setBGcheck" /> 

                
            </div>
        );
    }
}

export default DownloadFile; 