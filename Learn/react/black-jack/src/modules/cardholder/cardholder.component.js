import React from 'react';
import './cardholder.scss';

const Cardholder = (props) => {
    return (
        <div className="cardholder"> {props.children} </div>
    );
};

export default Cardholder;
