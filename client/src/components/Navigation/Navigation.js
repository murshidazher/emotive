import React from 'react';
import SideMenu from './SideMenu';
import './Navigation.css';
import Logo from '../Logo/Logo';
import LogoImage from '../../img/logo.svg';

import Tree from '../Tree/Tree'
import Branch from '../Tree/Branch'
import CheckBox from '../Navigation/CheckBox'
import Slider from './Slider';

const Navigation = (props) => {
    return (
        <div>  
            <div className="side-bar">
                     <div className="menu-btn"></div>

                    <div className="logo-wrapper">
                        <Logo backgroundImage={LogoImage}/>
                    </div>
                
                    <div  className="signout-wrapper">
                        <div className="signout-btn"></div>
                    </div>
            </div>             
            {/* <SideMenu onClick={props.onRouteChange} /> */}

            <div className="side-options">
                <div className="side-options__name">

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

export default Navigation;