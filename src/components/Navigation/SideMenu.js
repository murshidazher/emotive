import React from 'react';
import './SideMenu.css';
import Tree from '../Tree/Tree'
import Branch from '../Tree/Branch'
// import Leaf from '../Tree/Leaf'
import CheckBox from '../Navigation/CheckBox'
import Logo from '../Logo/Logo';
import Slider from './Slider';
import LogoImage from '../../img/logo.svg'

const SideMenu = (props) => {
    return (
        <div className="side-menu bg-white">
            <nav className="navbar" role="navigation">
                <Logo backgroundImage={LogoImage}/>
                <div style={{textAlign: 'center'}}>
                <button className="btn" onClick={() => props.onClick('logout')}><span className="btn__content">Sign out</span></button>
                </div>
                
                <Tree >
                    <Branch title='Classifications'>
                        <CheckBox title='Age' id='age'/>
                        <CheckBox title='Gender' id='gender'/>
                        <CheckBox title='Ethnicity' id='ethnicity'/>
                        <CheckBox title='Expression' id='expression'/>
                    </Branch>

                   

                    <Branch title='Number of Facial Points' style={{paddingLeft: '0'}}>
                        
                        <Slider title='Points' width='245' min='0' max='100' step='1' value='50' style={{paddingLeft: '0'}}/>
                    
                    </Branch>

                    

                    <Branch title='Measurement'>
                        <CheckBox title='Skin Color' id='skin-color'/>
                        <CheckBox title='Hair Color' id='hair-color'/>
                        <CheckBox title='Hair Style' id='hair-style'/>
                    </Branch>

                    {/* {<Branch title='ananan'>
                        <Leaf title='aaa'/>
                        <Leaf title='aaa'/>
                        <Leaf title='aaa'/>
                        <Leaf title='aaa'/>
                        <Leaf title='aaa'/>
                        <Leaf title='aaa'/>
                    </Branch>} */}
                </Tree>
            </nav>
        </div>
        
    );

}

export default SideMenu;