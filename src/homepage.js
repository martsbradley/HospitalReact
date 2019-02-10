import React  from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (<div>
              <ol>

                  <li>Anyone can view the patients, but only admins can make updates.</li>
                  <li>Locking so that folks cannot write over each others changes.</li>
                  <li>Only buttons appropriate for the permissions are shown</li>
                  <li>Setting up a TLS certificate and storing the bearer token in a cookie..</li>

                  <li>Add prescription and finish that out.</li>
                  <li>Change it to use redux library.</li>
                  <li>Fix the styling in both browsers.</li>
                  <li>Learn about reactive for mobile.</li>
                  <li>Get authentication enabled integration tests going again.</li> 
              </ol>
            </div>);
    }
}

HomePage.propTypes = {
    auth : PropTypes.object,
}
