import React ,{Component} from 'react';
import firebase from './firebase';

const nameCollection = "CustomerDBtest";
const db = firebase.firestore();  


class DownloadFile extends Component {

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
                            var node = document.createElement("a");                
                            node.href = item.WorkLink; 
                            var textnode = document.createTextNode(item.Info + '\n');        
                            node.appendChild(textnode);                             
                            document.getElementById("fileList").appendChild(node); 
                        }
                       
                    }
                );
            }
        );
    }

  
   
    render(){
        return (
            <div>

            <input onChange={this.checkStateByPhone}  name="Phone" placeholder="xxx-xxxxxxx" class="form-control" />

                <div id="fileList"></div> 
            </div>
        );
    }
}

export default DownloadFile; 
