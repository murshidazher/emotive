import React, {Component} from 'react';
import './Branch.css';

class Branch extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            active: true
        }
    }

    onToggle = (event) => { 
        
        this.setState({active: !this.state.active});
        console.log(this.state.active);
    }

    render() {
        return (
            <ul className="branch">
                <div className="input-group" onClick={this.onToggle}>
                    <span className="branch__text" >{this.props.title}</span>
                    <svg className={this.state.active ? 'icon chevron-down':'icon chevron-up'}></svg>
                </div>
                
                <div className="break"></div>
                <div className={this.state.active ? 'leaf ':'leaf closed '} style={this.props.style}>
                
                    {this.props.children}
                </div>
            </ul>
        );
    }
    
}                   



export default Branch;