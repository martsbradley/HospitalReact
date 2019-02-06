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
                  <li>Authentication123</li>
                  <li>Locking so that folks cannot write over each others changes.</li>
                  <li>Add prescription and finish that out.</li>
                  <li>Change it to use redux library.</li>
                  <li>Fix the styling in both browsers.</li>
                  <li>Learn about reactive for mobile.</li>
                  <li>Setting up a TLS certificate.</li>
              </ol>
              <Link to="/marty"><button>Patients</button></Link>
              <Link to="/callback"><button>Callback</button></Link>
            </div>);
    }
}

HomePage.propTypes = {
    auth : PropTypes.object,
}

//import { Link } from 'react-router-dom'
            //<ol>
            //    <li>
            //        <Link to="/patients/list"><button>Patients</button></Link>
            //    </li>
            //    <li>
            //        <Link to="/fuzzybear"><button>Profile</button></Link>
            //    </li>
            //</ol>
