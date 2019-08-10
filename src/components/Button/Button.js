import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button className="btn"><span className="btn__content">{props.title}</span></button>
    );

}

export default Button;