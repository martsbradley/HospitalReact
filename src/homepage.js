import React  from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export class HomePage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {  }
    }

    render () {

        let {auth} = this.props;

        let signInOutButton = <button onClick={auth.login}>Log In</button>;
        if (auth.isAuthenticated()) {
            signInOutButton = <button onClick={auth.logout}>Log Off</button>;
        }



        return (<div>
              <ol>
                  <li>
                      <Link to="/patients/list"><button>Patients</button></Link>
                  </li>
                  <li>
                      <Link to="/medicine"><button>Medicine</button></Link>
                  </li>
                  <li>
                       {signInOutButton }    
                  </li>
                  
              </ol>
              <ol>
                  <li>Authentication</li>
                  <li>Locking so that folks cannot write over each others changes.</li>
                  <li>Add prescription and finish that out.</li>
                  <li>Change it to use redux library.</li>
                  <li>Fix the styling in both browsers.</li>
                  <li>Learn about reactive for mobile.</li>
                  <li>Setting up a TLS certificate.</li>
              </ol>
            </div>);
    }
}
HomePage.propTypes = {
    auth : PropTypes.object,
}
