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
            <ul className="branch"
            >
                <span className="branch__text"  onClick={this.onToggle}>{this.props.title}</span>
                <div className={this.state.active ? 'leaf ' + ((this.props.indent !== undefined) ? this.props.indent : '')
            :'leaf closed ' + (this.props.indent !== undefined) ? this.props.indent : ''}>
                
                    {this.props.children}
                </div>
            </ul>
        );
    }
    
}



export default Branch;