import React ,{Component} from 'react';
import firebase from './firebase';
import FileUpload from './FileUpload';
import 'antd/dist/antd.css';
import './CSS/setImg.css';
import './CSS/fieldInput.css';
import { Input } from 'antd';
import { message, Button } from 'antd';
import headerOrder from './images/headerOrder.png';
import footOrder from './images/footOrder.png';

const db = firebase.firestore();

const { TextArea } = Input;
var timeStampQuotation = Math.floor(Date.now() / 1000) ;
// console.log(timeStampQuotation);
const success = () => {
    message
      .loading('Action in progress..', 2)
      .then(() => message.success('Loading finished', 1.8))
      .then(() => message.success("Order : " + timeStampQuotation, 3))
      .then(() => message.info('Thank You For Order :)', 1.8))
      .then(() => window.location.href = "/Home");
  };

var documentId ;
var setQuo ;


class InputInfo extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            Name : "",
            Info : "",
            idDoc : "",
            Phone : "",
            stateWork : "order",
            Price : "รอการตีราคาจากร้านค้า",
            WorkLink : "",
            Quotation : ""

        }
    }

    fileLink = (url) =>{
        this.setState({url})
    }

    componentDidMount(){
        db.collection('CustomerDB').get().then((snapshot)=>{
            snapshot.forEach(doc=>{
                // console.log(doc.data())
            });
        });
     
    }

    addEventListener = e=>{
        e.preventDefault();
        db.collection('CustomerDBtest').add({
            Name: this.state.Name,
            Info:this.state.Info,
            Phone:this.state.Phone,
            WorkLink:this.state.url,
            Price:this.state.Price,
            idDoc:this.state.idDoc,
            stateWork:this.state.stateWork,
            Quotation:this.state.Quotation
        }) 
        .then(docRef => {
            console.log("add success~") 
            console.log(docRef.id) 
            documentId = docRef.id
            console.log(timeStampQuotation);

            db.collection('CustomerDBtest').doc(documentId).update({idDoc: documentId})
            db.collection('CustomerDBtest').doc(documentId).update({Quotation: timeStampQuotation})
         
            success();
           
        })  
        
    }


    showItem = () => {
        var wholeData = [];
        db.collection('CustomerDBtest').get().then((snapshot)=>{
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
   

    onchangeTextInput = (e) => {
        console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        }, console.log(this.state))
    }

    
    render(){
        
        return (
            <div className="AddInfoPage" >
                    <img src={headerOrder} id="setBG" /> 
                
                <div>
                    <div className="fieldTopInput">
                        <label> ชื่อ : </label> 
                        <Input placeholder="กรอกชื่อ"  onChange={this.onchangeTextInput} type="text" name="Name" class="form-control" />
                    </div>

                    <div class="fieldInput">
                        <label> เบอร์โทรติดต่อ : </label>
                        <Input onChange={this.onchangeTextInput}  name="Phone" placeholder="xxx-xxxxxxx" class="form-control" />
                    </div>

                    <div className="fieldInput">
                        <label> รายละเอียดงาน : </label>
                        <TextArea rows={4} onChange={this.onchangeTextInput} type="text" name="Info" placeholder="กรอกรายละเอียด" class="form-control" />
                    </div>

                    <div> <FileUpload returnFileUrl={this.fileLink} /> </div>

                    <div className="SumbitButton">
                      
                        <Button type="dashed" shape="round" onClick={this.addEventListener} class="btn btn-primary">SUBMIT</Button>

                    </div>

                </div>
                    <img src={footOrder} id="setBG" />
                </div>
        );
    }
}

export default InputInfo;