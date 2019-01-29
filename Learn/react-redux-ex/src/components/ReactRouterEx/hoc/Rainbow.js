import React from 'react';

const Rainbow = (WrappedComponent) => {

    const colours = ['red', 'pink', 'orange', 'blue', 'green', 'yellow'];
    const randColor = colours[Math.floor(Math.random() * 5)];
    const className = randColor + '-text';

    return (props) => {
        return(
            <div className={className}>
                <WrappedComponent {...props}/>
            </div>
        )
    }
};

export default Rainbow;