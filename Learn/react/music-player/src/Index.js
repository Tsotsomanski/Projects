import React from 'react';
import ReactDOM from 'react-dom';

const title = 'React project';

ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('root')
);

module.hot.accept();