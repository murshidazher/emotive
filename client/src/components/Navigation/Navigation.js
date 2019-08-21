import React from 'react';
import SideMenu from './SideMenu';

const Navigation = (props) => {
    return (
        <div>               
            <SideMenu onClick={props.onRouteChange} />
        </div>
    );

}

export default Navigation;