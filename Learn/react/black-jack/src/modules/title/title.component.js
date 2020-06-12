import React from 'react';
import './title.scss';

const Title = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    );
};

export default Title;
