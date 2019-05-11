import React  from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {

    constructor (props) {
        super(props)
    }

    render () {

        return (<div>
              <h1>Aims</h1>
            <p>
              This site was created to allow me to try out some modern technologies like:
             <ul>
                 <li>React</li>
                 <li>Docker</li>
                 <li>AWS</li>
                 <li>Postgresql</li>
                 <li>Rest</li>
                 <li>Jboss (Wildfly)</li>
                 <li>Open authentication with Auth0.</li>
                 <li> LetsEncrypt certifcates</li>
            </ul>

            </p>

            <p>
            The site stores fake patients details, no real details are included.

            Patients can be created and prescriptions to be added to them.
            </p>

            <p>
            The public can log in and see the contents of the database.
            You can log in by your Gmail account, your password will be kept secret by google.
            </p>

            <p>
            Only authorized users that can make updates to the database,
            contact Martin if you want to try that.  If you don&#39;t know him, sorry you are out of luck.
            </p>

            <h2>You might not notice.</h2>
            <ul>
                <li>Optimistic locking shows a message if a patient was updated while you were about to change it.</li>
                <li>Two Patients cannot have the same, just wanted to implement that.</li>
            </ul>
            </div>);
    }
}

HomePage.propTypes = {
}
