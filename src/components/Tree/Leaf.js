import React from 'react';
import './Leaf.css';

const Leaf = (props) => {
    return (
        <li className="leaf">
            <span>{props.title}</span>    
        </li>
    );

}

export default Leaf;