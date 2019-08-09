import React from 'react';
import './Tree.css';

const Tree = (props) => {
    return (
        <ul className="tree">
            {props.children}
        </ul>
    );

}

export default Tree;