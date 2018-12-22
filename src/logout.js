import React from 'react'
import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types';

export class Logout extends React.Component {
    constructor (props) {
        super(props)
    }

    render () { 
        let result = 
                <div>
                    You have been logged out successfully.
                    <Link to='/'><button>Home</button></Link>
                </div>;

        return result;
    }
}
//Logout.propTypes = {
//}
