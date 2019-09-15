import React ,{Component} from 'react';
import './CSS/fieldInput.css';

let alertCloseButtonStlyes = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
};

class TestAlert extends React.Component {
    render(){
        return (
            <div id = "alertStyles">
            <button stlye = {alertCloseButtonStlyes}> x </button>
                    {this.props.children}
            </div>
        );
    }
}

export default TestAlert; 

