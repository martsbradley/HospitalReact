import React  from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (<div>
              <h1>Primary Aims</h1>
                  <ol>
                      <li>Secure CSRF?</li>
                      <li>Works.</li>
                  </ol>

            <h2>TODO</h2>
              <ol>
                  <li>Limit total patients in database to avoid denial of service</li>

                  <li>Saved details of those that log in</li>

                  <li>Anyone can view the patients, but only admins can make updates.</li>

                  <li>Only buttons appropriate for the permissions are shown</li>

                  <li>Get authentication enabled integration tests going again.</li> 

                  <li>Before release... Dump the JSF side of it for now - disable via web.xml</li>
              </ol>

              <h2>Maybe Sometime</h2>
              <ol>
                  <li>Change it to use redux library.</li>
                  <li>Fix the styling in both browsers.</li>
                  <li>Learn about reactive for mobile.</li>
              </ol>

              <h2>Done</h2>
              <ol>
                  <li>Add prescription and finish that out.</li>
                  <li>Locking so that folks cannot write over each others changes (Done for patients).</li>
                  <li>jwt token held in httponly cookie</li>
                  <li>Setting up a TLS certificate and storing the bearer token in a cookie..</li>
              </ol>
            </div>);
    }
}

HomePage.propTypes = {
    auth : PropTypes.object,
}
