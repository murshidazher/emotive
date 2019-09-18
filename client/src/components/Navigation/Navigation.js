import React, {Component} from 'react';
import './Navigation.css';
import Logo from '../Logo/Logo';
import LogoImage from '../../img/logo.svg';

import Tree from '../Tree/Tree'
import Branch from '../Tree/Branch'
import CheckBox from '../Navigation/CheckBox'
import Slider from './Slider';


class Navigation extends Component {

    /*
    *
    * @route - keeps track of our current position in page transition 
    */
    constructor(props) {
        super();
        this.state = {
            menu: false
        }
    }


    onMenuClick = (event) => {
        this.setState({menu: !this.state.menu});
    }

    render() {
        return (
            <div> 
                <div className={(this.state.menu ? 'overlay' : '')}  onClick={this.onMenuClick}></div> 
            <div className="side-bar">
                    <div  className="menu-wrapper">
                        <div className="menu-btn" onClick={this.onMenuClick}></div>
                    </div>
                    

                    <div className="logo-wrapper">
                        <Logo backgroundImage={LogoImage}/>
                    </div>
                
                    <div  className="signout-wrapper">
                        <div className="signout-btn"></div>
                    </div>
            </div>             
            {/* <SideMenu onClick={props.onRouteChange} /> */}

            <div className={"side-options z9999 " + (this.state.menu ? '' : 'slide-in')}>
                <div className="side-options__name">
                    <div>L</div>
                    <div>Your entry counts</div>
                    
                    <div>12</div>
                </div>

                <div className="face__wrapper">
                    <div className="face">
    
                    </div> 
                </div>

                <div className="user">
                    <div className="user__name">
                        Isobelle Patterson
                    </div>
                    <div className="user__location">
                        Aurora
                    </div>
                    <div className="user__phone">
                        +1 877 714 68 05 
                    </div>
                </div>

                
                
                
                <div className="side-options__opt">
                <Tree >
                    <Branch title='Classifications'>
                        <CheckBox title='Age' id='age'/>
                        <CheckBox title='Gender' id='gender'/>
                        <CheckBox title='Ethnicity' id='ethnicity'/>
                        <CheckBox title='Expression' id='expression'/>
                    </Branch>

                   

                    <Branch title='Number of Facial Points' style={{paddingLeft: '0'}}>
                        
                        <Slider title='Points' width='255' min='0' max='100' step='1' value='50' style={{paddingLeft: '0'}}/>
                    
                    </Branch>

                    

                    <Branch title='Measurement'>
                        <CheckBox title='Skin Color' id='skin-color'/>
                        <CheckBox title='Hair Color' id='hair-color'/>
                        <CheckBox title='Hair Style' id='hair-style'/>
                    </Branch>
                </Tree>
                </div>
            </div>

        </div>
        );
    }
}


export default Navigation;