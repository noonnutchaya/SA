import React, { Component } from 'react'
import { storage } from './firebase'
import './CSS/setImg.css';
import './CSS/fieldInput.css';

import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    message,
    Checkbox,
    Row,
    Col,
  } from 'antd';

  const fail = () => {
    message.warning('กรุณาเลือกไฟล์ที่ต้องการอัพโหลด',3);
};

const success = () => {
    message.success('อัพโหลดไฟล์เรียบร้อย');
  };

export class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            url: '',
            progress: 0,
          
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.getFileLink = this.getFileLink.bind(this);
    }

    handleChange = e => {
        console.log(e)
        if (e.fileList[0]) {
            const file = e.fileList[0].originFileObj;
            this.setState(() => ({ file }));
        }
    }

    getFileLink = (url) => {
        console.log("this -> " , url)
    }

    handleUpload = e => {

        try {
            e.preventDefault() 
            const { file } = this.state;
            const uploadTask = storage.ref(`files/${file.name}`).put(file);
            uploadTask.on('state_changed',

            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                console.log(error);
            },

            () => {
                // complete function ....

                storage.ref('files').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });
                    this.props.returnFileUrl(url)
                    success();

                })
            });
        }
        catch {
            fail();   
            console.log("error");
        }

    }

    render() {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };
        return (
            
            <div className="dropbox">
            
            <Upload.Dragger name="files"  onChange={this.handleChange}> 
            
                <p className = "ant-upload-drag-icon" >

                  <Icon type="file-text" theme="twoTone" twoToneColor="#CD5C5C" />
                  <Icon type="file-image" theme="twoTone" twoToneColor="#CD5C5C" />
                  <Icon type="file-pdf" theme="twoTone" twoToneColor="#CD5C5C" />
                  
                </p>

                <p className = "ant-upload-text">Click or drag file to this area to upload</p>
                <p className = "ant-upload-hint">Support for a single file and .zip upload.</p>
                <br />
                <progress value={this.state.progress} max="100"/> 
                
            </Upload.Dragger>
    
                <div className="UploadButton">
                    <Button type="dashed" shape="round" icon="upload" onClick={this.handleUpload} > Upload </Button>
                </div>
              
                
            
          </div>

        
        )
    }
}

export default FileUpload

