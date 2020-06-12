import React from 'react';
import { NavLink, Link} from "react-router-dom"

const SignedOutLinks = ( props ) => {
    return (
        <ul className="right">
            <li><NavLink to='/signup'>Sign Up</NavLink></li>
            <li><NavLink to='/signin'>Log in</NavLink></li>
        </ul>
    )
};

export default SignedOutLinks;